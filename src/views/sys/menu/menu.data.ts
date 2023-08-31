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
    title: 'Menu name',
    dataIndex: 'menuName',
    width: 300,
    align: 'left',
  },
  {
    title: 'Tyoe',
    dataIndex: 'type',
    width: 100,
    align: 'left',
  },
  {
    title: 'Display name',
    dataIndex: 'alias',
    width: 200,
    align: 'left',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Enable' : 'Disable';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: 'Route path',
    dataIndex: 'routePath',
    align: 'left',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 200,
    align: 'left',
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: 'Permission',
    dataIndex: 'permission',
    width: 200,
    align: 'left',
  },
  // {
  //   title: 'Button Permission',
  //   dataIndex: 'menuButtons',
  //   width: 300,
  //   align: 'left',
  //   customRender: ({ record }) => {
  //     const buttonList = record.menuButtons ? record.menuButtons.split(',') : [];
  //     const buttonColorList = ['default'];
  //     if (record.type === 'catalog' || !buttonList.length) {
  //       return '';
  //     } else {
  //       return h(
  //         'div',
  //         buttonList.map((item) =>
  //           h(
  //             Tag,
  //             { style: { color: buttonColorList[0], marginRight: '5px', marginBottom: '5px' } },
  //             () => item,
  //           ),
  //         ),
  //       );
  //     }
  //   },
  // },
  {
    title: 'Component name',
    dataIndex: 'componentName',
    align: 'left',
  },
  {
    title: 'Component',
    dataIndex: 'component',
    align: 'left',
  },
  {
    title: 'Order',
    dataIndex: 'orderNo',
    width: 80,
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
    title: 'Latest Updated Date',
    dataIndex: 'changeMasterName',
    width: 160,
  },
  {
    title: 'Latest Modified User',
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
    label: 'Status',
    labelWidth: 45,
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
    field: 'type',
    label: 'Type',
    labelWidth: 150,
    component: 'RadioButtonGroup',
    helpMessage: ['The first level menu must be Catalog'],
    defaultValue: 'catalog',
    componentProps: {
      options: [
        { label: 'Catalog', value: 'catalog' },
        { label: 'Page', value: 'page' },
        // { label: '按鈕', value: 'button' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: 'Menu name',
    component: 'Input',
    labelWidth: 150,
    required: true,
  },
  {
    field: 'alias',
    label: 'Dispaly name',
    component: 'Input',
    helpMessage: ['Display text in the left menu'],
    required: true,
    labelWidth: 150,
  },
  {
    field: 'parentMenu',
    label: 'Parent menu',
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
    label: 'Order',
    component: 'InputNumber',
    helpMessage: ['Maximum length is 5'],
    required: true,
    labelWidth: 150,
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
            return Promise.reject('Only integers');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'icon',
    label: 'Icon',
    labelWidth: 150,
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
    required: ({ values }) => {
      return values.type === 'catalog';
    },
    componentProps: {
      // disabled: true,
    },
  },
  {
    field: 'description',
    label: 'Description',
    labelWidth: 150,
    component: 'Input',
  },

  {
    field: 'routePath',
    label: 'Route path',
    component: 'Input',
    labelWidth: 150,
    helpMessage: [
      '[Internal-level 1 menu]: Start with "/", without "/" at the end',
      '[Internal-non level 1 menu]: Without leading and trailing "/"',
      '[External]: Start with "http" or "https"',
    ],
    ifShow: ({ values }) => !isButton(values.type),
    required: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          const pattern = /^[a-zA-Z0-9\/_-]*$/;
          console.log(pattern.test(value));
          if (value && !pattern.test(value)) {
            return Promise.reject('Value does not match routing rules');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'componentName',
    label: 'Component name',
    labelWidth: 150,
    component: 'Input',
    helpMessage: ['PascalCase naming'],
    ifShow: ({ values }) => isMenu(values.type),
    dynamicDisabled: ({ values }) => {
      return values.type === 'page' && values.isExt === 1 ? true : false;
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          const pattern = /^[A-Z][a-zA-Z]*$/;
          console.log(pattern.test(value));
          if (value && !pattern.test(value)) {
            return Promise.reject('PascalCase naming');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'component',
    label: 'Component',
    labelWidth: 150,
    helpMessage: ['Relative position of Vue components'],
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
            createMessage.warning('LAYOUT is a reserved word for catalog and cannot be set here');
            formModel.component = '';
          }
        },
      };
    },
  },
  {
    field: 'permission',
    label: 'Permission',
    labelWidth: 150,
    helpMessage: ['Capitalize'],
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'status',
    label: 'Status',
    labelWidth: 150,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    helpMessage: ['Enable / Disable'],
    componentProps: {
      options: [
        { label: 'Enable', value: 1 },
        { label: 'Disable', value: 0 },
      ],
    },
  },
  {
    field: 'isExt',
    label: 'External link',
    labelWidth: 150,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: 'No', value: 0 },
          { label: 'Yes', value: 1 },
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
    label: 'Cache',
    labelWidth: 150,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: 'No', value: 0 },
          { label: 'Yes', value: 1 },
        ],
        onchange: () => {
          if (formModel.isCache !== 1) {
            formModel.cacheName = '';
          }
        },
      };
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'cacheName',
    label: 'Cache name',
    component: 'Input',
    helpMessage: ['PascalCase naming'],
    labelWidth: 150,
    ifShow: ({ values }) => values.isCache === 1,
    required: ({ values }) => {
      return values.isCache === 1;
    },
    rules: [
      {
        // @ts-ignore
        validator: async (rule, value) => {
          const pattern = /^[A-Z][a-zA-Z]*$/;
          console.log(pattern.test(value));
          if (value && !pattern.test(value)) {
            return Promise.reject('PascalCase naming');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'isShow',
    label: 'Show',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: 'No', value: 0 },
        { label: 'Yes', value: 1 },
      ],
    },
    ifShow: ({ values }) => isButton(values.type),
  },
];
