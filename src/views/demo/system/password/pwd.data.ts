import { FormSchema } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'passwordOld',
    label: '當前密碼',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'passwordNew',
    label: '新密碼',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密碼',
    },
    rules: [
      {
        required: true,
        message: '請輸入新密碼',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: '確認密碼',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密碼不能為空');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('兩次輸入的密碼不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
