---
description: Add descriptions to roles and gates and control the display order of permission sections in Filament Hexa.
---

# Descriptions & Display Order

These methods are optional but help you build a self-documenting permission screen.

## Adding descriptions to roles and gates

```php
use Hexters\Hexa\HasHexaRole;

class UserResource extends Resource
{
    use HasHexaRole;

    public function roleName(): string
    {
        return __('User Account');
    }

    public function roleDescription(): ?string
    {
        return __('Controls access to create, read, update, delete, and more.');
    }

    public function defineGateDescriptions(): array
    {
        return [
            'user.index'  => __('Admins can access the User page'),
            'user.create' => __('Admins can create new Users'),
        ];
    }
}
```

- `roleName()` — the section title on the Role & Permissions form.
- `roleDescription()` — a short description under the section title.
- `defineGateDescriptions()` — per-gate helper text shown next to each checkbox.

## Setting the display order

By default, sections follow the panel's navigation order. To force a specific position, add a `$hexaSort` property:

```php
public $hexaSort = 4;
```

Lower numbers appear first.
