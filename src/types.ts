export type Operator = '&' | '|';

export type PermissionObject<T extends string> = Record<T, string>;
