import { Operator, PermissionObject } from './types';

import {
  createPermissionObject,
  addPermissions,
  removePermissions,
  verifyPermissions,
} from './permission.helper';

export class Permissions<T extends string> {
  private permissionObject: PermissionObject<T>;

  private permissionNumber: string;

  /** It gets permission names and
   *  initial permission number in base 16 as optional
   * @param permissionNames @type string(name)[]
   * @param initialPermissionNumber @type string(hex number)
   */
  constructor(permissionNames: T[], initialPermissionNumber: string = '0x0') {
    this.createPermissionObject(permissionNames);
    this.permissionNumber = initialPermissionNumber;
  }

  /**
   * It creates permission object&enum
   * @param permissionNames @type string(name)[]
   */
  private createPermissionObject = (permissionNames: T[]) => {
    this.permissionObject = createPermissionObject(permissionNames);
  };

  /**
   * It gets expected permission names and operator for verification
   * @param expectedPermissions @type string(name)[]
   * @param operator @type string = '|' default
   * @returns boolean
   */
  verifyPermissions = (expectedPermissions: T[], operator: Operator = '|'): boolean =>
    verifyPermissions(this.permissionNumber, this.permissionObject, expectedPermissions, operator);

  /**
   * It gets permission names to add
   * @param newPermissions @type string(name)[]
   */
  addPermissions = (newPermissions: T[]) => {
    this.permissionNumber = addPermissions(this.permissionNumber, this.permissionObject, newPermissions);
  };

  /**
   * It gets permission names to remove
   * @param removedPermissions @type string(name)[]
   */
  removePermissions = (removedPermissions: T[]) => {
    this.permissionNumber = removePermissions(
      this.permissionNumber,
      this.permissionObject,
      removedPermissions,
    );
  };

  /**
   * It returns permission object
   * @returns Record<string(name), string>
   */
  getPermissionObject = (): PermissionObject<T> => this.permissionObject;

  /**
   * It returns permission number
   * @returns string
   */
  getPermissionNumber = (): string => this.permissionNumber;
}
