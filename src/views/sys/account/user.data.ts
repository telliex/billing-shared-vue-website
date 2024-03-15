import { FormSchema } from '/@/components/Table';
import { getAllRoleList } from '/@/api/sys/system';
import { VxeFormItemProps, VxeGridPropTypes } from '/@/components/VxeTable';
import XEUtils from 'xe-utils';
import { countryOptionsListApi } from '/@/api/normal/select';

export const accountFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    ifShow: false,
    componentProps: {
      // disabled: true,
    },
  },
  {
    field: 'displayName',
    label: 'User Name',
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.id ? true : false,
        placeholder: 'Please enter user name',
      };
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
  // {
  //   field: 'realName',
  //   label: 'Real Name',
  //   required: true,
  //   component: 'Input',
  //   componentProps: {
  //     disabled: true,
  //   },
  // },
  // {
  //   field: 'nickname',
  //   label: 'Nickname',
  //   component: 'Input',
  //   required: true,
  //   componentProps: {
  //     disabled: true,
  //   },
  // },
  {
    field: 'resetPwd',
    component: 'Switch',
    label: 'Reset Password',
    colProps: {
      span: 8,
    },
    ifShow: ({ values }) => {
      return values.id ? true : false;
    },
  },
  {
    field: 'pwd',
    label: 'Password',
    component: 'InputPassword',
    helpMessage: [
      'English letters in uppercase and lowercase + numbers + special symbols, at least eight characters. Please note that there is a difference in uppercase and lowercase letters.',
    ],
    required: ({ values }) => {
      return values.id && values.resetPwd === true ? true : false;
    },
    ifShow: ({ values }) => {
      return values.resetPwd === true || !values.id ? true : false;
    },
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
        // api: getAllRoleList,
        immediate: false,
        api: async () => {
          const results = await getAllRoleList({
            roleName: '',
            status: 1,
            currentPage: null,
            pageSize: null,
          });
          return new Promise((resolve) => {
            console.log('results:', results);
            resolve(results[0].items);
          });
        },
        resultField: 'items',
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
      // disabled: true,
      options: [
        { label: 'Enable', value: 1 },
        { label: 'Disable', value: 0 },
      ],
    },
  },
  {
    label: 'Remark',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      // disabled: true,
    },
  },
  {
    label: 'MGT Number',
    field: 'mgtNumber',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.id ? true : false,
        placeholder: 'Please enter MGT number',
      };
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'DatePicker',
    defaultValue: null,
    ifShow: false,
    componentProps: {
      disabled: true,
    },
  },
  {
    label: 'Email',
    field: 'email',
    component: 'Input',
    rules: [
      {
        required: true,
        message: 'Please enter email',
        trigger: 'change',

        validator(_, value) {
          if (!value) {
            /* eslint-disable-next-line */
            console.log('Value cannot be empty');
            return Promise.reject('Value cannot be empty');
          }

          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const checkMail = regex.test(value);

          if (!checkMail) {
            return Promise.reject('Please enter a valid email');
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
    label: 'Sex',
    field: 'sex',
    component: 'RadioGroup',
    defaultValue: null,
    ifShow: false,
    componentProps: {
      disabled: true,
      options: [
        {
          label: 'Male',
          value: 'M',
        },
        {
          label: 'Female',
          value: 'F',
        },
      ],
    },
  },
  {
    label: 'Tel',
    field: 'tel',
    component: 'Input',
    defaultValue: null,
    ifShow: false,
    componentProps: {
      disabled: true,
    },
  },
  {
    label: 'Mobile',
    field: 'mobile',
    component: 'Input',
    defaultValue: null,
    ifShow: false,
    componentProps: {
      disabled: true,
    },
  },
  {
    label: 'Address',
    field: 'address',
    component: 'Input',
    defaultValue: null,
    ifShow: false,
    componentProps: {
      disabled: true,
    },
  },
  {
    label: 'Country',
    field: 'country',
    component: 'ApiSelect',
    defaultValue: null,
    ifShow: false,
    componentProps: () => {
      return {
        disabled: true,
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: countryOptionsListApi,
        // api: async (para) => {
        //   const temp = await countryOptionsListApi(para);
        //   return new Promise((resolve) => {
        //     resolve(temp);
        //   });
        // },
        params: {
          which: 'country',
        },

        // use name as label
        labelField: 'label',
        // use id as value
        valueField: 'label',
        // not request untill to select
        immediate: false,
        onChange: (e, v) => {
          console.log('ApiSelect====>:', e, v);
        },
        // atfer request callback
        onOptionsChange: (options) => {
          console.log('get options', options.length, options);
        },
      };
    },
  },
];

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: 'User Name',
    field: 'displayName',
    showOverflow: 'tooltip',
    width: 200,
    sortable: true,
  },
  // {
  //   title: 'Nickname',
  //   field: 'nickname',
  //   showOverflow: 'tooltip',
  //   width: 120,
  //   sortable: true,
  // },
  {
    title: 'Status',
    field: 'status',
    sortable: true,
    minWidth: 80,
    showOverflow: false,
    // formatter({ cellValue }) {
    //   return cellValue === 1 ? 'Enable' : 'Disable';
    // },
    slots: { default: 'status' },
  },
  {
    title: 'Roles',
    field: 'roles',
    minWidth: 200,
    showOverflow: false,
    sortable: true,
    // formatter({ cellValue }) {
    //   return cellValue === 1 ? 'Enable' : 'Disable';
    // },
    slots: { default: 'roles' },
  },

  {
    title: 'Remark',
    width: 150,
    field: 'remark',
    showOverflow: 'tooltip',
    align: 'center',
  },

  {
    title: 'Creator',
    width: 160,
    field: 'addMasterName',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Create Time',
    width: 180,
    field: 'addTime',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
    formatter({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm');
    },
  },
  {
    title: 'Latest Modified User',
    width: 160,
    field: 'changeMasterName',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Latest Updated Date',
    width: 160,
    field: 'changeTime',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
    formatter({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm');
    },
  },
  {
    width: 90,
    title: 'Setting',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  { slots: { default: 'folding_group' }, span: 24 },
  {
    field: 'displayName',
    title: 'User Name',
    itemRender: {
      defaultValue: null,
      name: 'AInput',
      props: {
        clearable: true,
        placeholder: 'Please enter user name',
      },
    },
    span: 8,
    folding: true,
  },
  {
    field: 'status',
    title: 'Status',
    itemRender: {
      name: 'ASelect',
      defaultValue: null,
      props: {
        clearable: true,
        placeholder: 'Please choose',
        options: [
          { label: 'Enable', value: 1 },
          { label: 'Disable', value: 0 },
        ],
      },
    },
    span: 4,
    folding: true,
  },
  {
    span: 12,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: {
            type: 'primary',
            content: 'Search',
            htmlType: 'submit',
            postIcon: 'ant-design:search-outlined',
          },
          attrs: { class: 'mr-2' },
        },
        // { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
    folding: true,
  },
];
