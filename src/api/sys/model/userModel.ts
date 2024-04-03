/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  id: string;
  displayName: string;
  avatar: string;
  apiToken: string;
  remark: string;
  password: string;
  sex: string;
  birthday: string;
  mobile: string;
  email: string;
  address: string;
  country: string;
  roles: any[];
  mgtNumber: number;
  billMasterRoleId: number;
}
