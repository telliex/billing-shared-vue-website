import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'ReportType',
      component: 'Select',
      label: `${t('report.customeroporcc.searchAreaReportTypeLavel')}:`,
      show: false,
      componentProps: {
        options: [
          {
            label: 'Customer OPOR',
            value: 'c3',
            key: 'c3',
          },
        ],
      },
      colProps: {
        span: 6,
      },
    },
    {
      field: 'YearMonth',
      component: 'DatePicker',
      label: `${t('report.customeroporcc.searchAreaYYYYMMLavel')}:`,
      labelWidth: 100,
      required: true,
      componentProps: {
        picker: 'month',
      },
      colProps: {
        span: 6,
      },
    },
  ];
}
