import { IBaseFormAttrs } from './formItemPropsConfig';

interface IBaseComponentProps {
  [key: string]: IBaseFormAttrs[];
}

type BaseFormAttrs = Omit<IBaseFormAttrs, 'tag'>;

export const baseComponentControlAttrs: Omit<IBaseFormAttrs, 'tag'>[] = [
  {
    // 沒有disabled屬性的控件不能作為form控件
    name: 'disabled',
    label: '禁用',
  },
  {
    // 沒有disabled屬性的控件不能作為form控件
    name: 'autofocus',
    label: '自動獲取焦點',
    includes: [
      'Input',
      'Select',
      'InputTextArea',
      'InputNumber',
      'DatePicker',
      'RangePicker',
      'MonthPicker',
      'TimePicker',
      'Cascader',
      'TreeSelect',
      'Switch',
      'AutoComplete',
      'Slider',
    ],
  },
  {
    name: 'allowClear',
    label: '可清除',
    includes: [
      'Input',
      'Select',
      'InputTextArea',
      'InputNumber',
      'DatePicker',
      'RangePicker',
      'MonthPicker',
      'TimePicker',
      'Cascader',
      'TreeSelect',
      'AutoComplete',
    ],
  },
  { name: 'fullscreen', label: '全屏', includes: ['Calendar'] },
  {
    name: 'showSearch',
    label: '可搜索',
    includes: ['Select', 'TreeSelect', 'Cascader', 'Transfer'],
  },
  {
    name: 'showTime',
    label: '顯示時間',
    includes: ['DatePicker', 'RangePicker', 'MonthPicker'],
  },
  {
    name: 'range',
    label: '雙向滑動',
    includes: [],
  },
  {
    name: 'allowHalf',
    label: '允許半選',
    includes: ['Rate'],
  },
  {
    name: 'multiple',
    label: '多選',
    includes: ['Select', 'TreeSelect', 'Upload'],
  },
  {
    name: 'directory',
    label: '文件夾',
    includes: ['Upload'],
  },
  {
    name: 'withCredentials',
    label: '攜帶cookie',
    includes: ['Upload'],
  },
  {
    name: 'bordered',
    label: '是否有邊框',
    includes: ['Select', 'Input'],
  },
  {
    name: 'defaultActiveFirstOption',
    label: '高亮第一個選項',
    component: 'Checkbox',
    includes: ['Select', 'AutoComplete'],
  },
  {
    name: 'dropdownMatchSelectWidth',
    label: '下拉菜單和選擇器同寬',
    component: 'Checkbox',
    includes: ['Select', 'TreeSelect', 'AutoComplete'],
  },
];

//共用屬性
export const baseComponentCommonAttrs: Omit<IBaseFormAttrs, 'tag'>[] = [
  {
    name: 'size',
    label: '尺寸',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '默認',
          value: 'default',
        },
        {
          label: '大',
          value: 'large',
        },
        {
          label: '小',
          value: 'small',
        },
      ],
    },
    includes: ['InputNumber', 'Input', 'Cascader', 'Button'],
  },
  {
    name: 'placeholder',
    label: '佔位符',
    component: 'Input',
    componentProps: {
      placeholder: '請輸入佔位符',
    },
    includes: [
      'AutoComplete',
      'InputTextArea',
      'InputNumber',
      'Input',
      'InputTextArea',
      'Select',
      'DatePicker',
      'MonthPicker',
      'TimePicker',
      'TreeSelect',
      'Cascader',
    ],
  },
  {
    name: 'style',
    label: '樣式',
    component: 'Input',
    componentProps: {
      placeholder: '請輸入樣式',
    },
  },
  {
    name: 'open',
    label: '一直展開下拉菜單',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '默認',
          value: undefined,
        },
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    includes: ['Select', 'AutoComplete'],
  },
];

