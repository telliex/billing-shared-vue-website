import { FormSchema } from '/@/components/Form/index';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本設置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全設置',
    component: 'SecureSetting',
  },
  {
    key: '3',
    name: '賬號綁定',
    component: 'AccountBind',
  },
  {
    key: '4',
    name: '新消息通知',
    component: 'MsgNotify',
  },
];

// 基礎設置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'email',
    component: 'Input',
    label: '郵箱',
    colProps: { span: 18 },
  },
  {
    field: 'name',
    component: 'Input',
    label: '暱稱',
    colProps: { span: 18 },
  },
  {
    field: 'introduction',
    component: 'InputTextArea',
    label: '個人簡介',
    colProps: { span: 18 },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '聯繫電話',
    colProps: { span: 18 },
  },
  {
    field: 'address',
    component: 'Input',
    label: '所在地區',
    colProps: { span: 18 },
  },
];

// 安全設置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '賬户密碼',
    description: '當前密碼強度：：強',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手機',
    description: '已綁定手機：：138****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保問題',
    description: '未設置密保問題，密保問題可有效保護賬户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '備用郵箱',
    description: '已綁定郵箱：：ant***sign.com',
    extra: '修改',
  },
  {
    key: '5',
    title: 'MFA 設備',
    description: '未綁定 MFA 設備，綁定後，可以進行二次確認',
    extra: '修改',
  },
];

// 賬號綁定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '綁定淘寶',
    description: '當前未綁定淘寶賬號',
    extra: '綁定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '綁定支付寶',
    description: '當前未綁定支付寶賬號',
    extra: '綁定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '綁定釘釘',
    description: '當前未綁定釘釘賬號',
    extra: '綁定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '賬户密碼',
    description: '其他用户的消息將以站內信的形式通知',
  },
  {
    key: '2',
    title: '系統消息',
    description: '系統消息將以站內信的形式通知',
  },
  {
    key: '3',
    title: '待辦任務',
    description: '待辦任務將以站內信的形式通知',
  },
];
