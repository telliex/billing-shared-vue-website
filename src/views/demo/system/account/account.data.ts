import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用戶名',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '暱稱',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '郵箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '創建時間',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
  },
  {
    title: '備註',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用戶名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '暱稱',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用戶名',
    component: 'Input',
    helpMessage: ['本字段演示異步驗證', '不能輸入帶有admin的用戶名'],
    rules: [
      {
        required: true,
        message: '請輸入用戶名',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '驗證失敗');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: '密碼',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'dept',
    label: '所屬部門',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '暱稱',
    component: 'Input',
    required: true,
  },

  {
    label: '郵箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '備註',
    field: 'remark',
    component: 'InputTextArea',
  },
];