const componentAttrs: IBaseComponentProps = {
  AutoComplete: [
    {
      name: 'backfill',
      label: '自動回填',
      component: 'Switch',
      componentProps: {
        span: 8,
      },
    },
    {
      name: 'defaultOpen',
      label: '是否默認展開下拉菜單',
      component: 'Checkbox',
    },
  ],
  IconPicker: [
    {
      name: 'mode',
      label: '模式',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'ICONIFY', value: null },
          { label: 'SVG', value: 'svg' },
          // { label: '組合', value: 'combobox' },
        ],
      },
    },
  ],

  // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types
  Input: [
    {
      name: 'type',
      label: '類型',
      component: 'Select',
      componentProps: {
        options: [
          { value: 'text', label: '文本' },
          { value: 'search', label: '搜索' },
          { value: 'number', label: '數字' },
          { value: 'range', label: '數字範圍' },
          { value: 'password', label: '密碼' },
          { value: 'date', label: '日期' },
          { value: 'datetime-local', label: '日期-無時區' },
          { value: 'time', label: '時間' },
          { value: 'month', label: '年月' },
          { value: 'week', label: '星期' },
          { value: 'email', label: '郵箱' },
          { value: 'url', label: 'URL' },
          { value: 'tel', label: '電話號碼' },
          { value: 'file', label: '文件' },
          { value: 'button', label: '按鈕' },
          { value: 'submit', label: '提交按鈕' },
          { value: 'reset', label: '重置按鈕' },
          { value: 'radio', label: '單選按鈕' },
          { value: 'checkbox', label: '復選框' },
          { value: 'color', label: '顏色' },
          { value: 'image', label: '圖像' },
          { value: 'hidden', label: '隱藏' },
        ],
      },
    },
    {
      name: 'defaultValue',
      label: '默認值',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入默認值',
      },
    },
    {
      name: 'prefix',
      label: '前綴',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入前綴',
      },
    },
    {
      name: 'suffix',
      label: '後綴',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入後綴',
      },
    },
    {
      name: 'addonBefore',
      label: '前置標籤',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入前置標籤',
      },
    },
    {
      name: 'addonAfter',
      label: '後置標籤',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入後置標籤',
      },
    },
    {
      name: 'maxLength',
      label: '最大長度',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '請輸入最大長度',
      },
    },
  ],

  InputNumber: [
    {
      name: 'defaultValue',
      label: '默認值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入默認值',
      },
    },
    {
      name: 'min',
      label: '最小值',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '請輸入最小值',
      },
    },
    {
      name: 'max',
      label: '最大值',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '請輸入最大值',
      },
    },
    {
      name: 'precision',
      label: '數值精度',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '請輸入最大值',
      },
    },
    {
      name: 'step',
      label: '步長',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '請輸入步長',
      },
    },
    {
      name: 'decimalSeparator',
      label: '小數點',
      component: 'Input',
      componentProps: { type: 'text', placeholder: '請輸入小數點' },
    },
    {
      name: 'addonBefore',
      label: '前置標籤',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入前置標籤',
      },
    },
    {
      name: 'addonAfter',
      label: '後置標籤',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入後置標籤',
      },
    },
    {
      name: 'controls',
      label: '是否顯示增減按鈕',
      component: 'Checkbox',
    },
    {
      name: 'keyboard',
      label: '是否啟用鍵盤快捷行為',
      component: 'Checkbox',
    },
    {
      name: 'stringMode',
      label: '字符值模式',
      component: 'Checkbox',
    },
    {
      name: 'bordered',
      label: '是否有邊框',
      component: 'Checkbox',
    },
  ],
  InputTextArea: [
    {
      name: 'defaultValue',
      label: '默認值',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '請輸入默認值',
      },
    },
    {
      name: 'maxlength',
      label: '最大長度',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入最大長度',
      },
    },
    {
      name: 'minlength',
      label: '最小長度',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入最小長度',
      },
    },
    {
      name: 'cols',
      label: '可見列數',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入可見列數',
        min: 0,
      },
    },
    {
      name: 'rows',
      label: '可見行數',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入可見行數',
        min: 0,
      },
    },
    {
      name: 'minlength',
      label: '最小長度',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入最小長度',
      },
    },
    {
      name: 'autosize',
      label: '自適應內容高度',
      component: 'Checkbox',
    },
    {
      name: 'showCount',
      label: '是否展示字數',
      component: 'Checkbox',
    },
    {
      name: 'readonly',
      label: '是否只讀',
      component: 'Checkbox',
    },
    {
      name: 'spellcheck',
      label: '讀寫檢查',
      component: 'Checkbox',
    },
    {
      name: 'autocomplete',
      label: '是否自動完成',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '正常', value: null },
          { label: '開', value: 'on' },
          { label: '關', value: 'off' },
        ],
      },
    },
    {
      name: 'autocorrect',
      label: '是否自動糾錯',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '正常', value: null },
          { label: '開', value: 'on' },
          { label: '關', value: 'off' },
        ],
      },
    },
  ],
  Select: [
    {
      name: 'mode',
      label: '選擇模式（默認單選）',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '單選', value: null },
          { label: '多選', value: 'multiple' },
          { label: '標籤', value: 'tags' },
          // { label: '組合', value: 'combobox' },
        ],
      },
    },
    {
      name: 'autoClearSearchValue',
      label: '是否在選中項後清空搜索框',
      component: 'Checkbox',
    },
    {
      name: 'labelInValue',
      label: '選項的label包裝到value中',
      component: 'Checkbox',
    },
    {
      name: 'showArrow',
      label: '顯示下拉小箭頭',
      component: 'Checkbox',
    },
    {
      name: 'defaultOpen',
      label: '默認展開下拉菜單',
      component: 'Checkbox',
    },
  ],
  Checkbox: [
    {
      name: 'indeterminate',
      label: '設置indeterminate狀態',
      component: 'Checkbox',
    },
  ],
  CheckboxGroup: [],
  RadioGroup: [
    {
      name: 'defaultValue',
      label: '默認值',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入默認值',
      },
    },
    {
      name: 'buttonStyle',
      label: 'RadioButton的風格樣式',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'outline',
            value: 'outline',
          },
          {
            label: 'solid',
            value: 'solid',
          },
        ],
      },
    },
    {
      name: 'optionType',
      label: 'options類型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默認',
            value: 'default',
          },
          {
            label: '按鈕',
            value: 'button',
          },
        ],
        //根據其它選項的值更新自身控件配置值
        //compProp當前組件的屬性，
        //configProps，當且組件的所有配置選項
        //self,當前配置的componentProps屬性
        //返回真值進行更新
        // _propsFunc: (compProp, configProps, self) => {
        //   console.log("i'm called");
        //   console.log(compProp, configProps, self);
        //   if (compProp['buttonStyle'] && compProp['buttonStyle'] == 'outline') {
        //     if (!self['disabled']) {
        //       self['disabled'] = true;
        //       return 1;
        //     }
        //   } else {
        //     if (self['disabled']) {
        //       self['disabled'] = false;
        //       return 1;
        //     }
        //   }

        //   // return prop.optionType == 'button';
        // },
      },
    },
    {
      name: 'size',
      label: '尺寸',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默認',
            value: 'default',
          },
          {
            label: '大',
            value: 'large',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  DatePicker: [
    {
      name: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
    {
      name: 'valueFormat',
      label: '綁定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
  ],
  RangePicker: [
    {
      name: 'placeholder',
      label: '佔位符',
      children: [
        {
          name: '',
          label: '',
          component: 'Input',
        },
        {
          name: '',
          label: '',
          component: 'Input',
        },
      ],
    },
    {
      name: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      name: 'valueFormat',
      label: '綁定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
  ],
  MonthPicker: [
    {
      name: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
    {
      name: 'valueFormat',
      label: '綁定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
  ],
  TimePicker: [
    {
      name: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
    {
      name: 'valueFormat',
      label: '綁定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
  ],
  Slider: [
    {
      name: 'defaultValue',
      label: '默認值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入默認值',
      },
    },
    {
      name: 'min',
      label: '最小值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入最小值',
      },
    },
    {
      name: 'max',
      label: '最大值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入最大值',
      },
    },
    {
      name: 'step',
      label: '步長',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入步長',
      },
    },
    {
      name: 'tooltipPlacement',
      label: 'Tooltip 展示位置',
      component: 'Select',
      componentProps: {
        options: [
          { value: 'top', label: '上' },
          { value: 'left', label: '左' },
          { value: 'right', label: '右' },
          { value: 'bottom', label: '下' },
          { value: 'topLeft', label: '上右' },
          { value: 'topRight', label: '上左' },
          { value: 'bottomLeft', label: '右下' },
          { value: 'bottomRight', label: '左下' },
          { value: 'leftTop', label: '左下' },
          { value: 'leftBottom', label: '左上' },
          { value: 'rightTop', label: '右下' },
          { value: 'rightBottom', label: '右上' },
        ],
      },
    },
    {
      name: 'tooltipVisible',
      label: '始終顯示Tooltip',
      component: 'Checkbox',
    },
    {
      name: 'dots',
      label: '只能拖拽到刻度上',
      component: 'Checkbox',
    },
    {
      name: 'range',
      label: '雙滑塊模式',
      component: 'Checkbox',
    },
    {
      name: 'reverse',
      label: '反向坐標軸',
      component: 'Checkbox',
    },
    {
      name: 'vertical',
      label: '垂直方向',
      component: 'Checkbox',
    },
    {
      name: 'included',
      label: '值為包含關係',
      component: 'Checkbox',
    },
  ],
  Rate: [
    {
      name: 'defaultValue',
      label: '默認值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入默認值',
      },
    },
    {
      name: 'character',
      label: '自定義字符',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入自定義字符',
      },
    },
    {
      name: 'count',
      label: 'start 總數',
      component: 'InputNumber',
      componentProps: {
        placeholder: '請輸入自定義字符',
      },
    },
  ],
  Switch: [
    {
      name: 'checkedChildren',
      label: '選中時的內容',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入選中時的內容',
      },
    },
    {
      name: 'checkedValue',
      label: '選中時的值',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入選中時的值',
      },
    },
    {
      name: 'unCheckedChildren',
      label: '非選中時的內容',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入非選中時的內容',
      },
    },
    {
      name: 'unCheckedValue',
      label: '非選中時的值',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入非選中時的值',
      },
    },
    {
      name: 'loading',
      label: '加載中的開關',
      component: 'Checkbox',
    },
    {
      name: 'size',
      label: '尺寸',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默認',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  TreeSelect: [
    {
      name: 'defaultValue',
      label: '默認值',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入默認值',
      },
    },
    {
      name: 'searchPlaceholder',
      label: '搜索框默認文字',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入搜索框默認文字',
      },
    },
    {
      name: 'treeNodeFilterProp',
      label: '輸入項過濾對應的 treeNode 屬性',
      component: 'Input',
      componentProps: {
        defaultValue: 'value',
      },
    },
    {
      name: 'treeNodeLabelProp',
      label: '作為顯示的 prop 設置',
      component: 'Input',
      componentProps: {
        defaultValue: 'title',
      },
    },
    {
      name: 'dropdownClassName',
      label: '下拉菜單的 className 屬性',
      component: 'Input',
      componentProps: {
        placeholder: '請輸入下拉菜單的 className 屬性',
      },
    },

    {
      name: 'labelInValue',
      label: '選項的label包裝到value中',
      component: 'Checkbox',
    },
    {
      name: 'treeIcon',
      label: '展示TreeNode title前的圖標',
      component: 'Checkbox',
    },
    {
      name: 'treeCheckable',
      label: '選項可勾選',
      component: 'Checkbox',
    },
    {
      name: 'treeCheckStrictly',
      label: '節點選擇完全受控',
      component: 'Checkbox',
    },
    {
      name: 'treeDefaultExpandAll',
      label: '默認展開所有',
      component: 'Checkbox',
    },
    {
      name: 'treeLine',
      label: '是否展示線條樣式',
      component: 'Checkbox',
    },
    {
      name: 'maxTagCount',
      label: '最多顯示多少個 tag',
      component: 'InputNumber',
      componentProps: {
        placeholder: '最多顯示多少個 tag',
      },
    },
    {
      name: 'size',
      label: '尺寸',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默認',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  Cascader: [
    {
      name: 'expandTrigger',
      label: '次級展開方式(默認click)',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'click',
            value: 'click',
          },
          {
            label: 'hover',
            value: 'hover',
          },
        ],
      },
    },
  ],
  Button: [
    {
      name: 'type',
      label: '類型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'danger',
            value: 'danger',
          },
          {
            label: 'dashed',
            value: 'dashed',
          },
        ],
      },
    },
    {
      name: 'handle',
      label: '操作',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '提交',
            value: 'submit',
          },
          {
            label: '重置',
            value: 'reset',
          },
        ],
      },
    },
  ],
  Upload: [
    {
      name: 'action',
      label: '上傳地址',
      component: 'Input',
    },
    {
      name: 'name',
      label: '附件參數名（name）',
      component: 'Input',
    },
  ],
  // ColorPicker: [
  //   {
  //     name: 'defaultValue',
  //     label: '默認值',
  //     component: 'AColorPicker',
  //   },
  // ],
  slot: [
    {
      name: 'slotName',
      label: '插槽名稱',
      component: 'Input',
    },
  ],
  Transfer: [
    // {
    //   name: 'operations',
    //   label: '操作文案集合，順序從上至下',
    //   component: 'Input',
    //   componentProps: {
    //     type: 'text',
    //     // defaultValue: ['>', '<'],
    //   },
    // },
    // {
    //   name: 'titles',
    //   label: '標題集合，順序從左至右',
    //   component: 'Input',
    //   componentProps: {
    //     type: 'text',
    //     // defaultValue: ['', ''],
    //   },
    // },
    {
      name: 'oneWay',
      label: '展示為單向樣式',
      component: 'Checkbox',
    },
    {
      name: 'pagination',
      label: '使用分頁樣式',
      component: 'Checkbox',
    },
    {
      name: 'showSelectAll',
      label: '展示全選勾選框',
      component: 'Checkbox',
    },
  ],
};

