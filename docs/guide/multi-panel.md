---
description: Run Filament Hexa across multiple panels using separate auth guards, with roles isolated per guard.
---

# Multi Panel

Filament Hexa supports multiple panels, as long as each panel uses a **different auth guard**. The default guard is `web`.

```php
// Reseller panel
public function panel(Panel $panel): Panel
{
    return $panel
        ->authGuard('reseller')
        ->plugins([Hexa::make()]);
}
```

```php
// Customer panel
public function panel(Panel $panel): Panel
{
    return $panel
        ->authGuard('customer')
        ->plugins([Hexa::make()]);
}
```

Configure the guards in `config/auth.php`.

::: warning Guard naming
Hexa derives the guard from the active auth guard name. Use **single-word guard names** without underscores (e.g. `reseller`, `customer`) rather than `panel_reseller`, so the scoping resolves correctly.
:::

## How roles stay isolated

Every role stores the guard it belongs to in its `guard` column. The `roles()` relationship automatically filters by the active guard, so:

- A role created in the **reseller** panel never appears in the **customer** panel.
- The same `User` model can hold different roles per panel.
