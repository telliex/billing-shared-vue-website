import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import moment from 'moment';

import { VxeFormItemProps, VxeGridPropTypes } from '/@/components/VxeTable';
import XEUtils from 'xe-utils';

export const columns: BasicColumn[] = [
  {
    title: 'Role name',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: 'Role Value',
    dataIndex: 'roleValue',
    ifShow: false,
    width: 180,
  },
  // {
  //   title: 'Order',
  //   dataIndex: 'orderNo',
  //   width: 80,
  // },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Enable' : 'Disable';
      return h(Tag, { color: color }, () => text);
    },
    // customRender: ({ record }) => {
    //   if (!Reflect.has(record, 'pendingStatus')) {
    //     record.pendingStatus = false;
    //   }
    //   return h(Switch, {
    //     checked: record.status === 1,
    //     checkedChildren: '已啟用',
    //     unCheckedChildren: '已禁用',
    //     loading: record.pendingStatus,
    //     onChange(checked: boolean) {
    //       record.pendingStatus = true;
    //       const newStatus = checked ? 1 : 0;
    //       const { createMessage } = useMessage();
    //       setRoleStatus(record.id, { status: newStatus })
    //         .then(() => {
    //           record.status = newStatus;
    //           createMessage.success(`已成功修改角色狀態`);
    //         })
    //         .catch(() => {
    //           createMessage.error('修改角色狀態失敗');
    //         })
    //         .finally(() => {
    //           record.pendingStatus = false;
    //         });
    //     },
    //   });
    // },
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
    align: 'left',
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
    field: 'roleName',
    label: 'Role Name',
    labelWidth: 75,
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: 'Status',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'Enable', value: 1 },
        { label: 'Disable', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: 'Role name',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          value = value.trim();
          if (!value) {
            return Promise.reject('Please input role name');
          }

          return Promise.resolve();
        },
      },
    ],
  },
  {
    field: 'roleValue',
    label: 'Role value',
    required: true,
    component: 'Input',
    componentProps: {
      maxLength: 10,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          value = value.trim();
          if (!value && value !== 0) {
            return Promise.reject('Please input role value');
          }
          const pattern = /^[0-9a-zA-Z_-]*$/;
          console.log(pattern.test(value));
          if (value && !pattern.test(value)) {
            return Promise.reject('Letters and numbers only');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'orderNo',
    label: 'order',
    component: 'Input',
    componentProps: {
      maxLength: 5,
    },

    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value && value !== 0) {
            return Promise.reject('Please input order');
          }
          const pattern = /^[0-9-]*$/;
          console.log(pattern.test(value));
          if (value && !pattern.test(value)) {
            return Promise.reject('Only integers');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: 'Enable', value: 1 },
        { label: 'Disable', value: 0 },
      ],
    },
  },
  {
    field: 'remark',
    label: 'Remark',
    component: 'InputTextArea',
  },
  // {
  //   label: ' ',
  //   field: 'menuPermission',
  //   component: 'Input',
  // },
  {
    label: ' ',
    field: 'menuPermissionArray',
    slot: 'menu',
    component: 'TreeSelect',
  },
];

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: 'Role name',
    field: 'roleName',
    showOverflow: 'tooltip',
    width: 200,
    sortable: true,
  },
  {
    title: 'Role Value',
    field: 'roleValue',
    showOverflow: 'tooltip',
    width: 180,
    sortable: true,
  },
  // {
  //   title: 'Order',
  //   field: 'orderNo',
  //   width: 80,
  //   sortable: true,
  // },
  {
    title: 'Status',
    field: 'status',
    width: 120,
    sortable: true,
    // formatter({ cellValue }) {
    //   return cellValue === 1 ? 'Enable' : 'Disable';
    // },
    slots: { default: 'status' },
  },

  {
    title: 'Remark',
    width: 150,
    field: 'remark',
    showOverflow: 'tooltip',
    align: 'center',
  },
  {
    title: 'Creater',
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
    width: 100,
    title: 'Setting',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  { slots: { default: 'folding_group' }, span: 24 },
  {
    field: 'roleName',
    title: 'Role Name',
    itemRender: {
      defaultValue: null,
      name: 'AInput',
      props: {
        clearable: true,
      },
    },
    span: 6,
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
    span: 14,
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
