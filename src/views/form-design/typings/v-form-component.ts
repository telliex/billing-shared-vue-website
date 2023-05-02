import { IAnyObject } from './base-type';
// import { ComponentOptions } from 'vue/types/options';
import { ComponentOptions } from 'vue';
import { IVFormMethods } from '../hooks/useVFormMethods';
import { ColEx } from '/@/components/Form/src/types';

import { SelectValue } from 'ant-design-vue/lib/select';
import { validateOptions } from 'ant-design-vue/lib/form/useForm';
import { RuleError } from 'ant-design-vue/lib/form/interface';
import { FormItem } from '/@/components/Form';
type LayoutType = 'horizontal' | 'vertical' | 'inline';
type labelLayout = 'flex' | 'Grid';
export type PropsTabKey = 1 | 2 | 3;
type ColSpanType = number | string;

declare type Value = [number, number] | number;
/**
 * 組件屬性
 */
export interface IVFormComponent {
  // extends Omit<FormSchema, 'component' | 'label' | 'field' | 'rules'> {
  // 對應的字段
  field?: string;
  // 組件類型
  component: string;
  // 組件label
  label?: string;
  // 自定義組件控件實例
  componentInstance?: ComponentOptions<any>;
  // 組件icon
  icon?: string;
  // 組件校驗規則
  rules?: Partial<IValidationRule>[];
  // 是否隱藏
  hidden?: boolean;
  // 隱藏label
  hiddenLabel?: boolean;
  // 組件寬度
  width?: string;
  // 是否必選
  required?: boolean;
  // 必選提示
  message?: string;
  // 提示信息
  helpMessage?: string;
  // 傳給給組件的屬性，默認會吧所有的props都傳遞給控件
  componentProps?: IAnyObject;
  // 監聽組件事件對象，以v-on方式傳遞給控件
  on?: IAnyObject<(...any: []) => void>;
  // 組件選項
  options?: IAnyObject;
  // 唯一標識
  key?: string;
  // Reference formModelItem
  itemProps?: Partial<FormItem>;

  colProps?: Partial<ColEx>;
  // 聯動字段
  link?: string[];
  // 聯動屬性變化的回調
  update?: (value: any, formItem: IVFormComponent, fApi: IVFormMethods) => void;
  // 控件柵格數
  // span?: number;
  // 標籤佈局
  labelCol?: IAnyObject;
  // 組件佈局
  wrapperCol?: IAnyObject;
  // 子控件
  columns?: Array<{ span: number; children: any[] }>;
}

declare type namesType = string | string[];

/**
 * 表單配置
 */
export interface IFormConfig {
  // 表單項配置列表
  // schemas: IVFormComponent[];
  // 表單配置
  // config: {
  layout?: LayoutType;
  labelLayout?: labelLayout;
  labelWidth?: number;
  labelCol?: Partial<IACol>;
  wrapperCol?: Partial<IACol>;
  hideRequiredMark?: boolean;
  // Whether to disable
  schemas: IVFormComponent[];
  disabled?: boolean;
  labelAlign?: 'left' | 'right';
  // Internal component size of the form
  size?: 'default' | 'small' | 'large';
  // };
  // 當前選中項
  currentItem?: IVFormComponent;
  activeKey?: PropsTabKey;
  colon?: boolean;
}

export interface AForm {
  /**
   * Hide required mark of all form items
   * @default false
   * @type boolean
   */
  hideRequiredMark: boolean;

  /**
   * The layout of label. You can set span offset to something like {span: 3, offset: 12} or sm: {span: 3, offset: 12} same as with <Col>
   * @type IACol
   */
  labelCol: IACol;

  /**
   * Define form layout
   * @default 'horizontal'
   * @type string
   */
  layout: 'horizontal' | 'inline' | 'vertical';

  /**
   * The layout for input controls, same as labelCol
   * @type IACol
   */
  wrapperCol: IACol;

