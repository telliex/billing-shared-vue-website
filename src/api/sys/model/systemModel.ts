import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

import { ItemAdditionInfo } from '/@/api/sys/model/normalModel';

export interface GetDictionaryModel {
  trace_id: string;
  request_items: {
    item_type: string;
    item_key: string;
    item_key2: string;
  }[];
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

// export interface GetUserInfoModel {
//   roles: RoleInfo[];
//   // 用户id
//   userId: string | number;
//   // 用户名
//   username: string;
//   // 真實名字
//   realName: string;
//   // 頭像
//   avatar: string;
//   // 介紹
//   remark?: string;
//   // 系統
//   system?: string;
//   // 公司
//   company?: string;
//   password?: string;
//   token?: string;
//   homePath?: string;
// }

export interface GetBillingUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真實名字
  realName: string;
  // 頭像
  avatar: string;
  // 介紹
  remark?: string;
  // 系統
  system?: string;
  // 公司
  company?: string;
  password?: string;
  token?: string;
  homePath?: string;
}

export interface GetParameterStoreFromAWSModel {
  trace_id: string;
  parameter_key: string[];
}

export interface GetParameterStoreBackAWSModel {
  name: string;
  value: string;
}

export interface GetBillCodeValueModel {
  trace_id: string;
  request_items: {
    code_type: string;
    code_id: string;
  }[];
}

export interface GetBillCodeValueBackModel {
  request_item: {
    id: string;
    code_type: string;
    code_id: string;
  };
  response_items: { 'code-id': string; 'code-name': string }[];
}

// == Role ==
export interface RoleListItem extends ItemAdditionInfo {
  id: string;
  roleName: string;
  status: number;
  sortNo: number;
  remark: string;
}

export type RolePageParams = BasicPageParams & {
  roleName?: string | null;
  status?: number | null;
  sortBy?: string;
};

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

// == Department ==
export interface DeptItem extends ItemAdditionInfo {
  id: string;
  parentDept: string;
  deptName: string;
  sortNo: string;
  remark: string;
  status: number;
}

export type DeptPageParams = BasicPageParams & {
  deptName?: string | null;
  status?: number | null;
};

export type DeptPageListGetResultModel = BasicFetchResult<DeptItem>;

export type DeptListGetResultModel = DeptItem[];

// == User ==
export interface UserItem extends ItemAdditionInfo {
  id: string;
  displayName: string;
  avatar: string;
  apiToken: string;
  sex: string;
  birthday: string;
  tel: string;
  address: string;
  country: string;
  email: string;
  remark: string;
  roles: any[];
  status: number;
}

export type UserPageParams = BasicPageParams & {
  displayName: string;
  status: number;
  sortBy?: string;
};

export type UserPageListGetResultModel = BasicFetchResult<UserItem>;

export type UserListGetResultModel = UserItem[];
