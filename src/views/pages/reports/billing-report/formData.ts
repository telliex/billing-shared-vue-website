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
}

export const useFormSchema = (routeName: string): UseFormSchema => {
  // get report info
  const getReportInfo = ({
    tableName,
    reportType, // folder name
    s3BucketEnv = 'VITE_GLOB_S3_REPORT', // s3 bucket
    bucketRegionEnv = 'VITE_GLOB_S3_REGION' // s3 region
  }): ReportInfo => {
    
    // S3_ECV_REPORT for ecr accoount to fetch ecv file
    // other according to company name
    const newReportType = s3BucketEnv === 'VITE_GLOB_S3_ECV_REPORT'
     ? `ecv_${reportType}`
     : `${import.meta.env.VITE_GLOB_COMPANY.toLowerCase()}_${reportType}`;

    return {
      tableName: `${t(tableName)}`,
      reportType: newReportType,
      s3Bucket: import.meta.env[s3BucketEnv],
      bucketRegion: import.meta.env[bucketRegionEnv]
    }
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
    }
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
    }
  };
  
  // **create report relative setting here**
  // routename: [] -> get need component info in array
  const allReportList: Record<string, UseFormSchema> = {
    "cn07-billing-check-report": {
      reportInfo: getReportInfo({
        tableName: 'report.cn07CustomReport.tableAreaTitle',
        reportType: 'cn07_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.cn07CustomReport.searchAreaYYYYMMLavel')
      ],
    },
    "cns-billing-check-report": {
      reportInfo: getReportInfo({
        tableName: 'report.cnsCustomReport.tableAreaTitle',
        reportType: 'cns_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.cnsCustomReport.searchAreaYYYYMMLavel')
      ],
    },
    "zyxel-custiomized-report": {
      reportInfo: getReportInfo({
        tableName: 'report.zyxelCustiomizedReport.tableAreaTitle',
        reportType: 'zyxel_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.zyxelCustiomizedReport.searchAreaYYYYMMLavel')
      ],
    },
    "zyxel-custiomized-after-drop-report": {
      reportInfo: getReportInfo({
        tableName: 'report.zyxelCustiomizedAfterDropReport.tableAreaTitle',
        reportType: 'zyxel_customized_after_drop_report'
      }),
      schemas: [
        getDateComponentInfo('report.zyxelCustiomizedAfterDropReport.searchAreaYYYYMMLavel')
      ],
    },
    "materials-report": {
      reportInfo: getReportInfo({
        tableName: 'report.materialsReport.tableAreaTitle',
        reportType: 'materials_report'
      }),
      schemas: [
        getDateComponentInfo('report.materialsReport.searchAreaYYYYMMLavel')
      ],
    },
    "my-sapura-energy-report": {
      reportInfo: getReportInfo({
        tableName: 'report.mySapuraEnergyReport.tableAreaTitle',
        reportType: 'sapura_sp_report'
      }),
      schemas: [
        getDateComponentInfo('report.mySapuraEnergyReport.searchAreaYYYYMMLavel')
      ],
    },
    "vn-sp-customized-report": {
      reportInfo: getReportInfo({
        tableName: 'report.vnSpCustomizedReport.tableAreaTitle',
        reportType: 'vn_sp_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.vnSpCustomizedReport.searchAreaYYYYMMLavel')
      ],
    },
    "sg-digital-myanmar-money-sp-report": {
      reportInfo: getReportInfo({
        tableName: 'report.sgDigitalMyanmarMoneySpReport.tableAreaTitle',
        reportType: 'myanmar_sp_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.sgDigitalMyanmarMoneySpReport.searchAreaYYYYMMLavel')
      ],
    },
    "my-ghl-sp-report": {
      reportInfo: getReportInfo({
        tableName: 'report.myGhlSpReport.tableAreaTitle',
        reportType: 'ghl_sp_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.myGhlSpReport.searchAreaYYYYMMLavel')
      ],
    },
    "c0000266-s3ppa-report": {
      reportInfo: getReportInfo({
        tableName: 'report.c0000266S3ppaReport.tableAreaTitle',
        reportType: 'c0000266_s3ppa_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.c0000266S3ppaReport.searchAreaYYYYMMLavel')
      ],
    },
    "monthly-cdn-report": {
      reportInfo: getReportInfo({
        tableName: 'report.monthlyCdnReport.tableAreaTitle',
        reportType: 'mgt_cdn_report'
      }),
      schemas: [
        getDateComponentInfo('report.monthlyCdnReport.searchAreaYYYYMMLavel')
      ],
    },
    "monthly-revenue-report": {
      reportInfo: getReportInfo({
        tableName: 'report.monthlyRevenueReport.tableAreaTitle',
        reportType: 'mgt_revenue_report'
      }),
      schemas: [
        getDateComponentInfo('report.monthlyRevenueReport.searchAreaYYYYMMLavel')
      ],
    },
    "c0000338-sp-customized-report": {
      reportInfo: getReportInfo({
        tableName: 'report.c0000338SpCustomizedReport.tableAreaTitle',
        reportType: 'c0000338_sp_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.c0000338SpCustomizedReport.searchAreaYYYYMMLavel')
      ],
    },
    "linked-789943651249-sp-customized-report": {
      reportInfo: getReportInfo({
        tableName: 'report.linked789943651249SpCustomizedReport.tableAreaTitle',
        reportType: 'ch424_789943651249_sp_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.linked789943651249SpCustomizedReport.searchAreaYYYYMMLavel')
      ],
    },
    "ch198-sp-customized-report": {
      reportInfo: getReportInfo({
        tableName: 'report.ch198SpCustomizedReport.tableAreaTitle',
        reportType: 'ch198_leyun_sp_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.ch198SpCustomizedReport.searchAreaYYYYMMLavel')
      ],
    },
    "cnn-dto-report": {
      reportInfo: getReportInfo({
        tableName: 'report.cnnDtoReport.tableAreaTitle',
        reportType: 'cnn_dto_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.cnnDtoReport.searchAreaYYYYMMLavel')
      ],
    },
    "cnn-big-sp-report": {
      reportInfo: getReportInfo({
        tableName: 'report.cnnBigSpReport.tableAreaTitle',
        reportType: 'cne_big_sp_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.cnnBigSpReport.searchAreaYYYYMMLavel')
      ],
    },
    "cne-yostar-es-fee-report": {
      reportInfo: getReportInfo({
        tableName: 'report.cneYostarEsFeeReport.tableAreaTitle',
        reportType: 'cne_youstar_es_fee_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.cneYostarEsFeeReport.searchAreaYYYYMMLavel')
      ],
    },
    "hk91-sp-utilization-report": {
      reportInfo: getReportInfo({
        tableName: 'report.hk91SpUtilizationReport.tableAreaTitle',
        reportType: 'hk91_sp_utilization_customized_report'
      }),
      schemas: [
        getDateComponentInfo('report.hk91SpUtilizationReport.searchAreaYYYYMMLavel')
      ],
    },
    "shield-reclassification-report": {
      reportInfo: getReportInfo({
        tableName: 'report.shieldReclassificationReport.tableAreaTitle',
        reportType: 'shield_reclassification_report'
      }),
      schemas: [
        getDateComponentInfo('report.shieldReclassificationReport.searchAreaYYYYMMLavel')
      ],
    },
    "cost-revenue-report": {
      reportInfo: getReportInfo({
        tableName: 'report.costRevenueReport.tableAreaTitle',
        reportType: 'cost_revenue_report'
      }),
      schemas: [
        getDateComponentInfo('report.costRevenueReport.tableAreaTitle')
      ],
    },
    "billing-summary-report": {
      reportInfo: getReportInfo({
        tableName: 'report.billingSummaryReport.tableAreaTitle',
        reportType: 'billing_summary_hk'
      }),
      schemas: [
        getDateComponentInfo('report.billingSummaryReport.searchAreaYYYYMMLavel')
      ],
    }
  };
  // --------- end of report relative setting ---------

  return {
    reportInfo: allReportList[routeName].reportInfo,
    schemas: allReportList[routeName].schemas
  }
};