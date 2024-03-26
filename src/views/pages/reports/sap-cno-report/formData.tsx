import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'ReportType',
      component: 'Select',
      label: `${t('report.sapcnoReport.searchAreaReportTypeLavel')}:`,
      show: false,
      componentProps: {
        options: [
          {
            label: 'SAP_CNO對照表',
            value: 'sap_cno_contrast_table',
            key: 'sap_cno_contrast_table',
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
      label: `${t('report.sapcnoReport.searchAreaYYYYMMLavel')}:`,
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
