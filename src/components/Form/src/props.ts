import type { FieldMapToTime, FormSchema } from './types/form';
import type { CSSProperties, PropType } from 'vue';
import type { ColEx } from './types';
import type { TableActionType } from '/@/components/Table';
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import type { RowProps } from 'ant-design-vue/lib/grid/Row';
import { propTypes } from '/@/utils/propTypes';

export const basicProps = {
  model: {
    type: Object as PropType<Recordable>,
    default: {},
  },
  // 標籤寬度  固定寬度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },
  compact: propTypes.bool,
  // 表單配置規則
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  autoSetPlaceHolder: propTypes.bool.def(true),
  // 在INPUT組件上單擊回車時，是否自動提交
  autoSubmitOnEnter: propTypes.bool.def(false),
  submitOnReset: propTypes.bool,
  submitOnChange: propTypes.bool,
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
  // 禁用表單
  disabled: propTypes.bool,
  emptySpan: {
    type: [Number, Object] as PropType<number>,
    default: 0,
  },
  // 是否顯示收起展開按鈕
  showAdvancedButton: propTypes.bool,
  // 轉化時間
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date;
    },
  },
  rulesMessageJoinLabel: propTypes.bool.def(true),
  // 超過3行自動摺疊
  autoAdvancedLine: propTypes.number.def(3),
  // 不受摺疊影響的行數
  alwaysShowLines: propTypes.number.def(1),

  // 是否顯示操作按鈕
  showActionButtonGroup: propTypes.bool.def(true),
  // 操作列Col配置
  actionColOptions: Object as PropType<Partial<ColEx>>,
  // 顯示重置按鈕
  showResetButton: propTypes.bool.def(true),
  // 是否聚焦第一個輸入框，只在第一個表單項為input的時候作用
  autoFocusFirstItem: propTypes.bool,
  // 重置按鈕配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 顯示確認按鈕
  showSubmitButton: propTypes.bool.def(true),
  // 確認按鈕配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 自定義重置函數
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,

  // 以下為默認props
  hideRequiredMark: propTypes.bool,

  labelCol: Object as PropType<Partial<ColEx>>,

  layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),
  tableAction: {
    type: Object as PropType<TableActionType>,
  },

  wrapperCol: Object as PropType<Partial<ColEx>>,

  colon: propTypes.bool,

  labelAlign: propTypes.string,

  rowProps: Object as PropType<RowProps>,
};