  /**
   * change default props colon value of Form.Item (only effective when prop layout is horizontal)
   * @type boolean
   * @default true
   */
  colon: boolean;

  /**
   * text align of label of all items
   * @type 'left' | 'right'
   * @default 'left'
   */
  labelAlign: 'left' | 'right';

  /**
   * data of form component
   * @type object
   */
  model: IAnyObject;

  /**
   * validation rules of form
   * @type object
   */
  rules: IAnyObject;

  /**
   * Default validate message. And its format is similar with newMessages's returned value
   * @type any
   */
  validateMessages?: any;

  /**
   * whether to trigger validation when the rules prop is changed
   * @type Boolean
   * @default true
   */
  validateOnRuleChange: boolean;

  /**
   * validate the whole form. Takes a callback as a param. After validation,
   * the callback will be executed with two params: a boolean indicating if the validation has passed,
   * and an object containing all fields that fail the validation. Returns a promise if callback is omitted
   * @type Function
   */
  validate: <T = any>(names?: namesType, option?: validateOptions) => Promise<T>;

  /**
   * validate one or several form items
   * @type Function
   */
  validateField: (
    name: string,
    value: any,
    rules: Record<string, unknown>[],
    option?: validateOptions,
  ) => Promise<RuleError[]>;
  /**
   * reset all the fields and remove validation result
   */
  resetFields: () => void;

  /**
   * clear validation message for certain fields.
   * The parameter is prop name or an array of prop names of the form items whose validation messages will be removed.
   * When omitted, all fields' validation messages will be cleared
   * @type string[] | string
   */
  clearValidate: (props: string[] | string) => void;
}

interface IACol {
  /**
   * raster number of cells to occupy, 0 corresponds to display: none
   * @default none (0)
   * @type ColSpanType
   */
  span: Value;

  /**
   * raster order, used in flex layout mode
   * @default 0
   * @type ColSpanType
   */
  order: ColSpanType;

  /**
   * the layout fill of flex
   * @default none
   * @type ColSpanType
   */
  flex: ColSpanType;

  /**
   * the number of cells to offset Col from the left
   * @default 0
   * @type ColSpanType
   */
  offset: ColSpanType;

  /**
   * the number of cells that raster is moved to the right
   * @default 0
   * @type ColSpanType
   */
  push: ColSpanType;

  /**
   * the number of cells that raster is moved to the left
   * @default 0
   * @type ColSpanType
   */
  pull: ColSpanType;

  /**
   * <576px and also default setting, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xs: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥576px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  sm: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥768px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  md: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥992px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  lg: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1200px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xl: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1600px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xxl: { span: ColSpanType; offset: ColSpanType } | ColSpanType;
}

export interface IValidationRule {
  trigger?: 'change' | 'blur' | ['change', 'blur'];
  /**
   * validation error message
   * @type string | Function
   */
  message?: string | number;

  /**
   * built-in validation type, available options: https://github.com/yiminghe/async-validator#type
   * @default 'string'
   * @type string
   */
  type?: string;

  /**
   * indicates whether field is required
   * @default false
   * @type boolean
   */
  required?: boolean;

  /**
   * treat required fields that only contain whitespace as errors
   * @default false
   * @type boolean
   */
  whitespace?: boolean;

  /**
   * validate the exact length of a field
   * @type number
   */
  len?: number;

  /**
   * validate the min length of a field
   * @type number
   */
  min?: number;

  /**
   * validate the max length of a field
   * @type number
   */
  max?: number;

  /**
   * validate the value from a list of possible values
   * @type string | string[]
   */
  enum?: string | string[];

  /**
   * validate from a regular expression
   * @type boolean
   */
  pattern?: SelectValue;

  /**
   * transform a value before validation
   * @type Function
   */
  transform?: (value: any) => any;

  /**
   * custom validate function (Note: callback must be called)
   * @type Function
   */
  validator?: (rule: any, value: any, callback: () => void) => any;
}
