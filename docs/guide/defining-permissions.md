---
description: Define permission gates inside Filament Resources, Pages, Widgets, and Clusters using the defineGates() method.
---

# Defining Permissions

Permissions (gates) can be defined in **Pages, Resources, Widgets, and Clusters**. Add the `HasHexaRole` trait and implement `defineGates()`:

```php
use Hexters\Hexa\HasHexaRole;

class UserResource extends Resource
{
    use HasHexaRole;

    public function defineGates(): array
    {
        return [
            'user.index'  => __('Allows viewing the user list'),
            'user.create' => __('Allows creating a new user'),
            'user.update' => __('Allows updating a user'),
            'user.delete' => __('Allows deleting a user'),
        ];
    }
}
```

Each **key** (e.g. `user.index`) is the gate you check against. Each **value** is the human-readable label shown on the Role & Permissions form.

The gates you define — together with their [descriptions](/guide/descriptions-and-order) — render as grouped, toggleable checkboxes on the role form:

![Editing a role with grouped permission checkboxes](/images/role-edit.png)

::: info How gates are stored
When you tick permissions on the role form, Hexa stores them grouped by component section, for example:

```php
[
    'user' => ['user.index', 'user.create'],
]
```

The group key is derived from the component's role name. You normally never touch this — but it's useful to know if you seed roles programmatically.
:::

[Next: Granting Access →](/guide/granting-access)
