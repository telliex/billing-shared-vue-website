import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import moment from 'moment';
import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage } = useMessage();
export const columns: BasicColumn[] = [
  {
    title: '選單名稱',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: '類型',
    dataIndex: 'type',
    width: 100,
    align: 'left',
  },
  {
    title: '展示名稱',
    dataIndex: 'alias',
    width: 200,
    align: 'left',
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
    width: 200,
    align: 'left',
  },
  {
    title: '按鈕權限',
    dataIndex: 'menuButtons',
    width: 300,
    align: 'left',
    customRender: ({ record }) => {
      const buttonList = record.menuButtons ? record.menuButtons.split(',') : [];
      const buttonColorList = ['default'];
      if (record.type === 'catalog' || !buttonList.length) {
        return '';
      } else {
        return h(
          'div',
          buttonList.map((item) =>
            h(
              Tag,
              { style: { color: buttonColorList[0], marginRight: '5px', marginBottom: '5px' } },
              () => item,
            ),
          ),
        );
      }
    },
    // customRender: ({ record }) => {
    //   const status = record.status;
    //   const enable = status === 1;
    //   const color = enable ? 'green' : 'red';
    //   const text = enable ? '啟用' : '停用';
    //   return h(
    //     'div',
    //     Array.from({ length: 20 }).map(() => {
    //       return h('p', 'hi');
    //     }),
    //   );
    // },
  },
  {
    title: '組件名稱',
    dataIndex: 'componentName',
    align: 'left',
  },
  {
    title: '組件路徑',
    dataIndex: 'component',
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
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
    labelWidth: 150,
    component: 'RadioButtonGroup',
    helpMessage: ['第一級選單需為目錄 catalog'],
    defaultValue: 'catalog',
    componentProps: {
      options: [
        { label: '目錄', value: 'catalog' },
        { label: '選單', value: 'page' },
        // { label: '按鈕', value: 'button' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '選單名稱',
    component: 'Input',
    labelWidth: 150,
    required: true,
  },
  {
    field: 'alias',
    label: '展示名稱',
    component: 'Input',
    helpMessage: ['左側選單呈現文字'],
    required: true,
    labelWidth: 150,
  },
  {
    field: 'parentMenu',
    label: '上級選單',
    labelWidth: 150,
    defaultValue: '',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    // required: ({ values }) => {
    //   return values.type !== 'catalog';
    // },
  },

  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    helpMessage: ['同層級，數字越小越靠上'],
    required: true,
    labelWidth: 150,
  },
  {
    field: 'icon',
    label: '圖標',
    labelWidth: 150,
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
    required: ({ values }) => {
      return values.type === 'catalog';
    },
  },
  {
    field: 'description',
    label: '描述',
    labelWidth: 150,
    component: 'Input',
  },

  {
    field: 'routePath',
    label: '路由地址',
    component: 'Input',
    labelWidth: 150,
    helpMessage: [
      '[站内-第一級選單]: 以 "/" 開頭, 末尾不加 "/"',
      '[站内-非第一級選單]: 首尾不加 "/"',
      '[站外]: 以 "http" 或 "https" 開頭',
    ],
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'componentName',
    label: '組件名稱',
    labelWidth: 150,
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
    dynamicDisabled: ({ values }) => {
      return values.type === 'page' && values.isExt === 1 ? true : false;
    },
  },
  {
    field: 'component',
    label: '組件路徑',
    labelWidth: 150,
    helpMessage: ['[選單 page]: Vue 組件相對位置'],
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
    dynamicDisabled: ({ values }) => {
      return values.isExt === 1 ? true : false;
    },
    componentProps: ({ formModel }) => {
      return {
        onchange: () => {
          if (formModel.type === 'page' && formModel.component === 'LAYOUT') {
            // hack
            createMessage.warning('LAYOUT 為 catalog 保留字，不可在此設置');
            formModel.component = '';
          }
        },
      };
    },
  },
  {
    field: 'permission',
    label: '權限標識',
    labelWidth: 150,
    helpMessage: ['[選單 page]: 首字母大寫'],
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '狀態',
    labelWidth: 150,
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
    labelWidth: 150,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    helpMessage: ['站外連結.組件路由名稱及組件路徑需設爲 "IFrame"'],
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '否', value: 0 },
          { label: '是', value: 1 },
        ],
        onchange: () => {
          if (formModel.isExt === 1) {
            // outer link
            if (
              formModel.routePath &&
              !formModel.routePath.match(/(http|https):\/\/([\w.]+\/?)\S*/gi)
            ) {
              formModel.routePath = '';
            }
            formModel.component = 'IFrame';
            formModel.componentName = 'IFrame';
          } else {
            // inner link
            if (
              formModel.routePath &&
              formModel.routePath.match(/(http|https):\/\/([\w.]+\/?)\S*/gi)
            ) {
              formModel.routePath = '';
            }
            formModel.component = '';
            formModel.componentName = '';
          }
        },
      };
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'isCache',
    label: '是否緩存',
    labelWidth: 150,
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
