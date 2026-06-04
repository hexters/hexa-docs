---
description: Integrate Filament Hexa with Filament multi-tenancy — roles are scoped per tenant via the team relationship.
---

# Multi Tenancy

Filament Hexa supports multi-tenancy. The `HexaRole` model includes a `team_id` field and a `team` relationship, which you can integrate with Filament's multi-tenancy system.

When a tenant is active, permission checks are automatically scoped to the roles that belong to the current tenant:

```php
// Resolved against the roles the user holds within the current tenant
hexa()->can('user.index');
```

## Customizing the tenant relationship

The `team()` relationship resolves to your configured tenant model via `Filament::getTenantModel()`. If you need to customize the role model (for example to change the tenant foreign key or relationship), publish the config and point it at your own model — see [Vendor Publish](/guide/vendor-publish).
