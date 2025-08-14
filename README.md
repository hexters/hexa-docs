# Hexa v3 & Filament v4

**Filament Hexa** is an **easy-to-use role and permission management plugin** for Filament.
Now in version 3, it supports Filament 4, multi-panel setups, is easier to use, and customizable.

This version doesn’t bring major changes yet—it mainly focuses on supporting Filament v4 and includes minor bug fixes. We intentionally bumped the version to help identify version alignment between Hexa and Filament. In the future, if Filament increases its major version, Hexa will likely follow with a major version increase as well.

![Banner](https://github.com/hexters/assets/blob/main/hexa/v2/banner.png?raw=true)

## Versions

| Hexa | Filament | Documentation                                                                     |
| :-----: | :------: | --------------------------------------------------------------------------------- |
|    V1   |    v3    | [Read Documentation](https://github.com/hexters/hexa-docs/blob/main/README.v1.md) |
|    V2   |    v3    | [Read Documentation](https://github.com/hexters/hexa-docs/blob/main/README.V2.md) |
|    V3   |    v4    | [Read Documentation](https://github.com/hexters/hexa-docs)                        |

## Index

* [Installation](#installation)
* [Adding Role Select](#adding-role-select)
* [Multi Panel](#multi-panel)
* [Defining Permissions](#defining-permissions)
* [Granting Access](#granting-access)
  * [Check for User](#check-for-user)
  * [Visible Access](#visible-access)
  * [Laravel Access](#laravel-access)
* [Additional Methods (optional)](#additional-methods-optional)
  * [Adding Descriptions to Roles and Gates](#adding-descriptions-to-roles-and-gates)
  * [Setting Role Display Order](#setting-role-display-order)
* [Custom Access](#custom-access)
* [Multi Tenancy](#multi-tenancy)
* [Vendor Publish](#vendor-publish)
* [Meta Options](#meta-options)
* [Traits Class](#traits-class)
* [License](#license)
* [Bug Reports or Issues](#bug-reports-or-issues)

## Installation

Install the package:

```bash
composer require hexters/hexa
```

Then run the migration for the `roles` table:

```bash
php artisan migrate
```

After installation, register the plugin in your panel:

```php
use Filament\Panel;
use Hexters\Hexa\Hexa;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            Hexa::make(),
        ]);
}
```

Then register the access trait in your `User` model:

```php
use Hexters\Hexa\HexaRolePermission;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HexaRolePermission; // Add this trait
}
```

## Adding Role Select

To assign a role to a user, add a select input in your `UserForm` class:

```php
use Filament\Forms\Components\Select;

. . . .

Select::make('roles')
    ->label(__('Role Name'))
    ->relationship('roles', 'name')
    ->placeholder(__('Superuser')),
```

## Multi Panel

Filament Hexa supports multiple panels as long as each panel uses a different `Auth Guard`. The default guard is `web`.

```php
public function panel(Panel $panel): Panel
{
    return $panel
        ->authGuard('reseller');
}

public function panel(Panel $panel): Panel
{
    return $panel
        ->authGuard('customer');
}
```

Configure the guards in `config/auth.php`.

## Defining Permissions

Permissions can be defined in Pages, Resources, Widgets, and Clusters. Example:

```php
use Hexters\Hexa\HasHexaRole;

. . . 

use HasHexaRole;

public function defineGates(): array
{
    return [
        'user.index' => __('Allows viewing the user list'),
        'user.create' => __('Allows creating a new user'),
        'user.update' => __('Allows updating a user'),
        'user.delete' => __('Allows deleting a user'),
    ];
}
```

## Granting Access

If a user has no assigned role, they are treated as a `Superuser`, meaning they can access all defined permissions.

```php
public static function canAccess(): bool
{
    return hexa()->can('user.index');
}
```

### Check for User

To check access outside of an authenticated context (e.g., in queues or commands):

```php
return hexa()->user(User::first())->can('user.index');
```

### Visible Access

Filament supports `visible` on components like `Action`, `Column`, `Input`, etc.:

```php
Actions\CreateAction::make('create')
    ->visible(fn() => hexa()->can(['user.index', 'user.create']));
```

### Laravel Access

You can also use Laravel's native authorization:

```php
Auth::user()->can('user.create');
Gate::allows('user.create');

// Only works in authenticated context (e.g., requests)
Gate::forUser(User::first())->allows('user.create');

@can('user.create')
    ...
@endcan
```

> ✅ For non-authenticated contexts:
>
> ```php
> hexa()->user(User::first())->can('user.create');
> ```

## Additional Methods (optional)

### Adding Descriptions to Roles and Gates

```php
use Hexters\Hexa\HasHexaRole;

. . . 

use HasHexaRole;

public function roleName()
{
    return __('User Account');
}

public function roleDescription(): ?string
{
    return __('Controls access to create, read, update, delete, and more.');
}

public function defineGateDescriptions(): array
{
    return [
        'user.index' => __('Admins can access the User page'),
        'user.create' => __('Admins can create new Users'),
    ];
}
```

### Setting Role Display Order

Menu order follows the navigation order. If you want to distinguish it:

```php
public $hexaSort = 4;
```

## Custom Access

You can define additional gates using `GateItem`:

```php
Hexa::make()
    ->gateItems([
        GateItem::make(__('Horizon'))
            ->description(__('Allows user to manage the horizon page'))
            ->gateItems([
                'horizon.page' => __('Horizon Page')
            ])
            ->gateItemDescriptions([
                'other.index' => __('Allow user to access horizon page')
            ]),
    ]);
```

To customize the menu:

```php
use Filament\Support\Icons\Heroicon;

. . .

Hexa::make()
    ->shouldRegisterNavigation(true)
    ->navigationName(__('Role & Access'))
    ->navigationGroup('Settings')
    ->navigationIcon(Heroicon::OutlinedLockOpen)
    ->gateItems([...]);
```

## Multi Tenancy

Filament Hexa supports multi-tenancy. The `HexaRole` model includes a `team_id` field and a `team` relationship. You can integrate it with Filament’s multi-tenancy system.

## Vendor Publish

To override the role model (e.g., to customize tenant relationships), publish the config:

```bash
php artisan vendor:publish --provider="Hexters\Hexa\HexaServiceProvider"
```

## Meta Options

```php
hexa()->setOption('key-option', 'value-option');
hexa()->getOption('key-option', 'default');
hexa()->dateOption('key-option');
hexa()->getOptionKeys();
```

## Traits Class

| Name                 | Description                                 |
| -------------------- | ------------------------------------------- |
| `HexaRolePermission` | Used on the `Authenticatable` model         |
| `HasHexaRole`        | Used on Resources, Pages, Widgets, Clusters |
| `UuidGenerator`      | Used on models with a `uuid` field          |
| `UlidGenerator`      | Used on models with a `ulid` field          |

## License

Filament Hexa requires a valid license.
Support the developer and purchase a license here:
👉 [https://ppmarket.org/browse/hexters-hexa](https://ppmarket.org/browse/hexters-hexa)

## Bug Reports or Issues

Please report any issues via GitHub:
[Filament Hexa Issue Tracker](https://github.com/hexters/hexa-docs/issues)

Thank you for using Filament Hexa.
We hope this helps speed up your development process.

**Happy Coding! 🧑‍💻**