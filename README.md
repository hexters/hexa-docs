# Filament Hexa

Filament Hexa is an effortless role & permission plugin created for Filament, adopted from the concept [hexters/ladmin](https://github.com/hexters/ladmin). This concept provides ease in managing every role and permission inline with the code and has an easy-to-understand interface.

![Filament Hexa](https://github.com/hexters/assets/blob/main/hexa/v1/edit.png?raw=true)

## About Filament
[FilamentPHP](https://filamentphp.com/) is a lightweight and flexible PHP framework designed for building web applications. It aims to simplify application development by providing a clear structure and high modularity. The framework emphasizes speed, efficiency, and comes with many built-in features that facilitate effective web application development.

## Installation

> **Note** <br>
First, you need to install the Filament package. You can find the installation guide on its official site at [FilamentPHP](https://filamentphp.com).

To install Filament Hexa, you must add the repository package to the `composer.json` file in the root of your project. Copy the command below and run it in the terminal:

```bash
composer config repositories.filament-hexa \
    '{"type": "composer", "url": "https://filament-hexa.composer.sh"}' \
        --file composer.json
```

Once the repository is added to your `composer.json` file, you can install Filament Hexa like any other composer package by using the composer require command:

```bash
composer require hexters/hexa
```

Next, you will be prompted to provide your username and password, which you can get from here: [Filament Hexa License](https://checkout.anystack.sh/filament-hexa?via=arf178).

```bash
Loading composer repositories with package information
Authentication required (filament-hexa.composer.sh):
Username: [licensee-email]
Password: [license-key]
```
Your username will be your email address, and the password will be your license key.

Then, install the Hexa plugin:
```bash
php artisan hexa:install
```

Install database migrations:
```bash
php artisan migrate
```

Create a superadmin account to log in to the admin:
```bash
php artisan hexa:account --create
```

## Plugin Setup

Add the `Hexa` Filament plugin to the created panel. If you haven't created one yet, see how to do it [here](https://filamentphp.com/docs/3.x/panels/configuration#creating-a-new-panel).

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

To declare access permissions for a Resource, the process is similar to that for a Page, as shown below.

```php
use Filament\Resources\Resource;
use Hexters\Hexa\Traits\HexAccess;

class UserResource extends Resource
{
    use HexAccess;

    protected static ?string $permissionId = 'access.user';

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

Declaring access permissions for a Page is similar to declaring them for a Resource.

```php
use Filament\Pages\Page;
use Hexters\Hexa\Traits\HexAccess;

class Dashboard extends Page
{
    use HexAccess;

    protected static ?string $permissionId = 'access.dashboard';

    protected static ?string $descriptionPermission = 'Admin can access the dashboard page';

    public static function canAccess(): bool
    {
        return hexa()->can(static::$permissionId);
    }

    . . .
}
```

### Widget

Declaring access permissions for a Widget involves using the `canView()` method.

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

This will make the sidebar menu for resources and pages appear only for roles that have access.

### Action, etc.

You can use the `visible()` method on several `Class Components`. For example, to apply it to a button:

```php
Tables\Actions\EditAction::make()
    ->visible(hexa()->can('access.user.edit')),
```

For classes that extend `Filament\Resources\Pages\EditRecord`, `Filament\Resources\Pages\CreateRecord`, or `Filament\Resources\Pages\ListRecords`, you can use:

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

Access can be granted to Resources, Pages, Widgets, Button Actions, etc. The access can be checked as follows:

Using the hexa utility function:
```php
hexa()->can('hexa.admin')
```

Using Laravel's auth can function:
```php
auth()->user()?->can('hexa.admin')
```

Using Laravel's Gate class:
```php
use Illuminate\Support\Facades\Gate;

. . .

Gate::allows('hexa.admin')
```

In Blade templates, you can use it as shown below:

```html
<div>
    @can('hexa.admin')
        // Content here ...
    @endcan
</div>
```

## Options Setting

This plugin includes an easy-to-use caching system that stores several settings required by the application. See the file `app/Filament/Pages/Option.php`. You can use the Form component to create various types of form inputs.

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

If you want to save it manually, you can use the following utility function:

```php
hexa()->setOption('key-option', 'The option value can be a string, array, number, etc.')
```

## License
This plugin is not open source. You need a license to use this plugin, which you can purchase at [Filament Hexa License](https://checkout.anystack.sh/filament-hexa?via=arf178) or request from the owner of this plugin.

## Issues

If you encounter any issues with this plugin, you can submit them at the repository:
[Filament Hexa Issue](https://github.com/hexters/hexa-docs/issues).

Thank you for using this plugin. We hope it speeds up your process of creating powerful applications.

Happy Coding 🧑‍💻 🧑‍💻 🧑‍💻
