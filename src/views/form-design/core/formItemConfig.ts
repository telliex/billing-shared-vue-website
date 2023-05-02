/**
 * @description：表單配置
 */
import { IVFormComponent } from '../typings/v-form-component';
import { isArray } from 'lodash-es';
import { componentMap as VbenCmp, add } from '/@/components/Form/src/componentMap';
import { ComponentType } from '/@/components/Form/src/types';

import { componentMap as Cmp } from '../components';
import { Component } from 'vue';

const componentMap = new Map<string, Component>();

//如果有其它控件，可以在這裡初始化

//註冊Ant控件庫
Cmp.forEach((value, key) => {
  componentMap.set(key, value);
  if (VbenCmp[key] == null) {
    add(key as ComponentType, value);
  }
});
//註冊vben控件庫
VbenCmp.forEach((value, key) => {
  componentMap.set(key, value);
});

export { componentMap };

/**
 * 設置自定義表單控件
 * @param {IVFormComponent | IVFormComponent[]} config
 */
export function setFormDesignComponents(config: IVFormComponent | IVFormComponent[]) {
  if (isArray(config)) {
    config.forEach((item) => {
      const { componentInstance: component, ...rest } = item;
      componentMap[item.component] = component;
      customComponents.push(Object.assign({ props: {} }, rest));
    });
  } else {
    const { componentInstance: component, ...rest } = config;
    componentMap[config.component] = component;
    customComponents.push(Object.assign({ props: {} }, rest));
  }
}

//外部設置的自定義控件
export const customComponents: IVFormComponent[] = [];

// 左側控件列表與初始化的控件屬性
// props.slotName,會在formitem級別生成一個slot,並綁定當前record值
// 屬性props，類型為對象，不能為undefined或是null。
export const baseComponents: IVFormComponent[] = [
  {
    component: 'InputCountDown',
    label: '倒計時輸入',
    icon: 'line-md:iconify2',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: 'IconPicker',
    label: '圖標選擇器',
    icon: 'line-md:iconify2',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: 'StrengthMeter',
    label: '密碼強度',
    icon: 'wpf:password1',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: 'AutoComplete',
    label: '自動完成',
    icon: 'wpf:password1',
    colProps: { span: 24 },
    field: '',
    componentProps: {
      placeholder: '請輸入正則表達式',
      options: [
        {
          value: '/^(?:(?:\\+|00)86)?1[3-9]\\d{9}$/',
          label: '手機號碼',
        },
        {
          value: '/^((ht|f)tps?:\\/\\/)?[\\w-]+(\\.[\\w-]+)+:\\d{1,5}\\/?$/',
          label: '網址帶端口號',
        },
      ],
    },
  },
  {
    component: 'Divider',
    label: '分割線',
    icon: 'radix-icons:divider-horizontal',
    colProps: { span: 24 },
    field: '',
    componentProps: {
      orientation: 'center',
      dashed: true,
    },
  },
  {
    component: 'Checkbox',
    label: '復選框',
    icon: 'ant-design:check-circle-outlined',
    colProps: { span: 24 },
    field: '',
  },
  {
    component: 'CheckboxGroup',
    label: '復選框-組',
    icon: 'ant-design:check-circle-filled',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '選項1',
          value: '1',
        },
        {
          label: '選項2',
          value: '2',
        },
      ],
    },
  },
  {
    component: 'Input',
    label: '輸入框',
    icon: 'bi:input-cursor-text',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      type: 'text',
    },
  },
  {
    component: 'InputNumber',
    label: '數字輸入框',
    icon: 'ant-design:field-number-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: { style: 'width:200px' },
  },
  {
    component: 'InputTextArea',
    label: '文本域',
    icon: 'ant-design:file-text-filled',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'Select',
    label: '下拉選擇',
    icon: 'gg:select',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '選項1',
          value: '1',
        },
        {
          label: '選項2',
          value: '2',
        },
      ],
    },
  },

  {
    component: 'Radio',
    label: '單選框',
    icon: 'ant-design:check-circle-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'RadioGroup',
    label: '單選框-組',
    icon: 'carbon:radio-button-checked',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '選項1',
          value: '1',
        },
        {
          label: '選項2',
          value: '2',
        },
      ],
    },
  },
  {
    component: 'DatePicker',
    label: '日期選擇',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'RangePicker',
    label: '日期範圍',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      placeholder: ['開始日期', '結束日期'],
    },
  },
  {
    component: 'MonthPicker',
    label: '月份選擇',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      placeholder: '請選擇月份',
    },
  },
  {
    component: 'TimePicker',
    label: '時間選擇',
    icon: 'healthicons:i-schedule-school-date-time',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'Slider',
    label: '滑動輸入條',
    icon: 'vaadin:slider',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'Rate',
    label: '評分',
    icon: 'ic:outline-star-rate',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'Switch',
    label: '開關',
    icon: 'entypo:switch',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'TreeSelect',
    label: '樹形選擇',
    icon: 'clarity:tree-view-line',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      treeData: [
        {
          label: '選項1',
          value: '1',
          children: [
            {
              label: '選項三',
              value: '1-1',
            },
          ],
        },
        {
          label: '選項2',
          value: '2',
        },
      ],
    },
  },
  {
    component: 'Upload',
    label: '上傳',
    icon: 'ant-design:upload-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      api: () => 1,
    },
  },
  {
    component: 'Cascader',
    label: '級聯選擇',
    icon: 'ant-design:check-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '選項1',
          value: '1',
          children: [
            {
              label: '選項三',
              value: '1-1',
            },
          ],
        },
        {
          label: '選項2',
          value: '2',
        },
      ],
    },
  },
  // {
  //   component: 'Button',
  //   label: '按鈕',
  //   icon: 'dashicons:button',
  //   field: '',
  //   colProps: { span: 24 },
  //   hiddenLabel: true,
  //   componentProps: {},
  // },
  // {
  //   component: 'ColorPicker',
  //   label: '顏色選擇器',
  //   icon: 'carbon:color-palette',
  //   field: '',
  //   colProps: { span: 24 },
  //   componentProps: {
  //     defaultValue: '',
  //     value: '',
  //   },
  // },

  {
    component: 'slot',
    label: '插槽',
    icon: 'vs:timeslot-question',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      slotName: 'slotName',
    },
  },
];

// https://next.antdv.com/components/transfer-cn
const transferControl = {
  component: 'Transfer',
  label: '穿梭框',
  icon: 'bx:bx-transfer-alt',
  field: '',
  colProps: { span: 24 },
  componentProps: {
    render: (item) => item.title,
    dataSource: [
      {
        key: 'key-1',
        title: '標題1',
        description: '描述',
        disabled: false,
        chosen: true,
      },
      {
        key: 'key-2',
        title: 'title2',
        description: 'description2',
        disabled: true,
      },
      {
        key: 'key-3',
        title: '標題3',
        description: '描述3',
        disabled: false,
        chosen: true,
      },
    ],
  },
};

baseComponents.push(transferControl);

export const layoutComponents: IVFormComponent[] = [
  {
    field: '',
    component: 'Grid',
    label: '柵格佈局',
    icon: 'icon-grid',
    componentProps: {},
    columns: [
      {
        span: 12,
        children: [],
      },
      {
        span: 12,
        children: [],
      },
    ],
    colProps: { span: 24 },
    options: {
      gutter: 0,
    },
  },
];
