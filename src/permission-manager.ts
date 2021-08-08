import { Operator, PermissionObject } from './types';

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
    permissionNames.forEach((name, index) => {
      this.permissionObject = {
        ...this.permissionObject,
        [name]: `0x${(2 ** index).toString(16)}`,
      };
    });
  };

  /**
   * It gets expected permission names and operator for verification
   * @param expectedPermissions @type string(name)[]
   * @param operator @type string = '|' default
   * @returns boolean
   */
  verifyPermissions = (expectedPermissions: T[], operator: Operator = '|'): boolean => {
    let verified: boolean = operator === '&';

    expectedPermissions.forEach((permission) => {
      switch (operator) {
        case '|':
          if ((parseInt(this.permissionNumber, 16) & parseInt(this.permissionObject[permission], 16)) !== 0) {
            verified = true;
          }
          break;

        case '&':
          if ((parseInt(this.permissionNumber, 16) & parseInt(this.permissionObject[permission], 16)) === 0) {
            verified = false;
          }
          break;

        default:
      }
    });

    return verified;
  };

  /**
   * It gets permission names to add
   * @param newPermissions @type string(name)[]
   */
  addPermissions = (newPermissions: T[]) => {
    newPermissions.forEach((permission) => {
      this.permissionNumber = `0x${(
        parseInt(this.permissionNumber, 16) | parseInt(this.permissionObject[permission], 16)
      ).toString(16)}`;
    });
  };

  /**
   * It gets permission names to remove
   * @param removedPermissions @type string(name)[]
   */
  removePermissions = (removedPermissions: T[]) => {
    removedPermissions.forEach((permission) => {
      if (this.verifyPermissions([permission])) {
        this.permissionNumber = `0x${(
          parseInt(this.permissionNumber, 16) ^ parseInt(this.permissionObject[permission], 16)
        ).toString(16)}`;
      }
    });
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
