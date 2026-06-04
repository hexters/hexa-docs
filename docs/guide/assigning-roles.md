---
description: Add a role Select field to your Filament user form and understand how roles are scoped per auth guard.
---

# Assigning Roles

To assign a role to a user, add a `Select` input to your `UserForm` (or wherever you edit users):

```php
use Filament\Forms\Components\Select;

// ...

Select::make('roles')
    ->label(__('Role Name'))
    ->relationship('roles', 'name')
    ->multiple()
    ->preload()
    ->placeholder(__('Superuser')),
```

The `roles` relationship is provided by the [`HexaRolePermission`](/guide/traits) trait you added to your `User` model.

::: tip Placeholder = Superuser
Leaving the role empty assigns no role, which means the user becomes a **Superuser**. The `placeholder('Superuser')` text makes that intent clear in the UI.
:::

## Guard scoping

Roles are scoped to the panel's auth guard. The `roles()` relationship only returns roles that belong to the active guard, so the same `User` model can hold different roles across multiple panels. See [Multi Panel](/guide/multi-panel) for details.
