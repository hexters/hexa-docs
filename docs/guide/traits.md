---
description: Reference for the Filament Hexa traits — HexaRolePermission, HasHexaRole, UuidGenerator, and UlidGenerator.
---

# Traits Reference

| Trait                | Used on                                       | Purpose                                              |
| -------------------- | --------------------------------------------- | ---------------------------------------------------- |
| `HexaRolePermission` | The `Authenticatable` (User) model            | Provides the `roles()` relationship, guard-scoped.   |
| `HasHexaRole`        | Resources, Pages, Widgets, Clusters           | Declares gates via `defineGates()` and related meta. |
| `UuidGenerator`      | Models with a `uuid` column                   | Auto-generates a UUID and uses it as the route key.  |
| `UlidGenerator`      | Models with a `ulid` column                   | Auto-generates a ULID and uses it as the route key.  |

## `HexaRolePermission`

Add to your `User` model. Exposes the `roles()` many-to-many relationship, filtered by the active guard.

```php
use Hexters\Hexa\HexaRolePermission;

class User extends Authenticatable
{
    use HexaRolePermission;
}
```

## `HasHexaRole`

Add to any component that should contribute permissions.

```php
use Hexters\Hexa\HasHexaRole;

class UserResource extends Resource
{
    use HasHexaRole;

    public function defineGates(): array
    {
        return ['user.index' => __('View users')];
    }
}
```

Optional methods: `roleName()`, `roleDescription()`, `defineGateDescriptions()`, and the `$hexaSort` property — see [Descriptions & Order](/guide/descriptions-and-order).
