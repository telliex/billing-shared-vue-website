import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/sys/system';
import { useMessage } from '/@/hooks/web/useMessage';
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
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已啟用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setRoleStatus(record.id, { status: newStatus })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色狀態`);
            })
            .catch(() => {
              createMessage.error('修改角色狀態失敗');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '備註',
    dataIndex: 'remark',
  },
  {
    title: '創建人',
    dataIndex: 'addMaster',
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
    dataIndex: 'changeMaster',
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
    required: true,
    defaultValue: 100,
    component: 'Input',
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
