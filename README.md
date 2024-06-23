# Filament Hexa

Filament Hexa is an effortless role & permission plugin designed for Filament, adopted from the [hexters/ladmin](https://github.com/hexters/ladmin) concept. This concept provides ease in managing every role and permission inline and features an easy-to-understand interface.

![](https://github.com/hexters/assets/blob/main/hexa/v1/edit.png?raw=true)

## About Filament
[FilamentPHP](https://filamentphp.com/) is a lightweight and flexible PHP framework designed for building web applications. It aims to simplify application development by providing a clear structure and high modularity. The framework emphasizes speed, efficiency, and comes with many built-in features that facilitate effective web application development.

## Installation

> **Note** <br>
You need to install the Filament package first. You can find the instructions on the official website at [FilamentPHP](https://filamentphp.com).

Add the following package repository to your `composer.json` file located in the root of your project.
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

Then install the Hexa plugin:
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

## Setup Plugin

Add the Filament `Hexa` plugin to the created panel. If not yet done, you can find the instructions here: [Creating a new panel](https://filamentphp.com/docs/3.x/panels/configuration#creating-a-new-panel).

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

To declare access permissions to a Resource, the process is similar to granting access to a Page, as shown below.

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

To declare access permissions to a Page, follow the same process as for a resource.

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

To declare access permissions to a Widget, note that the method `canView()` is used.

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

You can use the `visible()` method on various `Class Components`. For example, to apply it to a button:

```php
Tables\Actions\EditAction::make()
    ->visible(hexa()->can('access.user.edit')),
```

For classes extending `Filament\Resources\Pages\EditRecord`, `Filament\Resources\Pages\CreateRecord`, or `Filament\Resources\Pages\ListRecords`, you can use:
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

Access can be granted to Resources, Pages, Widgets, Button Actions, etc., as shown below.

Using Hexa utility function:
```php
hexa()->can('hexa.admin')
```

Using Laravel auth can function:
```php
auth()->user()?->can('hexa.admin')
```

Using Laravel Gate class:
```php
use Illuminate\Support\Facades\Gate;

. . .

Gate::allows('hexa.admin')
```

In a Blade template, you can use it as shown below.

```html
<div>
    @can('hexa.admin')
        // Content here ...
    @endcan
</div>
```

## License
This plugin is not open source. You need a license to use this plugin, which you can purchase or request from the owner of this plugin. See the license details at [Filament Hexa License](https://github.com/hexters/hexa-docs/blob/main/LICENSE.md).

## Issue

If you encounter any issues with this plugin, you can submit them on the repository: 
[Filament Hexa Issue](https://github.com/hexters/hexa-docs/issues)

Thank you for using this plugin. We hope it speeds up the process of creating powerful applications.

Happy Coding 🧑‍💻 🧑‍💻 🧑‍💻
