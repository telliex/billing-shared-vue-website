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
    title: '角色名稱',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '角色值',
    dataIndex: 'roleValue',
    width: 180,
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: '狀態',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '啟用' : '停用';
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
    title: '備註',
    dataIndex: 'remark',
    align: 'left',
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
      return moment(record.addTime).format('YYYY-MM-DD h:mm:ss');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名稱',
    labelWidth: 75,
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

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名稱',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'Input',
    componentProps: {
      maxLength: 5,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          const pattern = /^[0-9-]*$/;
          console.log(pattern.test(value));
          if (value && !pattern.test(value)) {
            return Promise.reject('只能輸入整數');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
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
  {
    label: '備註',
    field: 'remark',
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
