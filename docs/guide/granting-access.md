---
description: Check permissions with hexa()->can(), visible(), Blade @can, and Laravel's native Gate — including AND/OR semantics for arrays.
---

# Granting Access

If a user has no assigned role, they are treated as a **Superuser**, meaning they can access all defined permissions.

The most common check uses the `hexa()` helper:

```php
public static function canAccess(): bool
{
    return hexa()->can('user.index');
}
```

## Check for a specific user

To check access **outside** of an authenticated context (e.g. in queues, jobs, or commands):

```php
return hexa()->user(User::first())->can('user.index');
```

## Visible access

Filament supports `visible()` on components like `Action`, `Column`, `Input`, etc.:

```php
Actions\CreateAction::make('create')
    ->visible(fn () => hexa()->can('user.create'));
```

## Laravel native access

Because Hexa registers gates with Laravel's `Gate`, you can also use native authorization:

```php
Auth::user()->can('user.create');
Gate::allows('user.create');

// Only works in an authenticated context (e.g. requests)
Gate::forUser(User::first())->allows('user.create');
```

In Blade:

```blade
@can('user.create')
    ...
@endcan
```

> ✅ For non-authenticated contexts, prefer:
>
> ```php
> hexa()->user(User::first())->can('user.create');
> ```

## Passing multiple permissions

You can pass an array of gates, but the semantics differ between the two paths:

| Call                                        | Meaning                            |
| ------------------------------------------- | ---------------------------------- |
| `hexa()->can(['a', 'b'])`                   | **AND** — all gates must pass (follows `Gate::allows`) |
| `hexa()->user($u)->can(['a', 'b'])`         | **OR** — any matching gate passes  |

```php
// Authenticated path — true only if BOTH are granted
hexa()->can(['user.index', 'user.create']);

// Explicit-user path — true if AT LEAST ONE is granted
hexa()->user($user)->can(['user.index', 'user.create']);
```

::: tip
For a single gate both behave identically. Keep the distinction in mind only when passing an array.
:::
