import { IAnyObject } from '../../../typings/base-type';
import { baseComponents, customComponents } from '../../../core/formItemConfig';

export const globalConfigState: { span: number } = {
  span: 24,
};
export interface IBaseFormAttrs {
  name: string; // 字段名
  label: string; // 字段標籤
  component?: string; // 屬性控件
  componentProps?: IAnyObject; // 傳遞給控件的屬性
  exclude?: string[]; // 需要排除的控件
  includes?: string[]; // 符合條件的組件
  on?: IAnyObject;
  children?: IBaseFormAttrs[];
  category?: 'control' | 'input';
}

export interface IBaseFormItemControlAttrs extends IBaseFormAttrs {
  target?: 'props' | 'options'; // 綁定到對像下的某個目標key中
}

export const baseItemColumnProps: IBaseFormAttrs[] = [
  {
    name: 'span',
    label: '柵格數',
    component: 'Slider',
    on: {
      change(value: number) {
        globalConfigState.span = value;
      },
    },
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },

  {
    name: 'offset',
    label: '柵格左側的間隔格數',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'order',
    label: '柵格順序,flex 佈局模式下有效',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'pull',
    label: '柵格向左移動格數',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'push',
    label: '柵格向右移動格數',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'xs',
    label: '<576px 響應式柵格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'sm',
    label: '≥576px 響應式柵格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'md',
    label: '≥768p 響應式柵格',
    component: 'Slider',

    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'lg',
    label: '≥992px 響應式柵格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'xl',
    label: '≥1200px 響應式柵格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: 'xxl',
    label: '≥1600px 響應式柵格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    name: '≥2000px',
    label: '≥1600px 響應式柵格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
];

// 控件屬性面板的配置項
export const advanceFormItemColProps: IBaseFormAttrs[] = [
  {
    name: 'labelCol',
    label: '標籤col',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
    exclude: ['Grid'],
  },
  {
    name: 'wrapperCol',
    label: '控件-span',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
    exclude: ['Grid'],
  },
];
// 控件屬性面板的配置項
export const baseFormItemProps: IBaseFormAttrs[] = [
  {
    // 動態的切換控件的類型
    name: 'component',
    label: '控件-FormItem',
    component: 'Select',
    componentProps: {
      options: baseComponents
        .concat(customComponents)
        .map((item) => ({ value: item.component, label: item.label })),
    },
  },
  {
    name: 'label',
    label: '標籤',
    component: 'Input',
    componentProps: {
      type: 'Input',
      placeholder: '請輸入標籤',
    },
    exclude: ['Grid'],
  },
  {
    name: 'field',
    label: '字段標識',
    component: 'Input',
    componentProps: {
      type: 'InputTextArea',
      placeholder: '請輸入字段標識',
    },
    exclude: ['Grid'],
  },
  {
    name: 'helpMessage',
    label: 'helpMessage',
    component: 'Input',
    componentProps: {
      placeholder: '請輸入提示信息',
    },
    exclude: ['Grid'],
  },
];

// 控件屬性面板的配置項
export const advanceFormItemProps: IBaseFormAttrs[] = [
  {
    name: 'labelAlign',
    label: '標籤對齊',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '靠左',
          value: 'left',
        },
        {
          label: '靠右',
          value: 'right',
        },
      ],
    },
    exclude: ['Grid'],
  },

  {
    name: 'help',
    label: 'help',
    component: 'Input',
    componentProps: {
      placeholder: '請輸入提示信息',
    },
    exclude: ['Grid'],
  },
  {
    name: 'extra',
    label: '額外消息',
    component: 'Input',
    componentProps: {
      type: 'InputTextArea',
      placeholder: '請輸入額外消息',
    },
    exclude: ['Grid'],
  },
  {
    name: 'validateTrigger',
    label: 'validateTrigger',
    component: 'Input',
    componentProps: {
      type: 'InputTextArea',
      placeholder: '請輸入validateTrigger',
    },
    exclude: ['Grid'],
  },
  {
    name: 'validateStatus',
    label: '校驗狀態',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '默認',
          value: '',
        },
        {
          label: '成功',
          value: 'success',
        },
        {
          label: '警告',
          value: 'warning',
        },
        {
          label: '錯誤',
          value: 'error',
        },
        {
          label: '校驗中',
          value: 'validating',
        },
      ],
    },
    exclude: ['Grid'],
  },
];

export const baseFormItemControlAttrs: IBaseFormItemControlAttrs[] = [
  {
    name: 'required',
    label: '必填項',
    component: 'Checkbox',
    exclude: ['alert'],
  },
  {
    name: 'hidden',
    label: '隱藏',
    component: 'Checkbox',
    exclude: ['alert'],
  },
  {
    name: 'hiddenLabel',
    component: 'Checkbox',
    exclude: ['Grid'],
    label: '隱藏標籤',
  },
  {
    name: 'colon',
    label: 'label後面顯示冒號',
    component: 'Checkbox',
    componentProps: {},
    exclude: ['Grid'],
  },
  {
    name: 'hasFeedback',
    label: '輸入反饋',
    component: 'Checkbox',
    componentProps: {},
    includes: ['Input'],
  },
  {
    name: 'autoLink',
    label: '自動關聯',
    component: 'Checkbox',
    componentProps: {},
    includes: ['Input'],
  },
  {
    name: 'validateFirst',
    label: '檢驗證錯誤停止',
    component: 'Checkbox',
    componentProps: {},
    includes: ['Input'],
  },
];
