import { Operator, PermissionObject } from './types';

/**
 * It creates permission object&enum
 * @param permissionNames @type string(name)[]
 */
export const createPermissionObject = <T extends string>(permissionNames: T[]): PermissionObject<T> => {
  let permissionObject: PermissionObject<T>;

  permissionNames.forEach((name, index) => {
    permissionObject = {
      ...permissionObject,
      [name]: `0x${(2 ** index).toString(16)}`,
    };
  });

  return permissionObject;
};

/**
 * It gets expected permission names, permission number, permission object and operator for verification
 * @param permissionNumber @type string
 * @param permissionObject @type PermissionObject<T>
 * @param expectedPermissions @type string(name)[]
 * @param operator @type string = '|' default
 * @returns boolean
 */
export const verifyPermissions = <T extends string>(
  permissionNumber: string,
  permissionObject: PermissionObject<T>,
  expectedPermissions: T[],
  operator: Operator = '|',
): boolean => {
  let verified: boolean = operator === '&';

  expectedPermissions.forEach((permission) => {
    switch (operator) {
      case '|':
        if ((parseInt(permissionNumber, 16) & parseInt(permissionObject[permission], 16)) !== 0) {
          verified = true;
        }
        break;

      case '&':
        if ((parseInt(permissionNumber, 16) & parseInt(permissionObject[permission], 16)) === 0) {
          verified = false;
        }
        break;

      default:
    }
  });

  return verified;
};

/**
 * It gets permission number, permission object and permission names to add permissions
 * @param permissionNumber @type string
 * @param permissionObject @type PermissionObject<T>
 * @param newPermissions @type string(name)[]
 */
export const addPermissions = <T extends string>(
  permissionNumber: string,
  permissionObject: PermissionObject<T>,
  newPermissions: T[],
) => {
  let newPermissionNumber = permissionNumber;

  newPermissions.forEach((permission) => {
    newPermissionNumber = `0x${(
      parseInt(newPermissionNumber, 16) | parseInt(permissionObject[permission], 16)
    ).toString(16)}`;
  });

  return newPermissionNumber;
};

/**
 * It gets permission number, permission object and permission names to remove permissions
 * @param permissionNumber @type string
 * @param permissionObject @type PermissionObject<T>
 * @param removedPermissions @type string(name)[]
 */
export const removePermissions = <T extends string>(
  permissionNumber: string,
  permissionObject: PermissionObject<T>,
  removedPermissions: T[],
) => {
  let newPermissionNumber = permissionNumber;

  removedPermissions.forEach((permission) => {
    if (verifyPermissions(newPermissionNumber, permissionObject, [permission])) {
      newPermissionNumber = `0x${(
        parseInt(newPermissionNumber, 16) ^ parseInt(permissionObject[permission], 16)
      ).toString(16)}`;
    }
  });

  return newPermissionNumber;
};
