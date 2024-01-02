import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import moment from 'moment';

export const columns: BasicColumn[] = [
  {
    title: '按鈕名稱',
    dataIndex: 'buttonName',
    width: 100,
    align: 'left',
  },
  {
    title: '權限值',
    dataIndex: 'permission',
    width: 100,
    align: 'left',
  },
  {
    title: '顯示',
    dataIndex: 'isShow',
    width: 80,
    customRender: ({ record }) => {
      const status = record.isShow;
      const enable = status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '狀態',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '啟用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 200,
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
      return moment(record.changeTime).format('YYYY-MM-DD h:mm:ss');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'belongMenuId',
    label: '母選單',
    component: 'Input',
    colProps: { span: 8 },
    ifShow: false,
  },
  {
    field: 'status',
    label: '狀態',
    labelWidth: 50,
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
    field: 'buttonName',
    label: '按鈕權限名稱',
    component: 'Select',
    helpMessage: ['第一級選單需為目錄 catalog'],
    defaultValue: 'CREATE',
    required: true,
    componentProps: {
      options: [
        { label: '新增', value: 'CREATE' },
        { label: '編輯', value: 'UPDATE' },
        { label: '刪除', value: 'REMOVE' },
        { label: '詳情', value: 'DETAIL' },
        { label: '查詢', value: 'QUERY' },
        { label: '保存', value: 'SAVE' },
        { label: '導入', value: 'IMPORT' },
        { label: '導出', value: 'EXPORT' },
      ],
    },
  },
  {
    field: 'permission',
    label: '權限值',
    component: 'Input',
    required: true,
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
  },
  {
    field: 'status',
    label: '狀態',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    helpMessage: ['啓用 / 禁用'],
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '啟用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        onchange: (e: any) => {
          console.log(e);
          if (formModel.status === 1) {
            formModel.isShow = 1;
          } else {
            formModel.isShow = 0;
          }
        },
      };
    },
  },
  {
    field: 'isShow',
    label: '是否顯示',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    helpMessage: ['沒權限時，是: 以 disable 狀態顯示; 否: 不顯示'],
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
    dynamicDisabled: ({ values }) => {
      return values.status === 1 ? false : true;
    },
  },
];
