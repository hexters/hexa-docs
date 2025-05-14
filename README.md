# Filament Hexa V2 (Coming Soon)

**Filament Hexa** is an **easy-to-use role and permission management plugin** for Filament. Now in version 2, it supports multi-panel setups, is easier to use, and customizable.

![Banner](https://github.com/hexters/assets/blob/main/hexa/v2/banner.png?raw=true)

## Versions
|Version|Doc.|
|-|-|
|V1|[Read Doc.](https://github.com/hexters/hexa-docs/blob/main/README.v1.md)|
|V2|[Read Doc.](https://github.com/hexters/hexa-docs)|

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

Then install the package:

```bash
composer require hexters/hexa
```

Then run the migration for roles:

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

Then register the access trait in the `User` model:

```php
use Hexters\Hexa\HexaRolePermission;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HexaRolePermission; // Add this trait
}
```

## Adding Role Select

To assign a role to a user, add a select input in your `UserResource` form:

```php
Forms\Components\Select::make('roles')
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

Configure guards in `config/auth.php`.

## Defining Permissions

Permissions can be declared in Pages, Resources, Widgets, and Clusters. Example:

```php
public function defineGates(): array
{
    return [
        'user.index' => __('Allows to view list of users'),
        'user.create' => __('Allows to create new user'),
        'user.update' => __('Allows to update user'),
        'user.delete' => __('Allows to delete user'),
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

When checking access outside an authenticated context (e.g., in queues or commands), use:

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

Laravel's native authorization features:

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

```php
public $hexaSort = 4;
```

## Custom Access

You can define additional gates using `GateItem`:

```php
Hexa::make()
    ->gateItems([
        GateItem::make(__('Horizon'))
            ->description(__('Allows user to manage horizon page'))
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
Hexa::make()
    ->shouldRegisterNavigation(true)
    ->navigationName(__('Role & Access'))
    ->navigationGroup('Settings')
    ->navigationIcon('heroicon-o-lock-open')
    ->gateItems([...]);
```

## Multi Tenancy

Filament Hexa supports multi-tenancy. The `HexaRole` model includes a `team_id` field and `team` relationship. You can integrate it with Filament's multi-tenancy setup.

## Vendor Publish

To override the role model (e.g., for customizing tenant relationships), publish the config:

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

We're working on the official license page — and it's coming soon. Something exciting is on the way, so stay tuned right here.

## Bug Reports or Issues

Please report issues via GitHub: [Filament Hexa Issue Tracker](https://github.com/hexters/hexa-docs/issues)

Thank you for using Filament Hexa. We hope it helps accelerate your development process.

**Happy Coding! 🧑‍💻**
