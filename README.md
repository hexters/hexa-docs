# Filament Hexa

Hexa is a role & permission plugin created for Filament, adopted from the concept of [hexters/ladmin](https://github.com/hexters/ladmin). This concept provides ease in managing each role and permission using inline code.

Permissions will be set up for each component such as Page, Resource, or widget in Filament.

## About Filament
[FilamentPHP](https://filamentphp.com/) is a lightweight and flexible PHP framework designed for building web applications. It aims to simplify application development by providing a clear structure and high modularity. The framework emphasizes speed, efficiency, and comes with many built-in features that facilitate effective web application development.

## Installation

Before installing this package, you need to install the Filament package first, which you can find on its official site [FilamentPHP](https://filamentphp.com).

Add the package repository to your `composer.json` file in your project's root directory before installing the package:
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

After that, perform the installation:
```
php artisan hexa:install
```

Create an admin login account:
```
php artisan hexa:account
```

## Plugin Setup

After the installation process is complete, we proceed with creating a panel. See the complete documentation at [Creating a new panel](https://filamentphp.com/docs/3.x/panels/configuration#creating-a-new-panel).

```
php artisan make:filament-panel admin
```

Add the hexa plugin to the panel created above.

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

## Setting Up Permission Access

You need to declare access permissions for Resource, Page, and Widget as shown below.

### Resource

How to declare access permission for Resource:

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

How to declare access permission for Page:

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

How to declare access permission for Widget:

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

Access will automatically appear when editing and creating roles, making this approach simple and easy to implement.
