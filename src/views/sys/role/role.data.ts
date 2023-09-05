import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
// import { Switch } from 'ant-design-vue';
// import { setRoleStatus } from '/@/api/sys/system';
// import { useMessage } from '/@/hooks/web/useMessage';
import moment from 'moment';

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
  {
    title: 'Order',
    dataIndex: 'orderNo',
    width: 80,
  },
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
