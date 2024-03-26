import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'ReportType',
      component: 'Select',
      label: `${t('report.invoicecontrastReport.searchAreaReportTypeLavel')}:`,
      show: false,
      componentProps: {
        options: [
          {
            label: '帳單發票對照表',
            value: 'billing_invoice_contrast_report',
            key: 'billing_invoice_contrast_report',
          },
        ],
      },
      colProps: {
        span: 6,
      },
    },
    {
      field: 'Date',
      component: 'DatePicker',
      label: `${t('report.invoicecontrastReport.searchAreaYYYYMMLavel')}:`,
      labelWidth: 100,
      required: true,
      componentProps: {
        picker: 'date',
      },
      colProps: {
        span: 6,
      },
    },
  ];
}
