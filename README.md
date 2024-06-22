# Filament Hexa

Hexa is a role & permission plugin developed for Filament, adapted from the concept of [hexters/ladmin](https://github.com/hexters/ladmin). This concept simplifies the management of each role and permission through inline code.

Permissions are set up for each component, including Page, Resource, and Widget in Filament.

## Installation

Before installing this package, you need to add the following package repository to your `composer.json` file in your project's root directory.

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

Add the plugin to your project by following these steps:
```
composer require hexters/hexa
```

Then, run the installation command:
```
php artisan hexa:install
```

Create an account for admin login:
```
php artisan hexa:account
```

## Plugin Setup

After completing the installation process, proceed to create a panel. See the full documentation at [Creating a new panel](https://filamentphp.com/docs/3.x/panels/configuration#creating-a-new-panel).

```
php artisan make:filament-panel admin
```

Add the Hexa plugin to the panel created above.

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

## Setting Up Access Permissions

You need to declare access permissions in Resources, Pages, and Widgets. See the examples below.

### Resource

How to declare access permissions for a Resource:

```php
use Filament\Resources\Resource;
use Hexters\Hexa\Traits\HexAccess;

class UserResource extends Resource
{
    use HexAccess;

    protected static ?string $permissionId = 'access.user';

    protected static ?string $titlePermission = 'User';

    protected static ?string $descriptionPermission = 'Admin can manage User accounts';

    public static function canAccess(): bool
    {
        return auth()->user()?->can(static::$permissionId) ?? false;
    }

    . . .
}
```

### Page

How to declare access permissions for a Page:

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
        return auth()->user()?->can(static::$permissionId) ?? false;
    }

    . . .
}
```

### Widget

How to declare access permissions for a Widget:

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
        return auth()->user()?->can(static::$permissionId) ?? false;
    }

    . . .
}
```

Access permissions will automatically appear when editing and creating roles, making this process straightforward and easy to implement.
