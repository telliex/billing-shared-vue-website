import moment from 'moment';
import { getAllRoleList } from '/@/api/sys/system';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'User Name',
    dataIndex: 'userName',
    width: 200,
  },
  {
    title: 'Nickname',
    dataIndex: 'nickname',
    width: 120,
  },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  //   width: 200,
  // },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Enable' : 'Disable';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: 'Role',
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
            () => item.label,
          ),
        ),
      );
      // }
    },
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
  },
  {
    title: 'Creater',
    dataIndex: 'addMasterName',
    width: 160,
  },
  {
    title: 'Create Time',
    dataIndex: 'addTime',
    width: 180,
    customRender: ({ record }) => {
      return moment(record.addTime).format('YYYY-MM-DD h:mm:ss');
    },
  },
  {
    title: 'Latest Modified User',
    dataIndex: 'changeMasterName',
    width: 160,
  },
  {
    title: 'Latest Updated Date',
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
    label: 'User Name',
    labelWidth: 80,
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: 'Search User Name',
    },
  },
  {
    field: 'status',
    label: 'Status',
    component: 'Select',
    componentProps: {
      placeholder: 'Search Status',
      options: [
        { label: 'Enable', value: 1 },
        { label: 'Disable', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: 'User name',
    component: 'Input',
    componentProps: {
      disabled: true,
      onChange: (e: any) => {
        console.log(e);
      },
    },
    rules: [
      {
        required: true,
        message: 'Please enter user name',
        trigger: 'change',

        validator(_, value) {
          if (!value) {
            /* eslint-disable-next-line */
            console.log('Value cannot be empty');
            return Promise.reject('Value cannot be empty');
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
    label: 'Real Name',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'nickname',
    label: 'Nickname',
    component: 'Input',
    required: true,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'pwd',
    label: 'Password',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    field: 'rolesArray',
    label: 'Role',
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
    label: 'Status',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      disabled: true,
      options: [
        { label: 'Enable', value: 1 },
        { label: 'Disable', value: 0 },
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
    label: 'Remark',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      disabled: true,
    },
  },
];
