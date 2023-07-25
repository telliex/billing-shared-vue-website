import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import moment from 'moment';

export const columns: BasicColumn[] = [
  {
    title: '選單名稱',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: '展示名稱',
    dataIndex: 'alias',
    width: 200,
    align: 'left',
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: '圖標',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '權限標識',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: '組件名稱',
    dataIndex: 'componentName',
  },
  {
    title: '組件路徑',
    dataIndex: 'component',
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
      const enable = status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '啟用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
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

const isDir = (type: string) => type === 'catalog';
const isMenu = (type: string) => type === 'page';
const isButton = (type: string) => type === 'button';

export const searchFormSchema: FormSchema[] = [
  // {
  //   field: 'menuName',
  //   label: '選單名稱',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  // {
  //   field: 'alias',
  //   label: '展示名稱',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
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
    field: 'type',
    label: '選單類型',
    component: 'RadioButtonGroup',
    helpMessage: ['第一級選單需為目錄 catalog'],
    defaultValue: 'catalog',
    componentProps: {
      options: [
        { label: '目錄', value: 'catalog' },
        { label: '選單', value: 'page' },
        { label: '按鈕', value: 'button' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '選單名稱',
    component: 'Input',
    required: true,
  },
  {
    field: 'alias',
    label: '展示名稱',
    component: 'Input',
    helpMessage: ['選單呈現文字'],
    required: true,
  },
  {
    field: 'parentMenu',
    label: '上級選單',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'menuName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: ({ values }) => {
      return values.type !== 'catalog';
    },
  },

  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '圖標',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
    required: ({ values }) => {
      return values.type === 'catalog';
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
  },

  {
    field: 'routePath',
    label: '路由地址',
    component: 'Input',
    helpMessage: [
      '[站内-第一級選單]: 以 "/" 開頭, 末尾不加 "/"',
      '[站内-非第一級選單]: 首尾不加 "/"',
      '[站外]: 以 "http" 開頭',
    ],
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'componentName',
    label: '組件路名稱',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'component',
    label: '組件路徑',
    helpMessage: ['[目錄 catalog]: LAYOUT', '[選單 page]: Vue 組件相對位置'],
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '權限標識',
    helpMessage: ['[選單 page]: menu1:view', '[按鈕 button]: menu1:view:btn1'],
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '狀態',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    helpMessage: ['啓用 / 禁用'],
    componentProps: {
      options: [
        { label: '啟用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'isExt',
    label: '是否外鏈',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    helpMessage: ['站外連結.組件路由名稱及組件路徑需設爲 "IFrame"'],
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '否', value: 0 },
          { label: '是', value: 1 },
        ],
        onchange: (e: any) => {
          console.log(formModel);
          console.log('e:', e);
          if (formModel.isExt === 1) {
            // outer link
            if (
              formModel.routePath &&
              !formModel.routePath.match(/(http|https):\/\/([\w.]+\/?)\S*/gi)
            ) {
              formModel.routePath = '';
            }
          } else {
            // inner link
            if (
              formModel.routePath &&
              formModel.routePath.match(/(http|https):\/\/([\w.]+\/?)\S*/gi)
            ) {
              formModel.routePath = '';
            }
          }
        },
      };
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'isCache',
    label: '是否緩存',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'isShow',
    label: '是否顯示',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
    ifShow: ({ values }) => isButton(values.type),
  },
];
