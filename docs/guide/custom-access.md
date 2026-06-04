---
description: Register standalone permission gates (e.g. Horizon, Telescope) with GateItem and customize the Role & Permissions menu.
---

# Custom Access

Some gates don't belong to any Resource, Page, or Widget — for example a third-party dashboard like **Horizon** or **Telescope**. Define these with `GateItem`:

```php
use Hexters\Hexa\Gates\GateItem;

Hexa::make()
    ->gateItems([
        GateItem::make(__('Horizon'))
            ->description(__('Allows the user to manage the Horizon page'))
            ->gateItems([
                'horizon.page' => __('Horizon Page'),
            ])
            ->gateItemDescriptions([
                'horizon.page' => __('Allow the user to access the Horizon page'),
            ]),
    ]);
```

The custom group appears on the Role & Permissions form just like a component-based one, and the gates (`horizon.page` here) can be checked anywhere with `hexa()->can('horizon.page')`.

## Customizing the menu

You can rename, regroup, and re-icon the Role & Permissions navigation item:

```php
use Filament\Support\Icons\Heroicon;

Hexa::make()
    ->shouldRegisterNavigation(true)
    ->navigationName(__('Role & Access'))
    ->navigationGroup('Settings')
    ->navigationIcon(Heroicon::OutlinedLockOpen)
    ->gateItems([
        // ...
    ]);
```
