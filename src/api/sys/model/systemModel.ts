/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-03-05 10:19:07
 * @LastEditors: Telliex
 * @LastEditTime: 2023-03-09 02:48:25
 */
/**
 * @description: Login interface parameters
 */
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
