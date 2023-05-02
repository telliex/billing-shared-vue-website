import { FormSchema } from '/@/components/Form';
const colProps = {
  span: 8,
};

export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '標題',
    colProps,
    componentProps: {
      placeholder: '給目標起個名字',
    },
    required: true,
  },
  {
    field: 'time',
    component: 'RangePicker',
    label: '起止日期',
    colProps,
    required: true,
  },
  {
    field: 'client',
    component: 'Input',
    colProps,
    label: '客戶',
    helpMessage: '目標的服務對像',
    subLabel: '( 選填 )',
    componentProps: {
      placeholder: '請描述你服務的客戶，內部客戶直接 @姓名／工號',
    },
  },
  {
    field: 'weights',
    component: 'InputNumber',
    label: '權重',
    colProps,
    subLabel: '( 選填 )',
    componentProps: {
      formatter: (value: string) => (value ? `${value}%` : ''),
      parser: (value: string) => value.replace('%', ''),
      placeholder: '請輸入',
    },
  },
  {
    field: 'target',
    component: 'InputTextArea',
    label: '目標描述',
    colProps,
    componentProps: {
      placeholder: '請輸入你的階段性工作目標',
      rows: 4,
    },
    required: true,
  },
  {
    field: 'metrics',
    component: 'InputTextArea',
    label: '衡量標準',
    colProps,
    componentProps: {
      placeholder: '請輸入衡量標準',
      rows: 4,
    },
    required: true,
  },

  {
    field: 'inviteer',
    component: 'Input',
    label: '邀評人',
    colProps: {
      span: 8,
    },
    subLabel: '( 選填 )',
    componentProps: {
      placeholder: '請直接 @姓名／工號，最多可邀請 5 人',
    },
  },
  {
    field: 'disclosure',
    component: 'RadioGroup',
    label: '目標公開',
    colProps: {
      span: 16,
    },
    itemProps: {
      extra: '客戶、邀評人默認被分享',
    },
    componentProps: {
      options: [
        {
          label: '公開',
          value: '1',
        },
        {
          label: '部分公開',
          value: '2',
        },
        {
          label: '不公開',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'disclosure',
    component: 'Select',
    label: ' ',
    colProps: {
      span: 8,
    },
    show: ({ model }) => {
      return model.disclosure === '2';
    },
    componentProps: {
      placeholder: '公開給',
      mode: 'multiple',
      options: [
        {
          label: '同事1',
          value: '1',
        },
        {
          label: '同事2',
          value: '2',
        },
        {
          label: '同事3',
          value: '3',
        },
      ],
    },
  },
];
