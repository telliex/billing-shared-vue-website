import moment from 'moment';
import { getAllRoleList, isUserExist } from '/@/api/sys/system';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用戶名',
    dataIndex: 'userName',
    width: 120,
  },
  {
    title: '暱稱',
    dataIndex: 'nickname',
    width: 120,
  },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  //   width: 200,
  // },
  {
    title: '狀態',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '啟用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 200,
    align: 'left',
    customRender: ({ record }) => {
      // const rolesList = record.rolesString ? record.rolesString.split(',') : [];
      const rolesList = record.rolesString ? JSON.parse(record.rolesString) : [];

      const rolesColorList = ['default'];
      // if (record.type === 'catalog' || !rolesList.length) {
      //   return '';
      // } else {
      return h(
        'div',
        rolesList.map((item) =>
          h(
            Tag,
            { style: { color: rolesColorList[0], marginRight: '5px', marginBottom: '5px' } },
            () => item.option.roleValue,
          ),
        ),
      );
      // }
    },
  },
  {
    title: '備註',
    dataIndex: 'remark',
  },
  {
    title: '創建人',
    dataIndex: 'addMasterName',
    width: 100,
  },
  {
    title: '創建時間',
    dataIndex: 'addTime',
    width: 180,
    customRender: ({ record }) => {
      return moment(record.addTime).format('YYYY-MM-DD h:mm:ss');
    },
  },
  {
    title: '修改人',
    dataIndex: 'changeMasterName',
    width: 100,
  },
  {
    title: '修改時間',
    dataIndex: 'changeTime',
    width: 180,
    customRender: ({ record }) => {
      return moment(record.changeTime).format('YYYY-MM-DD h:mm:ss');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用戶名',
    helpMessage: ['不可重複', '英文小寫，名.姓'],
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '狀態',
    component: 'Select',
    componentProps: {
      options: [
        { label: '啟用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用戶名',
    component: 'Input',
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
    rules: [
      {
        required: true,
        message: '請輸入用戶名',
        trigger: 'change',

        validator(_, value) {
          if (!value) {
            /* eslint-disable-next-line */
            console.log('值不能為空');
            return Promise.reject('值不能為空');
          }
          return Promise.resolve();
          // return new Promise((resolve, reject) => {
          //   isUserExist(value)
          //     .then(() => resolve())
          //     .catch((err) => {
          //       reject(err.message || '驗證失敗');
          //     });
          // });
        },
      },
    ],
  },
  {
    field: 'realName',
    label: '名稱',
    required: true,
    component: 'Input',
  },
  {
    field: 'nickname',
    label: '暱稱',
    component: 'Input',
    required: true,
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
    field: 'rolesArray',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      console.log('formModel========', formModel);
      return {
        mode: 'multiple',
        labelInValue: true,
        api: getAllRoleList,
        labelField: 'roleName',
        // valueField: '{key: roleName, label: id}',
        valueField: 'id',
        // apiParamKey: 'parentCode',
      };
    },
  },
  // {
  //   field: 'dept',
  //   label: '所屬部門',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     disabled: true,
  //     fieldNames: {
  //       label: 'deptName',
  //       key: 'id',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  //   // required: true,
  // },
  {
    field: 'status',
    label: '狀態',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '啟用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  // {
  //   label: 'Email',
  //   field: 'email',
  //   component: 'Input',
  //   required: true,
  // },

  {
    label: '備註',
    field: 'remark',
    component: 'InputTextArea',
  },
];
