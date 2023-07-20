import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

interface ItemAdditionInfo {
  addMaster: number;
  addTime: string;
  changeMaster: number;
  changeTime: string;
}

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

export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
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
  roleValue: string;
  status: number;
  orderNo: number;
  remark: string;
  menuPermission: string;
  menuPermissionArray: Array<string>;
  // addMaster: number;
  // addTime: string;
  // changeMaster: number;
  // changeTime: string;
}

export type RoleParams = {
  roleName?: string | null;
  status?: number | null;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

// == Department ==
export interface DeptItem extends ItemAdditionInfo {
  id: string;
  orderNo: string;
  remark: string;
  status: number;
}

export type DeptPageParams = BasicPageParams & {
  deptName?: string | null;
  status?: number | null;
};
export type DeptListModel = BasicFetchResult<DeptItem>;

// == User ==
export interface UserItem extends ItemAdditionInfo {
  id: string;
  userName: string;
  realName: string;
  nickname: string;
  email: string;
  remark: string;
  roles: string;
  status: number;
}

export type UserPageParams = BasicPageParams & {
  userName?: string;
  status?: string;
  dept?: string;
};

export type UserListModel = BasicFetchResult<UserItem>;
