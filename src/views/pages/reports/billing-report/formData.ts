import type { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

type ReportInfo = {
  tableName: string;
  reportType: string;
  s3Bucket: string;
  bucketRegion: string;
};

type PropsOptions = {
  label: string;
  value: string;
  key: string;
};

type UseFormSchema = {
  reportInfo: ReportInfo;
  schemas: FormSchema[];
};

export const useFormSchema = (routeName: string): UseFormSchema => {
  // get report info
  const getReportInfo = ({
    tableName,
    reportType, // folder name
    s3BucketEnv = 'VITE_GLOB_S3_REPORT', // s3 bucket
    bucketRegionEnv = 'VITE_GLOB_S3_REGION', // s3 region
  }): ReportInfo => {
    // S3_ECV_REPORT for ecr accoount to fetch ecv file
    // other according to company name
    const newReportType =
      s3BucketEnv === 'VITE_GLOB_S3_ECV_REPORT'
        ? `ecv_${reportType}`
        : `${import.meta.env.VITE_GLOB_COMPANY.toLowerCase()}_${reportType}`;

    return {
      tableName: `${t(tableName)}`,
      reportType: newReportType,
      s3Bucket: import.meta.env[s3BucketEnv],
      bucketRegion: import.meta.env[bucketRegionEnv],
    };
  };
  // get component info
  const getReportTypeComponentInfo = (label: string, propsOptions: PropsOptions): FormSchema => {
    return {
      field: 'ReportType',
      component: 'Select',
      label: `${t(label)}:`,
      componentProps: {
        options: [propsOptions],
      },
      colProps: {
        span: 6,
      },
    };
  };
  const getDateComponentInfo = (label: string): FormSchema => {
    return {
      field: 'Date',
      component: 'DatePicker',
      label: `${t(label)}:`,
      labelWidth: 100,
      componentProps: {
        picker: 'date',
      },
      colProps: {
        span: 6,
      },
      required: true,
    };
  };
  const getMonthComponentInfo = (label: string): FormSchema => {
    return {
      field: 'YearMonth',
      component: 'DatePicker',
      label: `${t(label)}:`,
      labelWidth: 100,
      componentProps: {
        picker: 'month',
      },
      colProps: {
        span: 6,
      },
      required: true,
    };
  };

  // **create report relative setting here**
  // routename: [] -> get need component info in array
  const allReportList: Record<string, UseFormSchema> = {
    'cn07-billing-check-report': {
      reportInfo: getReportInfo({
        tableName: 'report.cn07CustomReport.tableAreaTitle',
        reportType: 'cn07_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.cn07CustomReport.searchAreaYYYYMMLavel')],
    },
    'cns-billing-check-report': {
      reportInfo: getReportInfo({
        tableName: 'report.cnsCustomReport.tableAreaTitle',
        reportType: 'cns_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.cnsCustomReport.searchAreaYYYYMMLavel')],
    },
    'zyxel-report-before-billing-adjustment': {
      reportInfo: getReportInfo({
        tableName: 'report.zyxelReportBeforeBillingAdjustment.tableAreaTitle',
        reportType: 'zyxel_customized_report',
      }),
      schemas: [
        getMonthComponentInfo('report.zyxelReportBeforeBillingAdjustment.searchAreaYYYYMMLavel'),
      ],
    },
    'zyxel-report-after-billing-adjustment': {
      reportInfo: getReportInfo({
        tableName: 'report.zyxelReportAfterBillingAdjustment.tableAreaTitle',
        reportType: 'zyxel_customized_after_dop_report',
      }),
      schemas: [
        getMonthComponentInfo('report.zyxelReportAfterBillingAdjustment.searchAreaYYYYMMLavel'),
      ],
    },
    'materials-report': {
      reportInfo: getReportInfo({
        tableName: 'report.materialsReport.tableAreaTitle',
        reportType: 'materials_report',
      }),
      schemas: [getMonthComponentInfo('report.materialsReport.searchAreaYYYYMMLavel')],
    },
    'my-sapura-energy-report': {
      reportInfo: getReportInfo({
        tableName: 'report.mySapuraEnergyReport.tableAreaTitle',
        reportType: 'sapura_sp_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.mySapuraEnergyReport.searchAreaYYYYMMLavel')],
    },
    'vn-sp-customized-report': {
      reportInfo: getReportInfo({
        tableName: 'report.vnSpCustomizedReport.tableAreaTitle',
        reportType: 'vn_sp_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.vnSpCustomizedReport.searchAreaYYYYMMLavel')],
    },
    'sg-digital-myanmar-money-sp-report': {
      reportInfo: getReportInfo({
        tableName: 'report.sgDigitalMyanmarMoneySpReport.tableAreaTitle',
        reportType: 'myanmar_sp_customized_report',
      }),
      schemas: [
        getMonthComponentInfo('report.sgDigitalMyanmarMoneySpReport.searchAreaYYYYMMLavel'),
      ],
    },
    'my-ghl-sp-report': {
      reportInfo: getReportInfo({
        tableName: 'report.myGhlSpReport.tableAreaTitle',
        reportType: 'ghl_sp_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.myGhlSpReport.searchAreaYYYYMMLavel')],
    },
    'c0000266-s3ppa-report': {
      reportInfo: getReportInfo({
        tableName: 'report.c0000266S3ppaReport.tableAreaTitle',
        reportType: 'c0000266_s3ppa_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.c0000266S3ppaReport.searchAreaYYYYMMLavel')],
    },
    'cdn-report': {
      reportInfo: getReportInfo({
        tableName: 'report.monthlyCdnReport.tableAreaTitle',
        reportType: 'mgt_cdn_report',
      }),
      schemas: [getMonthComponentInfo('report.monthlyCdnReport.searchAreaYYYYMMLavel')],
    },
    'c0000338-sp-customized-report': {
      reportInfo: getReportInfo({
        tableName: 'report.c0000338SpCustomizedReport.tableAreaTitle',
        reportType: 'c0000338_sp_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.c0000338SpCustomizedReport.searchAreaYYYYMMLavel')],
    },
    'linked-789943651249-sp-customized-report': {
      reportInfo: getReportInfo({
        tableName: 'report.linked789943651249SpCustomizedReport.tableAreaTitle',
        reportType: 'ch424_789943651249_sp_customized_report',
      }),
      schemas: [
        getMonthComponentInfo('report.linked789943651249SpCustomizedReport.searchAreaYYYYMMLavel'),
      ],
    },
    'ch198-sp-customized-report': {
      reportInfo: getReportInfo({
        tableName: 'report.ch198SpCustomizedReport.tableAreaTitle',
        reportType: 'ch198_leyun_sp_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.ch198SpCustomizedReport.searchAreaYYYYMMLavel')],
    },
    'cnn-dto-report': {
      reportInfo: getReportInfo({
        tableName: 'report.cnnDtoReport.tableAreaTitle',
        reportType: 'cnn_dto_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.cnnDtoReport.searchAreaYYYYMMLavel')],
    },
    'cnn-big-sp-report': {
      reportInfo: getReportInfo({
        tableName: 'report.cnnBigSpReport.tableAreaTitle',
        reportType: 'cne_big_sp_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.cnnBigSpReport.searchAreaYYYYMMLavel')],
    },
    'cne-yostar-es-fee-report': {
      reportInfo: getReportInfo({
        tableName: 'report.cneYostarEsFeeReport.tableAreaTitle',
        reportType: 'cne_youstar_es_fee_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.cneYostarEsFeeReport.searchAreaYYYYMMLavel')],
    },
    'hk91-sp-utilization-report': {
      reportInfo: getReportInfo({
        tableName: 'report.hk91SpUtilizationReport.tableAreaTitle',
        reportType: 'hk91_sp_utilization_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.hk91SpUtilizationReport.searchAreaYYYYMMLavel')],
    },
    'sg-cag-sp-report': {
      reportInfo: getReportInfo({
        tableName: 'report.sgCagSpReport.tableAreaTitle',
        reportType: 'cag_sp_customized_report',
      }),
      schemas: [getMonthComponentInfo('report.sgCagSpReport.searchAreaYYYYMMLavel')],
    },
    'eui-awsbu-report': {
      reportInfo: getReportInfo({
        tableName: 'report.euiAwsbuReport.tableAreaTitle',
        reportType: 'eui_report_awsbu_report',
      }),
      schemas: [getMonthComponentInfo('report.euiAwsbuReport.searchAreaYYYYMMLavel')],
    },
    'shield-reclassification-report': {
      reportInfo: getReportInfo({
        tableName: 'report.shieldReclassificationReport.tableAreaTitle',
        reportType: 'shield_reclassification_report',
      }),
      schemas: [getMonthComponentInfo('report.shieldReclassificationReport.searchAreaYYYYMMLavel')],
    },
    'cost-revenue-report': {
      reportInfo: getReportInfo({
        tableName: 'report.costRevenueReport.tableAreaTitle',
        reportType: 'cost_revenue_report',
      }),
      schemas: [getMonthComponentInfo('report.costRevenueReport.searchAreaYYYYMMLavel')],
    },
    'billing-summary-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingSummaryReport.tableAreaTitle',
        reportType: 'billing_summary_hk',
        s3BucketEnv: 'VITE_GLOB_S3_ECV_REPORT',
      }),
      schemas: [getMonthComponentInfo('report.billingSummaryReport.searchAreaYYYYMMLavel')],
    },
    'special-modification-report': {
      reportInfo: getReportInfo({
        tableName: 'report.specialModificationReport.tableAreaTitle',
        reportType: 'special_modifications_data',
      }),
      schemas: [getMonthComponentInfo('report.specialModificationReport.searchAreaYYYYMMLavel')],
    },
    'sap-cno-report': {
      reportInfo: getReportInfo({
        tableName: 'report.sapCnoReport.tableAreaTitle',
        reportType: 'sap_cno_contrast_table',
      }),
      schemas: [getMonthComponentInfo('report.sapCnoReport.searchAreaYYYYMMLavel')],
    },
    'linkedaccount-entity-difference-report': {
      reportInfo: getReportInfo({
        tableName: 'report.linkedaccountEntitydifferenceReport.tableAreaTitle',
        reportType: 'linkedaccount_entity_differences_report',
      }),
      schemas: [
        getMonthComponentInfo('report.linkedaccountEntitydifferenceReport.searchAreaYYYYMMLavel'),
      ],
    },
    'billing-invoice-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingInvoiceReport.tableAreaTitle',
        reportType: 'billing_invoice_report_hk',
      }),
      schemas: [getMonthComponentInfo('report.billingInvoiceReport.searchAreaYYYYMMLavel')],
    },
    'billing-list-ecr-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingListEcrReport.tableAreaTitle',
        reportType: 'billing_list_for_ecloudrover',
        s3BucketEnv: 'VITE_GLOB_S3_ECV_REPORT',
      }),
      schemas: [getMonthComponentInfo('report.billingListEcrReport.searchAreaYYYYMMLavel')],
    },
    'billing-costbylinkedaccount-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingCostbylinkedReport.tableAreaTitle',
        reportType: 'billing_costbylinked_report',
      }),
      schemas: [getMonthComponentInfo('report.billingCostbylinkedReport.searchAreaYYYYMMLavel')],
    },
    'billing-costbyproduct-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingCostbyproductReport.tableAreaTitle',
        reportType: 'billing_costbyproduct_report',
      }),
      schemas: [getMonthComponentInfo('report.billingCostbyproductReport.searchAreaYYYYMMLavel')],
    },
    'billing-invoice-contrast-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingInvoiceContrastReport.tableAreaTitle',
        reportType: 'invoice_contrast_report',
      }),
      schemas: [getMonthComponentInfo('report.billingInvoiceContrastReport.searchAreaYYYYMMLavel')],
    },
    'billing-taxnbycno-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingTaxbycnoReport.tableAreaTitle',
        reportType: 'tax_by_cno',
      }),
      schemas: [getMonthComponentInfo('report.billingTaxbycnoReport.searchAreaYYYYMMLavel')],
    },
    'billing-cost-allocate-report': {
      reportInfo: getReportInfo({
        tableName: 'report.billingCostAllocateReport.tableAreaTitle',
        reportType: 'billing_cost_allocate_report',
      }),
      schemas: [getMonthComponentInfo('report.billingCostAllocateReport.searchAreaYYYYMMLavel')],
    },
  };
  // --------- end of report relative setting ---------

  return {
    reportInfo: allReportList[routeName].reportInfo,
    schemas: allReportList[routeName].schemas,
  };
};
