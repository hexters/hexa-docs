# Filament Hexa

Filament Hexa is an effortless role & permission plugin for Filament, inspired by the concept of [hexters/ladmin](https://github.com/hexters/ladmin). This concept facilitates managing each role and permission inline with code and provides an easy-to-understand interface.

![](https://github.com/hexters/assets/blob/main/hexa/v1/edit.png?raw=true)

## About Filament
[FilamentPHP](https://filamentphp.com/) is a lightweight and flexible PHP framework designed for building web applications. It aims to simplify application development by providing a clear structure and high modularity. The framework emphasizes speed, efficiency, and comes with many built-in features that facilitate effective web application development.

## Installation

> **Note** <br>
Before you can install the Filament Hexa package, you need to install the Filament package first. You can find more information on the official [FilamentPHP](https://filamentphp.com) website.

To install Filament Hexa, you must add the repository package to the `composer.json` file in the root of your project. Copy the command below and run it:

```bash
composer config repositories.filament-hexa \
    '{"type": "composer", "url": "https://filament-hexa.composer.sh"}' \
        --file composer.json
```

Once the repository is added to your composer.json file, you can install Filament Hexa like any other composer package by using the composer require command:

```bash
composer require hexters/hexa
```

Next, you will be prompted to provide your username and password, which you can obtain here [Filament Hexa License](https://checkout.anystack.sh/filament-hexa?via=arf178)

```bash
Loading composer repositories with package information
Authentication required (filament-hexa.composer.sh):
Username: [licensee-email]
Password: [license-key]
```
Your username will be your email address, and the password will be your license key.

After that, install the Hexa plugin:
```bash
php artisan hexa:install
```

Install database migrations:
```bash
php artisan migrate
```

Create a superadmin account for admin login:
```bash
php artisan hexa:account --create
```
## Setup Plugin

Add the Filament `Hexa` plugin to the panel you have created. If you haven't created a panel yet, see the instructions here [Creating a new panel](https://filamentphp.com/docs/3.x/panels/configuration#creating-a-new-panel)

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

### Resource, Page, & Cluster

To declare access permissions for Resources, Pages, and Clusters, see the example below:

```php

use Filament\Resources\Resource;
use Hexters\Hexa\Traits\HexAccess;

. . .

use HexAccess;

protected static ?string $permissionId = 'access.user';

protected static ?string $descriptionPermission = 'Admin can manage User accounts';

/**
 * Optional Section
 * You can add it or not depending on the needs of your application.
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


```

### Widget

To declare access permissions for a Widget, there is a difference in the method. Widgets use the `canView()` method:

```php

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Hexters\Hexa\Traits\HexAccess;

class StatsOverview extends BaseWidget
{
    use HexAccess;

    protected static ?string $permissionId = 'widget.overview';

    protected static ?string $descriptionPermission = 'Admin can view report overview';

    public static function canView(): bool
    {
        return hexa()->can(static::$permissionId);
    }

    . . .
}

```

The sidebar menu for resources and pages will appear for roles that have access to them.

## Additional Access
Besides the methods above, you can add additional permissions for other needs outside of Pages, Resources, Widgets, and Clusters. You can add them in the `/config/other-permissions.php` file:

```php
use Hexters\Hexa\Helpers\Can;

return [
    Can::make(id: 'receive.email.order')
        ->name(name: 'Allow receiving email orders')
        ->description(description: 'Admins with this role will receive emails from incoming customer orders.'),
];
```

### Actions and Others

You can use the `visible()` method on several `Class Components`. For example, to use it on a button:

```php
Tables\Actions\EditAction::make()
    ->visible(hexa()->can('access.user.edit')),
```

To grant access on a class that extends `Filament\Resources\Pages\EditRecord`, `Filament\Resources\Pages\CreateRecord`, `Filament\Resources\Pages\ListRecords`, you can use:

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

Access can be granted to Resources, Pages, Widgets, Button Actions, etc. Access can be granted using the methods shown below.

Using the Hexa utility function:
```php
hexa()->can('hexa.admin')
```

Using the Laravel auth can function:
```php
auth()->user()?->can('hexa.admin')
```

Using the Laravel Gate class:
```php
use use Illuminate\Support\Facades\Gate;

. . .

Gate::allows('hexa.admin')
```

In a Blade template, you can use it as shown below:

```html
<div>
    @can('hexa.admin')
        // Content here ...
    @endcan
</div>
```

## Options Setting

This plugin comes with an easy-to-use cache system that stores various settings needed by the application. See the file `app/Filament/Pages/Option.php`. You can use Form components to create various types of form inputs.

```php
use Filament\Forms\Components\TextInput;

public function formOptions(Form $form): Form
{
    return $form
        ->schema([
            TextInput::make('referral-commision')
                ->default(hexa()->getOption('referral-commision', 10)) #<-- required to set the value
                ->required()
                ->suffix('%')
                ->numeric(),
        ]);
}
```

To call it, you can use the utility function provided by Hexa:

```php
hexa()->getOption('referral-commision', 10)
```

To save it manually, you can use the utility function below:

```php
hexa()->setOption('key-option', 'The option value can be a string, array, number, etc.')
```

## License
This plugin is not open-source. You need a license to use this plugin. You can purchase it at [Filament Hexa License](https://checkout.anystack.sh/filament-hexa?via=arf178) or request it from the owner of this plugin.

## Issue

If you encounter an issue with this plugin, you can submit an issue on this repository: [Filament Hexa Issue](https://github.com/hexters/hexa-docs/issues)

Thank you for using this plugin. We hope it accelerates your process of building powerful applications.

Happy Coding 🧑‍💻 🧑‍💻 🧑‍💻
