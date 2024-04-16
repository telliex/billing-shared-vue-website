const company = import.meta.env.VITE_GLOB_COMPANY;

export default {
  searchAreaTitle: '查詢欄位',
  queryText: '查詢',
  resetText: '清除',
  exportFile: '匯出報表',
  autoFitHeight: '自適應高度',
  cancalFitHeight: '取消自適應',
  okText: '確認',
  closeText: '關閉',
  cancelText: '取消',
  loadingText: '加載中...',
  saveText: '保存',
  delText: '刪除',
  searchText: '搜索',
  inputText: '請輸入',
  chooseText: '請選擇',
  redo: '刷新',
  back: '返回',
  light: '亮色主題',
  dark: '黑暗主題',
  dopCost: {
    tableAreaTitle: '特調成本報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '特調成本',
    searchAreaYYYYMMLavel: '月份',
  },
  CDNReport: {
    tableAreaTitle: 'CDN報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'CDN',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  specialModificationReport: {
    tableAreaTitle: '特殊事項調整報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '特殊事項調整',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  sapCnoReport: {
    tableAreaTitle: 'SAP_CNO對照表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'SAP_CNO對照',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  linkedaccountEntitydifferenceReport: {
    tableAreaTitle: '帳號轉綁清單報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '帳號轉綁清單',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  summeryReport: {
    tableAreaTitle: 'Billing Summary Report',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing Summary',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingInvoiceReport: {
    tableAreaTitle: 'Billing Invoice Report',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing Invoice',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingListEcrReport: {
    tableAreaTitle: 'Billing List Report',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing List',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingCostbylinkedReport: {
    tableAreaTitle: 'Cost By Linkedaccount Report',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Cost By Linkedaccount',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingCostbyproductReport: {
    tableAreaTitle: 'Cost By Product Report',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Cost By Product',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internaloporcr: {
    tableAreaTitle: 'CR內部帳本OPOR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'CR內部帳本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internalpor1cr: {
    tableAreaTitle: 'CR內部帳本POR1',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'CR內部帳本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customeroporcr: {
    tableAreaTitle: 'CR客戶帳本OPOR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'CR客戶帳本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerpor1cr: {
    tableAreaTitle: 'CR客戶帳本POR1',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'CR客戶帳本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerordrcr: {
    tableAreaTitle: 'CR客戶帳本ORDR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Customer ORDR CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerrdr1cr: {
    tableAreaTitle: 'CR客戶帳本RDR1',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'CR客戶帳本RDR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internaloporcc: {
    tableAreaTitle: 'C3內部帳本OPOR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'C3內部帳本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internalpor1cc: {
    tableAreaTitle: 'C3內部帳本POR1',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'C3內部帳本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customeroporcc: {
    tableAreaTitle: 'C3客戶帳本OPOR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'C3客戶帳本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerpor1cc: {
    tableAreaTitle: 'C3客戶帳本POR1',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'C3客戶帳本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerordrcc: {
    tableAreaTitle: 'C3客戶帳本ORDR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'C3客戶帳本ORDR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerrdr1cc: {
    tableAreaTitle: 'C3客戶帳本RDR1',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'C3客戶帳本RDR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingsplistcr: {
    tableAreaTitle: 'Billing SP List CR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing SP List CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingspusagecr: {
    tableAreaTitle: 'Billing SP Usage CR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing SP Usage CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billinrilistcr: {
    tableAreaTitle: 'Billing RI List CR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing RI List CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingriusagecr: {
    tableAreaTitle: 'Billing RI Usage CR',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing RI Usage CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingriusagecc: {
    tableAreaTitle: 'Billing RI Usage C3',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing RI Usage C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingsplistcc: {
    tableAreaTitle: 'Billing SP List C3',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing SP List C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingspusagecc: {
    tableAreaTitle: 'Billing SP Usage C3',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing SP Usage C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billinrilistcc: {
    tableAreaTitle: 'Billing RI List C3',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing RI List C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingInvoiceContrastReport: {
    tableAreaTitle: '帳單發票對照表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '帳單發票對照表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingTaxbycnoReport: {
    tableAreaTitle: 'Local Billing稅額資料報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Local Billing稅額資料報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingCostAllocateReport: {
    tableAreaTitle: '測試帳號成本報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '測試帳號成本報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  creditownerReportaccountant: {
    tableAreaTitle: 'Credit Owner Report for Accountant',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Credit Owner Report for Accountant',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  creditownerReportsales: {
    tableAreaTitle: 'Credit Owner Report for Sales',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Credit Owner Report for Sales',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  mpdf: {
    tableAreaTitle: 'M0100 pdf',
    searchAreaReportTypeLavel: 'Repot Type',
    searchAreaReportTypeOption: 'M0100 pdf',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cn07CustomReport: {
    tableAreaTitle: '客製化報表-CNN對帳報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-CNN對帳報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cnsCustomReport: {
    tableAreaTitle: `客製化報表-CNS對帳報表-${company}`,
    searchAreaReportTypeLavel: 'Report Type',
    searchAreaReportTypeOption: `客製化報表-CNS對帳報表-${company}`,
    searchAreaYYYYMMLavel: '月份', // Month
  },
  zyxelReportBeforeBillingAdjustment: {
    tableAreaTitle: '客製化報表-兆勤特調前對帳報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-兆勤特調前對帳報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  zyxelReportAfterBillingAdjustment: {
    tableAreaTitle: '客製化報表-兆勤特調後對帳報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-兆勤特調後對帳報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  materialsReport: {
    tableAreaTitle: `物料主檔-${company}`,
    searchAreaReportTypeLavel: 'Report Type',
    searchAreaReportTypeOption: `物料主檔-${company}`,
    searchAreaYYYYMMLavel: '月份', // Month
  },
  mySapuraEnergyReport: {
    tableAreaTitle: '客製化報表-MY Sapura Energy Berhad SP報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-MY Sapura Energy Berhad SP報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  vnSpCustomizedReport: {
    tableAreaTitle: `客製化報表-VN SP報表-${company}`,
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: `客製化報表-VN SP報表-${company}`,
    searchAreaYYYYMMLavel: '月份', // Month
  },
  sgDigitalMyanmarMoneySpReport: {
    tableAreaTitle: '客製化報表-SG Digital Myanmar Money SP報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-SG Digital Myanmar Money SP報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  myGhlSpReport: {
    tableAreaTitle: '客製化報表-MY GHL SP報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-MY GHL SP報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  c0000266S3ppaReport: {
    tableAreaTitle: '客製化報表-Linked 627778910172 S3 PPA影響數',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-Linked 627778910172 S3 PPA影響數',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  monthlyCdnReport: {
    tableAreaTitle: 'MGT 每月CDN報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'MGT 每月CDN報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  monthlyRevenueReport: {
    tableAreaTitle: 'MGT 每月營收報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'MGT 每月營收報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  c0000338SpCustomizedReport: {
    tableAreaTitle: '客製化報表-緯創SP分潤報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-緯創SP分潤報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  linked789943651249SpCustomizedReport: {
    tableAreaTitle: '客製化報表-綠峰SP分潤報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-綠峰SP分潤報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  ch198SpCustomizedReport: {
    tableAreaTitle: '客製化報表-樂雲CH198 SP報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-樂雲CH198 SP報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cnnDtoReport: {
    tableAreaTitle: '客製化報表-CNN DTO報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-CNN DTO報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cnnBigSpReport: {
    tableAreaTitle: '客製化報表-CNEBIG SP報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-CNEBIG SP報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cneYostarEsFeeReport: {
    tableAreaTitle: '客製化報表-CNEYostar ES fee 報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-CNEYostar ES fee 報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  hk91SpUtilizationReport: {
    tableAreaTitle: '客製化報表-hk91-sp-用量分布-by account',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-hk91-sp-用量分布-by account',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  sgCagSpReport: {
    tableAreaTitle: '客製化報表-SG CAG SP報表',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: '客製化報表-SG CAG SP報表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  euiAwsbuReport: {
    tableAreaTitle: 'EUI (End User Information) Report For AWS BU',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'EUI (End User Information) Report For AWS BU',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  shieldReclassificationReport: {
    tableAreaTitle: 'Shield產品收費對象',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Shield產品收費對象',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  costRevenueReport: {
    tableAreaTitle: 'Cost Revenue Report',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Cost Revenue Report',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  //
  billingSummaryReport: {
    tableAreaTitle: 'Billing Summary Report',
    searchAreaReportTypeLavel: '報表種類',
    searchAreaReportTypeOption: 'Billing Summary Report',
    searchAreaYYYYMMLavel: '月份', // Month
  },
};
