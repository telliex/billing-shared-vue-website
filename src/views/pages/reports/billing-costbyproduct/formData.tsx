import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'ReportType',
      component: 'Select',
      label: `${t('report.costbyproductReport.searchAreaReportTypeLavel')}:`,
      show: false,
      componentProps: {
        options: [
          {
            label: 'Cost By Product',
            value: 'billing_costbyproduct_report',
            key: 'billing_costbyproduct_report',
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
      label: `${t('report.costbyproductReport.searchAreaYYYYMMLavel')}:`,
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
