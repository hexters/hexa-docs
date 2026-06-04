---
description: Store app-wide settings with Filament Hexa's key/value meta option store — setOption, getOption, dateOption, and getOptionKeys.
---

# Meta Options

Hexa ships with a simple key/value store backed by the `hexa_options` table — handy for app-wide settings such as a site name, maintenance flag, or the content of a Terms & Conditions page.

```php
// Store a value
hexa()->setOption('site_name', 'Acme Admin');

// Retrieve a value (with an optional default)
hexa()->getOption('site_name', 'Default Name');

// Get the timestamp the option was created
hexa()->dateOption('site_name');

// List every stored option key
hexa()->getOptionKeys();
```

## Behavior notes

- Values are serialized, so you can store strings, numbers, arrays, and other serializable data.
- Options are cached after writing for fast reads.
- Setting a value to `null` removes the option:

  ```php
  hexa()->setOption('temporary', null); // deletes the option
  ```

- `getOption()` will store the provided default the first time a missing key is requested.
