---
description: An overview of Filament Hexa — how gates, roles, and the Superuser rule work in this role and permission plugin for Filament v4 & v5.
---

# Introduction

**Filament Hexa** is an **easy-to-use role and permission management plugin** for Filament.
It lets you manage user roles and access permissions across Resources, Pages, Widgets, and Clusters — with support for multi-panel apps via custom guards and multi-tenancy.

Now in version 3, Hexa supports **Filament 4 and 5**, multi-panel setups, is easier to use, and is customizable.

![Editing a role and toggling its permissions inside a Filament panel](/images/role-edit.png)

## Versions

| Hexa | Filament | Documentation                                                                     |
| :--: | :------: | --------------------------------------------------------------------------------- |
|  V1  |    v3    | [Read Documentation](https://github.com/hexters/hexa-docs/blob/main/README.v1.md) |
|  V2  |    v3    | [Read Documentation](https://github.com/hexters/hexa-docs/blob/main/README.V2.md) |
|  V3  |  v4 / v5 | This documentation                                                                |

## How it works

Hexa revolves around a single concept: a **gate** (a permission key such as `user.index`).

1. Each Resource / Page / Widget declares the gates it needs via `defineGates()`.
2. Hexa collects every gate from the panel and registers each one with Laravel's `Gate`.
3. A **Role** stores the list of gates it grants in a JSON `access` column.
4. You check access anywhere with `hexa()->can('user.index')` or Laravel's native authorization.

::: tip Superuser rule
If a user has **no assigned role**, they are treated as a **Superuser** and can access every defined permission. This prevents you from being locked out before any role exists.
:::

## Free vs Pro

There is a free trial edition, [**Hexa Lite**](https://filamentphp.com/plugins/hexters-hexa), with a reduced feature set. This documentation covers the **Pro** edition, which adds widget permissions, custom gates, role/gate descriptions, display ordering, and the meta option store.

[Get started →](/guide/installation)
