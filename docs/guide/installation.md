---
description: Install Filament Hexa via Composer, run the migration, register the plugin, and add the trait to your User model.
---

# Installation

## Requirements

- PHP 8.2+
- Laravel 11, 12, or 13
- Filament v4 or v5

## 1. Install the package

```bash
composer require hexters/hexa
```

## 2. Run the migration

This creates the `hexa_roles`, `hexa_role_user`, and `hexa_options` tables.

```bash
php artisan migrate
```

## 3. Register the plugin

Add the plugin to your panel provider:

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

## 4. Add the trait to your User model

```php
use Hexters\Hexa\HexaRolePermission;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HexaRolePermission; // Add this trait
}
```

That's it. A **Role & Permissions** menu item will appear in your panel, and any user without a role is treated as a [Superuser](/guide/introduction#how-it-works).

![The Role & Permissions list in your panel](/images/role-list.png)

[Next: Assigning Roles →](/guide/assigning-roles)
