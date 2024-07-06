# CHANGELOG

# V1.3.2

- Add `select all / deselect all` in permission module.

# V1.3

Date : 07-07-2024

Added helper of retrieving update date option

For example, I want to retrieve the date of the last update of a term & condition that was previously set.

```php
hexa()->getOptionDate('term-condition-page-content') // output : 04-06-2030 10:10:10
```

This helper returns a null value if the data is not found.

# v1.2

- [Add cluster access & additional access](https://github.com/hexters/hexa/commit/10062ae81b5dcc8b61dc973729f8b4a653ac8bb0)

# 1.1.1

- [Add hexa-core config file](https://github.com/hexters/hexa/commit/682f0655b9ce2ed8014e6e8d111699c0c64ac842)
- [update option](https://github.com/hexters/hexa/commit/953ba50eec624d73b74ccf42c18fa119b0c493b8)
- [update icon options](https://github.com/hexters/hexa/commit/5269dbdc893e1c2785b9ff2031e8c1743c1e1482)
- [Add global search](https://github.com/hexters/hexa/commit/858f786ebb2f6c33d84241a28e707b8e9092e15c)
- [Fix reseting password](https://github.com/hexters/hexa/commit/577478dca1034be26c621ec3d0b200aef5fbc630)
- [Update readme](https://github.com/hexters/hexa/commit/8f9a2f772af9ed047513aea7d25de2f42b040f26)
- [Remove permission name](https://github.com/hexters/hexa/commit/7e3eeacba1bcf1c8ca268fdff7e33af7c3cc3a3e)
- [Update reamde](https://github.com/hexters/hexa/commit/20fde84c7e468422450c8f0e4ed5e5a73d9f000f)
- [Fix instaling issue](https://github.com/hexters/hexa/commit/5553e54820642280bcd4fec4b0afa6cf7f95054d)

# V1.1

## Fix bug & New Features
- [Add sub permission & fixes bug](https://github.com/hexters/hexa/commit/e80a043350ab2ea9cf512080ca1db21477d5a180)
- [Add options system](https://github.com/hexters/hexa/commit/33478a47b7d846e6a3b28cf7dca945e972e2e7b4)
- [Update option page](https://github.com/hexters/hexa/commit/ad85cf3bd4b09ceb5ac28f3110fab0b3c3c85ca7)
- [Avatar & status online](https://github.com/hexters/hexa/commit/e5a883270081e57ee2bd1b2f2a328ce4f0b6afb7)

# V1.0

## Filament Hexa v1.0 Release

### What's New

- **Plugin Features**: Introduces Hexa, a robust role & permission management plugin for Filament, adapted from [hexters/ladmin](https://github.com/hexters/ladmin) concept.
- **Installation**: Streamlined installation process via Composer integration and CLI commands.
- **Permission Management**: Effortlessly manage permissions inline with components such as Pages, Resources, and Widgets.
- **Comprehensive Documentation**: Detailed guides available at [Hexa Docs](https://github.com/hexters/hexa-docs) covering setup, configuration, and integration with your Filament project.

### How to Install

To install Filament Hexa v1.0, follow these steps:

1. Add the plugin repository to your `composer.json`.
2. Install the package using Composer:
   ```
   composer require hexters/hexa
   ```
3. Initialize and configure Hexa with artisan commands:
   ```
   php artisan hexa:install
   php artisan hexa:account
   ```

### Getting Started

For comprehensive instructions on setting up panels, configuring access permissions, and integrating Hexa into your Filament project, visit the [Hexa Documentation](https://github.com/hexters/hexa-docs).

### Issues

Found a bug or want to suggest a feature? Please [create an issue](https://github.com/hexters/hexa-docs/issues) on GitHub.