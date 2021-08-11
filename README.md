## Permission Manager

Developed for permission management using hexadecimal numbers with typescript support

![npm](https://img.shields.io/npm/v/@mertsolak/permission-manager)
![license](https://img.shields.io/npm/l/@mertsolak/permission-manager)
![size](https://img.shields.io/bundlephobia/min/@mertsolak/permission-manager)
![issue](https://img.shields.io/github/issues/mert-solak/permission-manager)

## Installation

Use node package manager to install @mertsolak/permission-manager.

```bash
npm i @mertsolak/permission-manager
```

## Basic Usage

```typescript
import { Permissions, createPermissionNames } from '@mertsolak/permission-manager';

const permissionNames = createPermissionNames('login', 'logout', 'profile', 'settings');
const initialPermissionNumber = '0x0'; // this is optional, default is 0x0;

const permissions = new Permissions(permissionNames, initialPermissionNumber);

permission.addPermissions(['login', 'logout']); // adds login and logout as permissions
permission.removePermissions(['login']); // removes login from the permissions if it exists
permission.verifyPermissions(['login', 'logout'], '&'); // verifies permissions with '&' operator. default operator is '|'.
```
