import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'ReportType',
      component: 'Select',
      label: `${t('report.costbylinkedReport.searchAreaReportTypeLavel')}:`,
      show: false,
      componentProps: {
        options: [
          {
            label: 'Cost By Linkedaccount',
            value: 'billing_costbylinked_report',
            key: 'billing_costbylinked_report',
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
      label: `${t('report.costbylinkedReport.searchAreaYYYYMMLavel')}:`,
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
