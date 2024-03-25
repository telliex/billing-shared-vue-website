import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'ReportType',
      component: 'Select',
      label: `${t('report.invoiceReport.searchAreaReportTypeLavel')}:`,
      show: false,
      componentProps: {
        options: [
          {
            label: 'Invoice Report',
            value: 'billing_invoice_report_hk',
            key: 'billing_invoice_report_hk',
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
      label: `${t('report.invoiceReport.searchAreaYYYYMMLavel')}:`,
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
