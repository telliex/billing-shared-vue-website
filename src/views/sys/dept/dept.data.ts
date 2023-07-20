import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import moment from 'moment';

export const columns: BasicColumn[] = [
  {
    title: '部門名稱',
    dataIndex: 'deptName',
    width: 160,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },
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
    field: 'deptName',
    label: '部門名稱',
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
    field: 'deptName',
    label: '部門名稱',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentDept',
    label: '上級部門',
    component: 'TreeSelect',

    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
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
    required: true,
  },
  {
    label: '備註',
    field: 'remark',
    component: 'InputTextArea',
  },
];
