---
description: Publish the Filament Hexa config to override the role model and customize tenant relationships.
---

# Vendor Publish

To override the role model (e.g. to customize tenant relationships) or change configuration, publish the config file:

```bash
php artisan vendor:publish --provider="Hexters\Hexa\HexaServiceProvider"
```

This publishes `config/hexa.php`:

```php
return [
    'models' => [
        'role' => \Hexters\Hexa\Models\HexaRole::class,
    ],
];
```

Point the `role` key at your own model (extending `HexaRole`) to customize behavior such as the tenant relationship or additional casts.
