# Filament Hexa

Filament Hexa is an effortless role & permission plugin for Filament, adopted from the concept of [hexters/ladmin](https://github.com/hexters/ladmin). This concept facilitates the management of roles and permissions through inline code and provides an easy-to-understand interface.

![](https://github.com/hexters/assets/blob/main/hexa/v1/edit.png?raw=true)

## About Filament
[FilamentPHP](https://filamentphp.com/) is a lightweight and flexible PHP framework designed for building web applications. It aims to simplify application development by providing a clear structure and high modularity. The framework emphasizes speed, efficiency, and comes with many built-in features that facilitate effective web application development.

## Installation

> **Note** <br>
First, you need to install the Filament package. You can find the installation instructions on the official website at [FilamentPHP](https://filamentphp.com).

Add the repository package below to your `composer.json` file located at the root of your project.
```json
{
    "repositories": {
        "filament-hexa": {
            "type": "composer",
            "url": "https://filament-hexa.composer.sh"
        }
    }
}
```

Add the plugin repository to your project by following the steps below:
```
composer require hexters/hexa
```

Next, install the Hexa plugin:
```
php artisan hexa:install
```

Install the database migrations:
```
php artisan migrate
```

Create a superadmin account for admin login:
```
php artisan hexa:account --create
```
## Plugin Setup

Add the Filament `Hexa` plugin to an existing panel. If you haven't created a panel yet, see the instructions here: [Creating a new panel](https://filamentphp.com/docs/3.x/panels/configuration#creating-a-new-panel).

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

## Declaring Access Permissions

### Resource

To declare access permissions for a Resource, you can use the same method as for Pages, as shown below.

```php
use Filament\Resources\Resource;
use Hexters\Hexa\Traits\HexAccess;

class UserResource extends Resource
{
    use HexAccess;

    protected static ?string $permissionId = 'access.user';

    protected static ?string $titlePermission = 'User';

    protected static ?string $descriptionPermission = 'Admin can manage User accounts';

    /**
     * Optional Section
     */
    protected static ?array $subPermissions = [
        'access.user.create' => 'Can Create',
        'access.user.edit' => 'Can Edit',
        'access.user.delete' => 'Can Delete',
    ];

    public static function canAccess(): bool
    {
        return hexa()->can(static::$permissionId);
    }

    . . .
}
```

### Page

To declare access permissions for a Page, use the same method as for Resources.

```php
use Filament\Pages\Page;
use Hexters\Hexa\Traits\HexAccess;

class Dashboard extends Page
{
    use HexAccess;

    protected static ?string $permissionId = 'access.dashboard';

    protected static ?string $titlePermission = 'Dashboard';

    protected static ?string $descriptionPermission = 'Admin can access the dashboard page';

    public static function canAccess(): bool
    {
        return hexa()->can(static::$permissionId);
    }

    . . .
}
```

### Widget

To declare access permissions for a Widget, use the `canView()` method.

```php
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Hexters\Hexa\Traits\HexAccess;

class StatsOverview extends BaseWidget
{
    use HexAccess;

    protected static ?string $permissionId = 'widget.overview';

    protected static ?string $titlePermission = 'Report Overview';

    protected static ?string $descriptionPermission = 'Admin can view report overview';

    public static function canView(): bool
    {
        return hexa()->can(static::$permissionId);
    }

    . . .
}
```

The sidebar menu for resources and pages will appear for roles that have access.

### Actions, etc.

You can use the `visible()` method on various `Class Components`. For example, for a button:

```php
Tables\Actions\EditAction::make()
    ->visible(hexa()->can('access.user.edit')),
```

For classes extending `Filament\Resources\Pages\EditRecord`, `Filament\Resources\Pages\CreateRecord`, or `Filament\Resources\Pages\ListRecords`, use:

```php
/**
 * @param  array<string, mixed>  $parameters
 */
public static function canAccess(array $parameters = []): bool
{
    return hexa()->can('access.user.edit');
}
```

## Checking Access Permissions

Access permissions can be granted to Resources, Pages, Widgets, Button Actions, etc., as shown below.

Using the Hexa utility function:
```php
hexa()->can('hexa.admin')
```

Using the Laravel auth `can` function:
```php
auth()->user()?->can('hexa.admin')
```

Using the Laravel Gate class:
```php
use Illuminate\Support\Facades\Gate;

. . .

Gate::allows('hexa.admin')
```

In Blade templates, you can use:
```html
<div>
    @can('hexa.admin')
        // Content here ...
    @endcan
</div>
```

## Options Setting

This plugin comes with an easy-to-use cache system for storing various application settings. See the `app/Filament/Pages/Option.php` file. You can use the Form component to create various form inputs.

```php
use Filament\Forms\Components\TextInput;

public function form(Form $form): Form
{
    return $form
        ->schema([
            TextInput::make('referral-commission')
                ->default(hexa()->getOption('referral-commission', 10))
                ->required()
                ->suffix('%')
                ->numeric(),
        ])
        ->statePath('data');
}
```

To retrieve it, use the utility function provided by Hexa:
```php
hexa()->getOption('referral-commission', 10)
```

To save it manually, use the utility function below:
```php
hexa()->setOption('key-option', 'The option value can be a string, array, number, etc.')
```

## License
This plugin is not open source. You need a license to use this plugin, which you can purchase or request from the plugin owner. See the license details at [Filament Hexa License](https://github.com/hexters/hexa-docs/blob/main/LICENSE.md).

## Issues

If you encounter any issues with this plugin, you can submit them to this repository:
[Filament Hexa Issue](https://github.com/hexters/hexa-docs/issues).

Thank you for using this plugin, and we hope it speeds up your development of powerful applications.

Happy Coding 🧑‍💻 🧑‍💻 🧑‍💻