function deleteProps(list: Omit<IBaseFormAttrs, 'tag'>[], key: string) {
  list.forEach((element, index) => {
    if (element.name == key) {
      list.splice(index, 1);
    }
  });
}

componentAttrs['StrengthMeter'] = componentAttrs['Input'];
componentAttrs['StrengthMeter'].push({
  name: 'visibilityToggle',
  label: '是否顯示切換按鈕',
  component: 'Checkbox',
});

deleteProps(componentAttrs['StrengthMeter'], 'type');
deleteProps(componentAttrs['StrengthMeter'], 'prefix');
deleteProps(componentAttrs['StrengthMeter'], 'defaultValue');
deleteProps(componentAttrs['StrengthMeter'], 'suffix');
//組件屬性
// name 控件的屬性
export const baseComponentAttrs: IBaseComponentProps = componentAttrs;

//在所有的選項中查找需要配置項
const findCompoentProps = (props, name) => {
  const idx = props.findIndex((value: BaseFormAttrs, _index) => {
    return value.name == name;
  });
  if (idx) {
    if (props[idx].componentProps) {
      return props[idx].componentProps;
    }
  }
};

// 根據其它選項的值更新自身控件配置值
export const componentPropsFuncs = {
  RadioGroup: (compProp, options: BaseFormAttrs[]) => {
    const props = findCompoentProps(options, 'size');
    if (props) {
      if (compProp['optionType'] && compProp['optionType'] != 'button') {
        props['disabled'] = true;
        compProp['size'] = null;
      } else {
        props['disabled'] = false;
      }
    }
  },
};
