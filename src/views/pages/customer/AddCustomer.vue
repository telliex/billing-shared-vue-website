<template>
  <PageWrapper title="">
    <div class="mb-4">
      <a-button @click="validateForm" class="mr-2"> {{ t('client.btnValidateForm') }} </a-button>
      <a-button @click="resetValidate" class="mr-2"> {{ t('client.btnResetValidate') }} </a-button>
      <a-button @click="getFormValues" class="mr-2"> {{ t('client.btnGetFormValues') }} </a-button>
      <a-button @click="resetFields" class="mr-2"> {{ t('client.btnResetFields') }} </a-button>
    </div>

    <CollapseContainer :title="mainTitle">
      <div class="ant-row ant-form-item" style="align-items: center">
        <div class="ant-col ant-form-item-label">
          <label>{{ t('client.labelChangeTime') }} </label>
        </div>
        <div class="ant-col">2022/10/12</div>
      </div>

      <div class="ant-row ant-form-item" style="align-items: center">
        <div class="ant-col ant-form-item-label">
          <label>{{ t('client.labelChangeMaster') }} </label>
        </div>
        <div class="ant-col ant-form-item-control">Devin</div>
      </div>
      <BasicForm @register="register" @submit="handleSubmit" />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  const schemas: FormSchema[] = [
    {
      field: 'labelCno',
      component: 'InputSearch',
      labelWidth: 250,
      helpMessage: [t('client.tooltipCno')],
      label: t('client.labelCno'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'InvoiceMergeNo',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipInvoiceMergeNo')],
      label: t('client.labelInvoiceMergeNo'),
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'Cname',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipCname')],
      label: t('client.labelCname'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'Name',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipName')],
      label: t('client.labelName'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'LinkedAccountId',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [
        t('client.tooltipLinkedAccountId1'),
        t('client.tooltipLinkedAccountId2'),
        t('client.tooltipLinkedAccountId3'),
      ],
      label: t('client.labelLinkedAccountId'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'LinkedAccountName',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipLinkedAccountName')],
      label: t('client.labelLinkedAccountName'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'TaxationAddress',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipTaxationAddress')],
      label: t('client.labelTaxationAddress'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'GuiAddress',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipGuiAddress')],
      label: t('client.labelGuiAddress'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'Ubn',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipUbn')],
      label: t('client.labelUbn'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'Contact',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipContact')],
      label: t('client.labelContact'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'ContactEmail',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipContactEmail')],
      label: t('client.labelContactEmail'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'OverdueEmail',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipOverdueEmail')],
      label: t('client.labelOverdueEmail'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'GuiContact',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipGuiContact')],
      label: t('client.labelGuiContact'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'GuiTel',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipGuiTel')],
      label: t('client.labelGuiTel'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'GuiEmailInvoice1',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipGuiEmailInvoice1')],
      label: t('client.labelGuiEmailInvoice1'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'GuiEmailInvoice2',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipGuiEmailInvoice2')],
      label: t('client.labelGuiEmailInvoice2'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'GuiEmailInvoice3',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipGuiEmailInvoice3')],
      label: t('client.labelGuiEmailInvoice3'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'GuiEmailEinv',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipGuiEmailEinv')],
      label: t('client.labelGuiEmailEinv'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'DomainName',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelDomainName'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'ZipCode',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelZipCode'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'IndustryCatalog',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelIndustryCatalog'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'labelGuiMemo',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelGuiMemo'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'BusinessSupport',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelBusinessSupport'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'MinCharge',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelMinCharge'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'BusinessSupportPl',
      component: 'RadioGroup',
      label: t('client.labelBusinessSupportPl'),
      labelWidth: 250,
      colProps: {
        span: 24,
      },
      componentProps: {
        options: [
          {
            label: t('client.labelBusinessSupportRate'),
            value: 'fr',
          },
          {
            label: t('client.labelAwsBs'),
            value: 'bs',
          },
          {
            label: t('client.labelAwsBs'),
            value: 'es',
          },
        ],
      },
    },
    {
      field: 'BusinessSupportRate',
      component: 'Input',
      labelWidth: 345,
      helpMessage: [t('client.tooltipFr')],
      label: t('client.labelBusinessSupportRate'),
      colProps: {
        span: 10,
      },
      show: ({ model }) => {
        return model.BusinessSupportPl === 'fr';
      },
      renderComponentContent: () => {
        return {
          suffix: () => 'ex. 0.05',
        };
      },
    },
    {
      field: 'SupportRate',
      component: 'Input',
      label: t('client.labelSupportRate'),
      colProps: {
        span: 10,
      },
      show: ({ model }) => {
        return model.BusinessSupportPl === 'fr';
      },
      renderComponentContent: () => {
        return {
          suffix: () => '0~1000',
        };
      },
    },
    {
      field: 'BsMincharge',
      component: 'Input',
      helpMessage: [t('client.tooltipBs')],
      labelWidth: 345,
      label: t('client.labelBsMincharge'),
      colProps: {
        span: 10,
      },
      show: ({ model }) => {
        return model.BusinessSupportPl === 'bs';
      },
      renderComponentContent: () => {
        return {
          suffix: () => '0~1000',
        };
      },
    },
    {
      field: 'EsMincharge',
      component: 'Input',
      labelWidth: 345,
      helpMessage: [t('client.tooltipEs')],
      label: t('client.labelEsMincharge'),
      colProps: {
        span: 10,
      },
      show: ({ model }) => {
        return model.BusinessSupportPl === 'es';
      },
      renderComponentContent: () => {
        return {
          suffix: () => '0~2000',
        };
      },
    },
    {
      field: 'DiscountPeriod',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipDiscountPeriod')],
      label: t('client.labelDiscountPeriod'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'Deadlin',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipDeadlin')],
      label: t('client.labelDeadlin'),
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'MSP',
      component: 'Switch',
      helpMessage: [],
      labelWidth: 250,
      label: t('client.labelMSP'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'GuiPending',
      component: 'Switch',
      helpMessage: [t('client.tooltipGuiPending')],
      labelWidth: 250,
      label: t('client.labeLGuiPending'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'Discount',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipDiscount')],
      label: t('client.labelDiscount'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'AlertBudget',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipAlertBudget')],
      label: t('client.labelAlertBudget'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'BillDetail',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelBillDetail'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'ServiceLevel',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipServiceLevel')],
      label: t('client.labelServiceLevel'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'CustomerType',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipCustomerType')],
      label: t('client.labelCustomerType'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'Family',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipFamily')],
      label: t('client.labelFamily'),
      colProps: {
        span: 12,
      },
      componentProps: {
        disabled: true,
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'EcloudSales',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [],
      label: t('client.labelEcloudSales'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'LeadgerCountry',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipLeadgerCountry')],
      label: t('client.labelLeadgerCountry'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'PaymentCountry',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipPaymentCountry')],
      label: t('client.labelPaymentCountry'),
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'Country',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipCountry')],
      label: t('client.labelCountry'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'Currency',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipCurrency')],
      label: t('client.labelCurrency'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'CurrencyPay',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipCurrencyPay')],
      label: t('client.labelCurrencyPay'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'ExchangeType',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipExchangeType')],
      label: t('client.labelExchangeType'),
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'AutoInvoice',
      component: 'Switch',
      labelWidth: 250,
      label: t('client.labelAutoInvoice'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'InvoiceMonth',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipInvoiceMonth')],
      label: t('client.labelInvoiceMonth'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'SettleDate',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipSettleDate')],
      label: t('client.labelSettleDate'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'ReserveAmount',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipReserveAmount')],
      label: t('client.labelReserveAmount'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'SettleDept',
      component: 'Select',
      labelWidth: 250,
      helpMessage: [t('client.tooltipSettleDept')],
      label: t('client.labelSettleDept'),
      colProps: {
        span: 12,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '選項1',
            value: '1',
            key: '1',
          },
          {
            label: '選項2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'SapCno',
      component: 'Input',
      labelWidth: 250,
      helpMessage: [t('client.tooltipSapCno')],
      label: t('client.labelSapCno'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'PaymentInformation',
      component: 'Divider',
      label: t('client.labelPaymentInformation'),
      colProps: {
        span: 24,
      },
    },
    {
      field: 'BankName',
      component: 'Input',
      labelWidth: 250,
      label: t('client.labelBankName'),
      componentProps: { disabled: true },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'BankSwiftCode',
      component: 'Input',
      labelWidth: 250,
      label: t('client.labelBankSwiftCode'),
      componentProps: { disabled: true },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'BankAccountNo',
      component: 'Input',
      labelWidth: 250,
      label: t('client.labelBankAccountNo'),
      componentProps: { disabled: true },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'BankAccountName',
      component: 'Input',
      labelWidth: 250,
      label: t('client.labelBankAccountName'),
      componentProps: { disabled: true },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'MSPAvailability',
      component: 'Switch',
      labelWidth: 250,
      label: t('client.labelMSPAvailability'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'MSPInventory',
      component: 'Switch',
      labelWidth: 250,
      label: t('client.labelMSPInventory'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'MSPPerformance',
      component: 'Switch',
      labelWidth: 250,
      label: t('client.labelMSPPerformance'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'MSPSecurity',
      component: 'Switch',
      labelWidth: 250,
      label: t('client.labelMSPSecurity'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'MSPRightSizing',
      component: 'Switch',
      labelWidth: 250,
      label: t('client.labelMSPRightSizing'),
      colProps: {
        span: 12,
      },
    },
    {
      field: 'CpuRpt',
      component: 'Switch',
      labelWidth: 250,
      label: t('client.labelCpuRpt'),
      colProps: {
        span: 12,
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const mainTitle = t('client.mainTitleOfAddCustomerPage');
      const { createMessage } = useMessage();
      const [register, { validateFields, clearValidate, getFieldsValue, resetFields }] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
      });
      async function validateForm() {
        try {
          const res = await validateFields();
          console.log('passing', res);
        } catch (error) {
          console.log('not passing', error);
        }
      }
      async function resetValidate() {
        clearValidate();
      }
      function getFormValues() {
        const values = getFieldsValue();
        createMessage.success('values:' + JSON.stringify(values));
      }

      return {
        mainTitle,
        register,
        schemas,
        handleSubmit: (values: any) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        getFormValues,
        validateForm,
        resetValidate,
        resetFields,
        t,
      };
    },
  });
</script>
