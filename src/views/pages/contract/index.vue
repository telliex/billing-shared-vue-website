<template>
  <div class="contract-management">
    <BasicTable @register="registerTable" ref="tableRef">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-if="timeLimited">
          {{ t('contract.addContract') }}
        </a-button>
      </template>
      <template #expandedRowRender="{ record }">
        <div
          class="contract-subInfo mb-2"
          v-for="item in record.contract_period"
          :key="item.PayerAccountId"
        >
          <span class="mr-4"
            >合約期間:
            <span class="ml-2">
              {{ dayjs(item.start_date).format('YYYY/MM').toString() }} -
              {{ dayjs(item.end_date).format('YYYY/MM').toString() }}</span
            >
          </span>
          <span class="mr-4"
            >Cost Min Charge:<span class="ml-2"> {{ item.cost_min_charge }} </span></span
          >
          <span class="mr-4"
            >Cost Discount:
            <span class="ml-2">{{ Math.abs(item.cost_discount_rate) * 100 }} </span> %
          </span>
          <span class="mr-4"
            >Revenue Min Charge: <span class="ml-2">{{ item.revenue_min_charge }}</span>
          </span>
          <span class="mr-4"
            >Revenue Discount:
            <span class="ml-2">{{ Math.abs(item.revenue_discount_rate) * 100 }} </span> %
          </span>
        </div>
      </template>
      <template #bodyCell="{ column, record }" v-if="timeLimited">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: t('contract.btnUpdateContract'),
                icon: 'grommet-icons:edit',
                onClick: handleActionEdit.bind(null, record),
                disabled: record.status === '0' || record.status === '3',
              },
              {
                label: t('contract.btnTerminatedContract'),
                icon: 'grommet-icons:clear',
                tooltip: '查看用戶詳情',
                onClick: handleTableActionStop.bind(null, record),
                disabled: record.status === '0' || record.status === '4',
              },
              {
                label: t('contract.btnDeleteContract'),
                icon: 'grommet-icons:trash',
                popConfirm: {
                  title: '確認是否刪除？',
                  placement: 'left',
                  confirm: handleActionDelete.bind(null, record),
                },
                disabled: record.status !== '4',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <Drawer @register="registerDrawer" @success="handleDrawerSuccess" />
    <Modal @register="registerModal" @success="handleModalSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  // hooks
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  // components
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { FormSchema } from '/@/components/Form/index';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { RoleEnum } from '/@/enums/roleEnum';
  import Drawer from './Drawer.vue';
  import Modal from './Modal.vue';
  // API from functions
  import {
    getContractList,
    getPayerAccountIdDropdown,
    getContractDropdown,
    deleteContract,
  } from '/@/api/functions/contract';

  // API from system
  import { GetBillCodeValue, GetDictionaryItems } from '/@/api/sys/system';
  // plugin
  import { Guid } from 'js-guid';
  import dayjs from 'dayjs';
  import dayjsPluginUTC from 'dayjs-plugin-utc';
  // data from outside
  import { getBasicColumns } from './tableData';

  export default defineComponent({
    name: 'ContractManagement',
    components: { BasicTable, Drawer, TableAction, Modal },
    setup() {
      // hooks
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      let timeLimited = ref(false);
      dayjs.extend(dayjsPluginUTC);

      const filterFormLabelWidth = 150;
      // search form schema
      const filterSchemas: FormSchema[] = [
        {
          field: 'payer_account_id',
          component: 'ApiSelect',
          labelWidth: filterFormLabelWidth,
          label: 'Payer Account Id:',
          rules: [
            {
              required: true,
              // @ts-ignore
              validator: async (rule, value) => {
                if (!value) {
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
              showSearch: true,
              size: 'small',
              api: async (para) => {
                let results = await getPayerAccountIdDropdown(para);
                return new Promise((resolve) => {
                  resolve(results);
                });
              },
              params: {
                trace_id: Guid.newGuid().toString(),
              },
              immediate: false,
              // resultField: 'results',
              // use name as label
              labelField: 'field_name',
              // use id as value
              valueField: 'field_value',
              onBlur: () => {
                let e = formModel['payer_account_id'];
                formModel.contract_id = '';
                if (e) {
                  // reset contract_id schema
                  const { updateSchema } = formActionType;
                  updateSchema({
                    field: 'contract_id',
                    componentProps: {
                      showSearch: true,
                      size: 'small',
                      disabled: false,
                      // immediate: false,
                      api: getContractDropdown,
                      params: {
                        trace_id: Guid.newGuid().toString(),
                        payer_account_id_list: [e],
                        status_list: [],
                      },
                      // use name as label
                      labelField: 'field_name',
                      // use id as value
                      valueField: 'field_value',
                    },
                  });
                }
              },
              // after request callback
              onOptionsChange: (options) => {
                console.log('get options', options.length, options);
              },
            };
          },
          colProps: {
            span: 6,
          },
        },
        {
          field: 'contract_id',
          component: 'ApiSelect',
          labelWidth: filterFormLabelWidth,
          label: '合約編號:',
          colProps: {
            span: 6,
          },
          componentProps: ({ formModel }) => {
            return {
              showSearch: true,
              disabled: formModel['payer_account_id'] ? false : true,
              size: 'small',
            };
          },
        },
        {
          field: 'time_period_date',
          component: 'RangePicker',
          label: '資料期間:',
          labelWidth: filterFormLabelWidth,
          colProps: {
            span: 12,
          },
          componentProps: {
            size: 'small',
            format: 'YYYY/MM',
            placeholder: ['開始時間', '結束時間'],
            allowEmpty: [false, true],
            picker: 'month',
            onChange: (e: any) => {
              console.log(e);
              // formData.type = e;
            },
          },
        },
        {
          field: 'contract_type',
          component: 'ApiSelect',
          label: '合約類型:',
          labelWidth: filterFormLabelWidth,
          colProps: {
            span: 6,
          },
          componentProps: () => {
            return {
              showSearch: true,
              size: 'small',
              placeholder: '請選擇合約類型',
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
              // options: [
              //   {
              //     label: 'Resold ES',
              //     value: '1',
              //   },
              //   {
              //     label: 'Resold Enterprise On-Ramp',
              //     value: '2',
              //   },
              // ],
              onChange: (e: any) => {
                console.log(e);
                // formData.type = e;
              },
            };
          },
        },
      ];

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
      // [Area] table
      const [registerTable, { reload, setProps, setPagination }] = useTable({
        title: '合約清單',
        api: async (paras) => {
          const results = await getContractList(paras);
          return new Promise((resolve) => {
            resolve({
              items: results[0].items,
              total: results[0].total,
            });
          });
        },
        rowKey: 'id',
        fetchSetting: {
          // 傳給後台的當前頁字段
          pageField: 'page',
          // 傳給後台的每頁顯示多少條的字段
          sizeField: 'page_Size',
          // 接口返回表格數據的字段
          listField: 'items',
          // 接口返回表格總數的字段
          totalField: 'total',
        },
        columns: getBasicColumns(),
        formConfig: {
          // 表單配置
          schemas: filterSchemas,
          showAdvancedButton: false, // 展開按鈕
          autoFocusFirstItem: true,
          submitOnReset: false, // 重置時是否提交 avoid console error
          submitOnChange: false,
          // resetFunc: customResetFunc,
          // submitFunc: customSubmitFunc,
          submitButtonOptions: {
            // @ts-ignore
            size: 'small',
          },
          resetButtonOptions: {
            // @ts-ignore
            size: 'small',
          },
          actionColOptions: { span: 24 },
        },
        beforeFetch(info) {
          let temp = {
            trace_id: Guid.newGuid().toString(),
            current_page: info.page,
            page_size: info.page_Size,
            contract_class: '1',
            contract_id: info.contract_id || '',
            payer_account_id_list: [info.payer_account_id],
            start_date: info.time_period_date
              ? dayjs(info.time_period_date[0]).format('YYYY/MM').toString()
              : '',
            end_date: info.time_period_date
              ? dayjs(info.time_period_date[1]).format('YYYY/MM').toString()
              : '',
            contract_type: info.contract_type || '',
          };
          return temp;
        },
        afterFetch(data) {
          if (!data.length) {
            createMessage.warning('無任何資料！');
          }
          return data;
        },
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        onChange(data) {
          console.log(data);
        },
        immediate: false,
        canResize: false,
        expandRowByClick: true,
        useSearchForm: true, // 使用搜索表單
        showTableSetting: false, // show the table setting
        bordered: true,
        showIndexColumn: false,
        ellipsis: true, // text over the column, show ...
        pagination: {
          pageSize: 10,
        },
        size: 'small',
        actionColumn: {
          width: timeLimited.value ? 220 : 0,
          // width: 220,
          title: 'Action',
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleModalSuccess() {
        createMessage.success('成功終止！');
        reload({
          page: 1,
        });
      }

      function handleDrawerSuccess(who) {
        if (who === 'update') {
          createMessage.success('更新成功！');
          console.log('更新成功');
          reload({
            page: 1,
          });
        } else {
          createMessage.success('新增成功！');
          console.log('新增成功');
          // reload({
          //   page: 1,
          // });
        }
      }

      // table action --------------------------------------

      function handleActionEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleTableActionStop(record) {
        let isTempUpdate = true;
        // if already stop status
        if (record.status === '3') {
          isTempUpdate = true;
        } else {
          isTempUpdate = false;
        }
        openModal(true, {
          record,
          isUpdate: isTempUpdate,
        });
      }

      function handleActionDelete(record: Recordable) {
        // Call API
        deleteContract({
          id: record.id,
          trace_id: Guid.newGuid().toString(),
        }).then((res) => {
          createMessage.success('成功刪除！');
          console.log(res);
          console.log('確定刪除', record);
          reload();
        });
      }

      onMounted(async () => {
        // get limit date
        let tempReturn = await GetBillCodeValue({
          trace_id: Guid.newGuid().toString(),
          request_items: [
            {
              code_type: '1',
              code_id: 'BillCloseLimitDay',
            },
          ],
        });

        timeLimited.value =
          hasPermission([RoleEnum.TEST, RoleEnum.SUPER, RoleEnum.DEVELOPER, RoleEnum.OPERATION]) ||
          !tempReturn[0].response_items[0]['code-name']
            .split(',')
            .includes(dayjs().date().toString());

        setProps({
          actionColumn: {
            width: timeLimited.value ? 220 : 0,
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
          },
        });
      });

      return {
        t,
        timeLimited,
        dayjs,
        registerTable,
        registerDrawer,
        handleCreate,
        handleDrawerSuccess,
        handleModalSuccess,
        handleActionEdit,
        handleTableActionStop,
        handleActionDelete,
        registerModal,
        setPagination,
      };
    },
  });
</script>
<style lang="less">
  .contract-management {
    .dot {
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        width: 4px;
        height: 4px;
        display: inline-block;
        border-radius: 2px;
        margin-right: 4px;
      }
    }
  }
</style>
