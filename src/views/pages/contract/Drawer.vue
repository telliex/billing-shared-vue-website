<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="80%"
    @ok="handleSubmit"
    @close="handleClose"
  >
    <div class="pr-20 pl-20 pt-10 pb-10">
      <a-row :gutter="60">
        <a-col :span="10">
          <BasicForm @register="registerMainForm" />
        </a-col>
        <a-col :span="8" :offset="4">
          <div ref="wrapEl">
            <h4 class="mb-10" v-if="tempAreaObject.length">合約期間</h4>
            <CollapseContainer
              :title="item.date"
              v-for="(item, index) in tempAreaObject"
              :key="index"
            >
              <BasicForm
                :schemas="dynamicContractTimeArea(item.timeAreaData.disabled)"
                :model="item.timeAreaData.data"
                @register="item.timeAreaData.Form[0]"
              />
            </CollapseContainer>
          </div>
        </a-col>
      </a-row>
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, nextTick } from 'vue';
  // hooks
  import { useMessage } from '/@/hooks/web/useMessage';
  // components
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import type { FormSchema, UseFormReturnType, FormProps } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useLoading } from '/@/components/Loading';
  // plugin
  import dayjs from 'dayjs';
  import { Guid } from 'js-guid';
  import { Row, Col } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  // api
  import {
    getPayerAccountIdDropdown,
    getContractDropdown,
    updateContract,
    createContract,
  } from '/@/api/functions/contract';
  import { GetDictionaryItems } from '/@/api/sys/system';

  interface AreaNumber {
    date: string;
    timeAreaData: {
      disabled: boolean;
      data: {
        start_date: string;
        end_date: string;
        cost_min_charge: number;
        cost_discount_rate: number;
        revenue_min_charge: number;
        revenue_discount_rate: number;
      };
      Form: UseFormReturnType;
    };
  }

  export default defineComponent({
    name: 'ContractDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      [Row.name]: Row,
      [Col.name]: Col,
      CollapseContainer,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const getTitle = computed(() =>
        !unref(isUpdate) ? t('contract.addContract') : t('contract.updateContract'),
      );
      // need to change in future
      let currentContractClass = ref('1');
      // const userStore = useUserStore();
      // let who = computed(() => userStore.getUserInfo?.userId);

      const wrapEl = ref<ElRef>(null);
      const isUpdate = ref(true);
      const labelWidth = 180;

      let areaObjectNum = ref(0);
      let itemDisabled = ref(false);
      let contractStartDate = ref('');
      let startBuildAdditionArea = ref(false);

      // main info schema
      const schemasMainForm: FormSchema[] = [
        {
          field: 'id',
          component: 'Input',
          label: 'id',
          labelWidth,
          show: false,
          defaultValue: '',
        },
        {
          field: 'contract_class',
          component: 'Select',
          label: '合約類別',
          show: false,
          colProps: {},
          componentProps: {},
        },
        // {
        //   field: 'contract_type',
        //   component: 'Select',
        //   labelWidth,
        //   label: '合約類型',
        //   colProps: {
        //     span: 24,
        //   },
        //   required: true,
        //   componentProps: () => {
        //     return {
        //       showSearch: true,
        //       placeholder: '請選擇合約類型',
        //       disabled: itemDisabled.value,
        //       options: [
        //         {
        //           label: 'Resole ES',
        //           value: '1',
        //         },
        //         {
        //           label: 'Resold Enterprise On-Ramp',
        //           value: '2',
        //         },
        //       ],
        //     };
        //   },
        //   rules: [{ required: true, message: '請選擇合約類型' }],
        // },
        {
          field: 'contract_type',
          component: 'ApiSelect',
          label: '合約類型:',
          labelWidth,
          colProps: {
            span: 24,
          },
          componentProps: () => {
            return {
              showSearch: true,
              size: 'small',
              placeholder: '請選擇合約類型',
              disabled: itemDisabled.value,
              api: async (para) => {
                let results = await GetDictionaryItems(para);
                return new Promise((resolve) => {
                  resolve(results[0].response_items);
                });
              },
              params: {
                trace_id: Guid.newGuid().toString(),
                request_items: [
                  {
                    item_type: 'contract_type',
                    item_key: '',
                    item_key2: '',
                  },
                ],
              },
              immediate: false,
              // use name as label
              labelField: 'itemKey',
              // use id as value
              valueField: 'itemValue',
              // mode: 'multiple',
              onChange: (e: any) => {
                console.log('change:', e);
              },
            };
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
                  /* eslint-disable-next-line */
                  return Promise.reject('請選擇合約類型');
                }
                return Promise.resolve();
              },
              trigger: 'blur',
            },
          ],
        },
        {
          field: 'payer_account_id_list',
          component: 'ApiSelect',
          label: 'Payer Account Id',
          labelWidth,
          colProps: {
            span: 24,
          },
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value.length) {
                  /* eslint-disable-next-line */
                  return Promise.reject('值不能為空');
                }
                return Promise.resolve();
              },
              trigger: 'blur',
            },
          ],
          componentProps: ({ formModel, formActionType }) => {
            return {
              api: getPayerAccountIdDropdown,
              mode: 'multiple',
              showSearch: true,
              size: 'small',
              disabled: itemDisabled.value,
              params: {
                trace_id: Guid.newGuid().toString(),
              },
              // immediate: false,
              // use name as label
              labelField: 'field_name',
              // use id as value
              valueField: 'field_value',
              onBlur: () => {
                formModel.previous_id = null;
                let e = formModel['payer_account_id_list'];
                if (e.length) {
                  //  reset city value
                  const { updateSchema } = formActionType;
                  updateSchema({
                    field: 'previous_id',
                    componentProps: () => {
                      return {
                        api: getContractDropdown,
                        showSearch: true,
                        disabled: false,
                        params: {
                          trace_id: Guid.newGuid().toString(),
                          payer_account_id_list: e,
                          status_list: [],
                        },
                        immediate: false,
                        // use name as label
                        labelField: 'field_name',
                        // use id as value
                        valueField: 'field_value',
                      };
                    },
                  });
                }
              },
              // atfer request callback
              onOptionsChange: (options) => {
                console.log('get options', options.length, options);
              },
            };
          },
        },
        {
          field: 'contract_id',
          component: 'Input',
          label: '合約編號',
          labelWidth,
          colProps: {
            span: 24,
          },
          // required: true,
          componentProps: () => {
            return {
              size: 'small',
              disabled: itemDisabled.value,
            };
          },
        },
        {
          field: 'previous_id',
          component: 'ApiSelect',
          label: '前合約編號',
          labelWidth,
          subLabel: '( 前一份合約 )',
          colProps: {
            span: 24,
          },
          componentProps: ({ formModel }) => {
            return {
              showSearch: true,
              size: 'small',
              disabled:
                !formModel['payer_account_id_list'] ||
                formModel['payer_account_id_list'].length === 0
                  ? true
                  : false,
              api: getContractDropdown,
              params: {
                trace_id: Guid.newGuid().toString(),
                payer_account_id_list: formModel.payer_account_id_list,
                status_list: [],
              },
              immediate: false,
              // use name as label
              labelField: 'field_name',
              // use id as value
              valueField: 'field_value',
            };
          },
        },
        {
          field: 'start_date',
          component: 'DatePicker',
          label: '合約開始日期',
          labelWidth,
          colProps: {
            span: 24,
          },
          defaultValue: null,
          helpMessage: ['輸入時間為 UTC+0 時間'],
          componentProps: ({ formModel }) => {
            return {
              disabled: itemDisabled.value,
              size: 'small',
              // disabledDate: disabledDate,
              picker: 'month',
              valueFormat: 'YYYY/MM',
              onChange: (e: any) => {
                if (formModel.end_date && e) {
                  areaObjectNum.value = 0;
                  if (dayjs(formModel.end_date).diff(e, 'month') < 0) {
                    createMessage.warning('合約結束日期不可早於合約開始日期');
                    contractStartDate.value = '';
                    nextTick(() => {
                      formModel.start_date = '';
                    });
                  } else {
                    openWrapLoading();

                    setTimeout(() => {
                      contractStartDate.value = e;
                      areaObjectNum.value = Math.ceil(
                        (dayjs(formModel.end_date).diff(e, 'month') + 1) / 12,
                      );
                      formModel.contract_term = areaObjectNum.value;
                      closeWrapLoading();
                    }, 1000);
                  }
                }
                // formData.type = e;
              },
            };
          },
          rules: [{ required: true, type: 'string' }],
        },
        {
          field: 'end_date',
          component: 'DatePicker',
          label: '合約結束日期',
          labelWidth,
          colProps: {
            span: 24,
          },
          required: true,
          defaultValue: null,
          helpMessage: ['輸入時間為 UTC+0 時間'],
          componentProps: ({ formModel }) => {
            return {
              // disabledDate: disabledDate,
              size: 'small',
              picker: 'month',
              valueFormat: 'YYYY/MM',
              onChange: (e: any) => {
                if (formModel.start_date && e) {
                  areaObjectNum.value = 0;
                  if (dayjs(e).diff(formModel.start_date, 'month') < 0) {
                    createMessage.warning('合約結束日期不可早於合約開始日期');
                    nextTick(() => {
                      formModel.end_date = null;
                    });
                  } else {
                    openWrapLoading();

                    // for (const item of tempAreaObject.value) {
                    //   const { resetFields } = item.timeAreaData.Form[1];
                    //   resetFields();
                    // }

                    setTimeout(() => {
                      contractStartDate.value = formModel.start_date;
                      areaObjectNum.value = Math.ceil(
                        (dayjs(e).diff(formModel.start_date, 'month') + 1) / 12,
                      );
                      formModel.contract_term = areaObjectNum.value;
                      closeWrapLoading();
                    }, 1000);
                  }
                }
              },
            };
          },
        },
        {
          field: 'is_include_payer_fee',
          component: 'Switch',
          helpMessage: 'Payer 本身用量是否加入計價',
          label: 'Payer 是否加入計價',
          defaultValue: false,
          labelWidth,
          colProps: {
            span: 24,
          },
          componentProps: () => {
            return {
              size: 'small',
              disabled: itemDisabled.value,
            };
          },
        },
        {
          // no need to show
          field: 'add_master',
          component: 'InputNumber',
          label: '新增人員',
          defaultValue: 0,
          show: false,
          colProps: {},
          componentProps: {},
        },
        {
          // no need to show
          field: 'change_master',
          component: 'InputNumber',
          label: '修改人員',
          defaultValue: 0,
          show: false,
          colProps: {},
          componentProps: {},
        },
        {
          // no need to show
          field: 'add_master_name',
          component: 'Input',
          label: '新增人員',
          defaultValue: '',
          show: false,
          colProps: {},
          componentProps: {},
        },
        {
          // no need to show
          field: 'change_master_name',
          component: 'Input',
          label: '修改人員',
          defaultValue: '',
          show: false,
          colProps: {},
        },
        {
          // no need to show
          field: 'contract_term',
          component: 'Input',
          label: '合約年期',
          defaultValue: '',
          show: false,
          colProps: {},
          componentProps: {},
        },
        {
          // no need to show
          field: 'status',
          component: 'Input',
          label: '狀態',
          defaultValue: '',
          show: false,
          colProps: {},
          componentProps: {},
        },
        {
          // no need to show
          field: 'termination_id',
          component: 'Input',
          label: '終止合約 ID',
          show: false,
          colProps: {},
          componentProps: {},
        },
        {
          // no need to show
          field: 'termination_id_date',
          component: 'Input',
          label: '終止合約日期',
          defaultValue: '',
          show: false,
          colProps: {},
          componentProps: {},
        },
        {
          // no need to show
          field: 'contract_period',
          component: 'Select',
          label: '',
          defaultValue: '',
          show: false,
        },
      ];

      // additional form schema
      function dynamicContractTimeArea(isDisabled): FormSchema[] {
        return [
          {
            field: 'cost_min_charge',
            component: 'InputNumber',
            label: 'Cost Min Charge',
            defaultValue: 0,
            componentProps: {
              size: 'small',
              disabled: isDisabled,
              maxLength: 10,
            },
            colProps: {
              span: 24,
            },
            rules: [
              {
                // @ts-ignore
                validator: async (rule, value) => {
                  if (!value && value !== 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為空');
                  }
                  if (value < 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為負');
                  }
                  // if (value.match && !value.match(/-?[1-9]\d*/)) {
                  //   /* eslint-disable-next-line */
                  //   return Promise.reject('僅能輸入數字');
                  // }
                  return Promise.resolve();
                },
                trigger: 'blur',
              },
            ],
          },
          {
            field: 'cost_discount_rate',
            component: 'Input',
            label: 'Cost Discount Rate',
            defaultValue: 0,
            componentProps: {
              size: 'small',
              disabled: isDisabled,
              maxLength: 10,
            },
            colProps: {
              span: 24,
            },
            rules: [
              {
                // @ts-ignore
                validator: async (rule, value) => {
                  if (!value && value !== 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為空');
                  }
                  if (value > 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為正');
                  }
                  if (value.match && !value.match(/-?[1-9]\d*/)) {
                    /* eslint-disable-next-line */
                    return Promise.reject('僅能輸入數字');
                  }
                  if (value.match && !value.toString().match(/^-0\.\d{1,4}$/)) {
                    /* eslint-disable-next-line */
                    return Promise.reject('小數點後最多四位');
                  }
                  return Promise.resolve();
                },
                trigger: 'blur',
              },
            ],
            // renderComponentContent: () => {
            //   return {
            //     // prefix: () => 'pSlot',
            //     suffix: () => '%',
            //   };
            // },
          },
          {
            field: 'revenue_min_charge',
            component: 'InputNumber',
            label: 'Revenue Min Charge',
            defaultValue: 0,
            componentProps: {
              size: 'small',
              disabled: isDisabled,
              maxLength: 10,
            },
            colProps: {
              span: 24,
            },
            rules: [
              {
                // @ts-ignore
                validator: async (rule, value) => {
                  if (!value && value !== 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為空');
                  }
                  if (value < 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為負');
                  }
                  // if (value.match && !value.match(/-?[1-9]\d*/)) {
                  //   /* eslint-disable-next-line */
                  //   return Promise.reject('僅能輸入數字');
                  // }
                  return Promise.resolve();
                },
                trigger: 'blur',
              },
            ],
          },
          {
            field: 'revenue_discount_rate',
            component: 'Input',
            label: 'Revenue Discount Rate',
            defaultValue: 0,
            componentProps: {
              size: 'small',
              disabled: isDisabled,
              maxLength: 10,
            },
            colProps: {
              span: 24,
            },
            rules: [
              {
                // @ts-ignore
                validator: async (rule, value) => {
                  if (!value && value !== 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為空');
                  }
                  if (value > 0) {
                    /* eslint-disable-next-line */
                    return Promise.reject('值不能為正');
                  }
                  if (value.match && !value.match(/-?[1-9]\d*/)) {
                    /* eslint-disable-next-line */
                    return Promise.reject('僅能輸入數字');
                  }
                  if (value.match && !value.toString().match(/^-0\.\d{1,4}$/)) {
                    /* eslint-disable-next-line */
                    return Promise.reject('小數點後最多四位');
                  }
                  return Promise.resolve();
                },
                trigger: 'blur',
              },
            ],
            // renderComponentContent: () => {
            //   return {
            //     // prefix: () => 'pSlot',
            //     suffix: () => '%',
            //   };
            // },
          },
        ];
      }

      //hooks
      const { createMessage } = useMessage();

      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: '加載中...',
          absolute: true,
        },
      });

      // 公共屬性
      const baseFormConfig: Partial<FormProps> = {
        showActionButtonGroup: false,
        labelWidth: 180,
        actionColOptions: {
          span: 24,
        },
        showResetButton: false,
        showSubmitButton: false,
      };

      // 產生區域物件
      const tempAreaObject = computed(() => {
        let temp: Array<AreaNumber> = [];

        if (startBuildAdditionArea.value && areaObjectNum.value > 0) {
          if (!unref(isUpdate)) {
            console.log('This is create!!!!!!');

            for (let i = 0; i < areaObjectNum.value; i++) {
              let areaStartDate = dayjs(contractStartDate.value)
                .add(12 * i, 'month')
                .format('YYYY/MM')
                .toString();
              let areaEndDate = dayjs(areaStartDate).add(11, 'month').format('YYYY/MM').toString();
              temp.push({
                date: areaStartDate,
                timeAreaData: {
                  disabled: false,
                  data: {
                    start_date: areaStartDate,
                    end_date: areaEndDate,
                    cost_min_charge: 0,
                    cost_discount_rate: 0,
                    revenue_min_charge: 0,
                    revenue_discount_rate: 0,
                  },
                  Form: useForm(Object.assign(baseFormConfig) as FormProps),
                },
              });
            }
          } else {
            console.log('This is edit!!!!!!');
            let tempObject = getMainFieldsValue();
            for (let i = 0; i < areaObjectNum.value; i++) {
              let areaStartDate = dayjs(contractStartDate.value)
                .add(12 * i, 'month')
                .format('YYYY/MM')
                .toString();
              let areaEndDate = dayjs(areaStartDate).add(11, 'month').format('YYYY/MM').toString();
              temp.push({
                date: areaStartDate,
                timeAreaData: {
                  disabled:
                    dayjs(areaEndDate).diff(dayjs().format('YYYY/MM/DD'), 'month') > 0 &&
                    dayjs(areaStartDate).diff(dayjs().format('YYYY/MM/DD'), 'month') > 0
                      ? false
                      : true,
                  data: {
                    start_date: areaStartDate,
                    end_date: areaEndDate,
                    cost_min_charge: tempObject.contract_period[i]
                      ? tempObject.contract_period[i].cost_min_charge
                      : 0,
                    cost_discount_rate: tempObject.contract_period[i]
                      ? tempObject.contract_period[i].cost_discount_rate
                      : 0,
                    revenue_min_charge: tempObject.contract_period[i]
                      ? tempObject.contract_period[i].revenue_min_charge
                      : 0,
                    revenue_discount_rate: tempObject.contract_period[i]
                      ? tempObject.contract_period[i].revenue_discount_rate
                      : 0,
                  },
                  Form: useForm(Object.assign(baseFormConfig) as FormProps),
                },
              });
            }
          }
        }
        return temp;
      });

      const [
        registerMainForm,
        {
          validate: validateMainForm,
          resetFields,
          setFieldsValue: setMainFieldsValue,
          getFieldsValue: getMainFieldsValue,
          resetSchema: resetMainSchema,
        },
      ] = useForm({
        labelWidth: 120,
        schemas: schemasMainForm,
        actionColOptions: {
          span: 24,
        },
        showResetButton: false,
        showSubmitButton: false,
      });

      //
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetMainSchema(schemasMainForm);
        setDrawerProps({ confirmLoading: false });

        console.log('=========是否有觸發=========');
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          areaObjectNum.value = data.record.contract_period.length;
          contractStartDate.value = dayjs(data.record.start_date).format('YYYY-MM-DD');
          itemDisabled.value = data.record.status === '1' ? true : false;
          resetFields();
          await nextTick();
          setMainFieldsValue({
            ...data.record,
            // add_master: data.record.add_master,
            // change_master: data.record.change_master,
            // contract_class: data.record.contract_class,
            // contract_id: data.record.contract_id,
            // contract_term: data.record.contract_term,
            // contract_period: data.record.contract_period,
            // contract_type: data.record.contract_type,
            start_date: dayjs(data.record.start_date).format('YYYY-MM'),
            end_date: dayjs(data.record.end_date).format('YYYY-MM'),
            // is_include_payer_fee: data.record.is_include_payer_fee,
            // payer_account_id_list: data.record.payer_account_id_list,
            // previous_id: data.record.previous_id,
            // termination_id: data.record.termination_id,
            // termination_id_date: data.record.termination_id_date,
          });

          setTimeout(() => {
            startBuildAdditionArea.value = true;
          }, 1000);

          setTimeout(() => {
            for (let item of tempAreaObject.value) {
              const { setFieldsValue } = item.timeAreaData.Form[1];
              setFieldsValue(item.timeAreaData.data);
            }
          }, 2000);
        } else {
          console.log('create');
          areaObjectNum.value = 0;
          contractStartDate.value = '';
          startBuildAdditionArea.value = true;

          itemDisabled.value = false;
          resetFields();
          setMainFieldsValue({
            id: '',
            add_master: 0,
            change_master: 0,
            contract_class: currentContractClass.value,
            contract_id: '',
            contract_term: 0,
            contract_period: [],
            contract_type: null,
            start_date: '',
            end_date: '',
            is_include_payer_fee: false,
            payer_account_id_list: [],
            previous_id: '',
            termination_id: '',
            termination_id_date: '',
          });
        }
      });

      // no to choice the day before today rull
      // const disabledDate = (current: Dayjs) => {
      //   // Can not select days before today and today
      //   return current && current < dayjs().endOf('day');
      // };

      async function handleSubmit() {
        try {
          let additionAreaObject: any[] = [];
          let status = true;
          await validateMainForm()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              status = false;
            });

          for (const item of tempAreaObject.value) {
            const { getFieldsValue, validate } = item.timeAreaData.Form[1];
            await validate()
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                status = false;
              });
            console.log(getFieldsValue());

            additionAreaObject.push({
              ...getFieldsValue(),
              cost_discount_rate: Number(getFieldsValue().cost_discount_rate),
              revenue_discount_rate: Number(getFieldsValue().revenue_discount_rate),
              start_date: item.timeAreaData.data.start_date,
              end_date: item.timeAreaData.data.end_date,
            });
          }

          setDrawerProps({ confirmLoading: true });
          let tempObject: any = getMainFieldsValue();
          tempObject.contract_period = additionAreaObject;
          tempObject.trace_id = Guid.newGuid().toString();
          tempObject.previous_id = tempObject.previous_id ? tempObject.previous_id : '';
          tempObject.contract_id = tempObject.contract_id
            ? tempObject.contract_id
            : `TEMP ${new Date().getTime()}`;

          if (status) {
            if (unref(isUpdate)) {
              // edit
              updateContract(tempObject)
                .then(() => {
                  emit('success', 'update');
                  closeDrawer();
                })
                .catch(() => {
                  createMessage.error('提交失敗');
                });
            } else {
              //add
              createContract(tempObject)
                .then(() => {
                  emit('success', 'add');
                  closeDrawer();
                })
                .catch(() => {
                  createMessage.error('提交失敗');
                });
            }
          } else {
            createMessage.error('欄位填寫有誤');
          }
        } catch (error) {
          createMessage.error('提交失敗');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      function handleClose() {
        console.log('close');
        resetFields();
        closeDrawer();
      }

      return {
        wrapEl,
        registerDrawer,
        registerMainForm,
        getTitle,
        handleSubmit,
        handleClose,
        tempAreaObject,
        dynamicContractTimeArea,
      };
    },
  });
</script>
