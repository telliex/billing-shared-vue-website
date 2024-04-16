const company = import.meta.env.VITE_GLOB_COMPANY;

export default {
  searchAreaTitle: '查询栏位',
  queryText: '查询',
  resetText: '清除',
  exportFile: '导出',
  autoFitHeight: '自适应高度',
  cancalFitHeight: '取消自适应',
  okText: '确认',
  closeText: '关闭',
  cancelText: '取消',
  loadingText: '加载中...',
  saveText: '保存',
  delText: '删除',
  searchText: '搜索',
  inputText: '请输入',
  chooseText: '请选择',
  redo: '刷新',
  back: '返回',
  light: '亮色主题',
  dark: '黑暗主题',
  dopCost: {
    tableAreaTitle: '特调成本报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '特调成本',
    searchAreaYYYYMMLavel: '月份',
  },
  cdnReport: {
    tableAreaTitle: 'CDN报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'CDN',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  specialModificationReport: {
    tableAreaTitle: '特殊事项调整报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '特殊事项调整',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  sapCnoReport: {
    tableAreaTitle: 'SAP_CNO对照表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'SAP_CNO对照',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  linkedaccountEntitydifferenceReport: {
    tableAreaTitle: '帐号转绑清单报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '帐号转绑清单',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  summeryReport: {
    tableAreaTitle: 'Billing Summary Report',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing Summary',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingInvoiceReport: {
    tableAreaTitle: 'Billing Invoice Report',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing Invoice',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingListEcrReport: {
    tableAreaTitle: 'Billing List Report',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing List',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingCostbylinkedReport: {
    tableAreaTitle: 'Cost By Linkedaccount Report',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Cost By Linkedaccount',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingCostbyproductReport: {
    tableAreaTitle: 'Cost By Product Report',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Cost By Product',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internaloporcr: {
    tableAreaTitle: 'CR內部帐本OPOR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'CR內部帐本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internalpor1cr: {
    tableAreaTitle: 'CR內部帐本POR1',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'CR內部帐本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customeroporcr: {
    tableAreaTitle: 'CR客戶帐本OPOR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'CR客戶帐本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerpor1cr: {
    tableAreaTitle: 'CR客戶帐本POR1',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'CR客戶帐本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerordrcr: {
    tableAreaTitle: 'CR客戶帐本ORDR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Customer ORDR CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerrdr1cr: {
    tableAreaTitle: 'CR客戶帐本RDR1',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'CR客戶帐本RDR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internaloporcc: {
    tableAreaTitle: 'C3內部帐本OPOR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'C3內部帐本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  internalpor1cc: {
    tableAreaTitle: 'C3內部帐本POR1',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'C3內部帐本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customeroporcc: {
    tableAreaTitle: 'C3客戶帐本OPOR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'C3客戶帐本OPOR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerpor1cc: {
    tableAreaTitle: 'C3客戶帐本POR1',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'C3客戶帐本POR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerordrcc: {
    tableAreaTitle: 'C3客戶帐本ORDR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'C3客戶帐本ORDR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  customerrdr1cc: {
    tableAreaTitle: 'C3客戶帐本RDR1',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'C3客戶帐本RDR1',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingsplistcr: {
    tableAreaTitle: 'Billing SP List CR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing SP List CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingspusagecr: {
    tableAreaTitle: 'Billing SP Usage CR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing SP Usage CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billinrilistcr: {
    tableAreaTitle: 'Billing RI List CR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing RI List CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingriusagecr: {
    tableAreaTitle: 'Billing RI Usage CR',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing RI Usage CR',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingsplistcc: {
    tableAreaTitle: 'Billing SP List C3',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing SP List C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingspusagecc: {
    tableAreaTitle: 'Billing SP Usage C3',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing SP Usage C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billinrilistcc: {
    tableAreaTitle: 'Billing RI List C3',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing RI List C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingriusagecc: {
    tableAreaTitle: 'Billing RI Usage C3',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing RI Usage C3',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingInvoiceContrastReport: {
    tableAreaTitle: '帐单发票对照表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '帐单发票对照表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingTaxbycnoReport: {
    tableAreaTitle: 'Local Billing税额资料报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Local Billing税额资料报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  billingCostAllocateReport: {
    tableAreaTitle: '测试帐号成本报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '测试帐号成本报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  creditownerReportaccountant: {
    tableAreaTitle: 'Credit Owner Report for Accountant',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Credit Owner Report for Accountant',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  creditownerReportsales: {
    tableAreaTitle: 'Credit Owner Report for Sales',
    searchAreaReportTypeLavel: '报表种类',
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
    tableAreaTitle: '客制化报表-CNN对帐报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-CNN对帐报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cnsCustomReport: {
    tableAreaTitle: `客制化报表-CNS对帐报表-${company}`,
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: `客制化报表-CNS对帐报表-${company}`,
    searchAreaYYYYMMLavel: '月份', // Month
  },
  zyxelReportBeforeBillingAdjustment: {
    tableAreaTitle: '客制化报表-兆勤特调前对帐报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-兆勤特调後对帐报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  zyxelReportAfterBillingAdjustment: {
    tableAreaTitle: '客制化报表-兆勤特调前对帐报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-兆勤特调後对帐报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  materialsReport: {
    tableAreaTitle: `物料主档-${company}`,
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: `物料主档-${company}`,
    searchAreaYYYYMMLavel: '月份', // Month
  },
  vnSpCustomizedReport: {
    tableAreaTitle: `客制化报表-VN SP报表-${company}`,
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: `客制化报表-VN SP报表-${company}`,
    searchAreaYYYYMMLavel: '月份', // Month
  },
  mySapuraEnergyReport: {
    tableAreaTitle: '客制化报表-MY Sapura Energy Berhad SP报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-MY Sapura Energy Berhad SP报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  sgDigitalMyanmarMoneySpReport: {
    tableAreaTitle: '客制化报表-SG Digital Myanmar Money SP报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-SG Digital Myanmar Money SP报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  myGhlSpReport: {
    tableAreaTitle: '客制化报表-MY GHL SP报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-MY GHL SP报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  c0000266S3ppaReport: {
    tableAreaTitle: '客制化报表-Linked 627778910172 S3 PPA影响数',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-Linked 627778910172 S3 PPA影响数',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  monthlyCdnReport: {
    tableAreaTitle: 'MGT 每月CDN报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'MGT 每月CDN报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  monthlyRevenueReport: {
    tableAreaTitle: 'MGT 每月营收报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'MGT 每月营收报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  c0000338SpCustomizedReport: {
    tableAreaTitle: '客制化报表-纬创SP分润报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-纬创SP分润报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  linked789943651249SpCustomizedReport: {
    tableAreaTitle: '客制化报表-绿峰SP分润报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-绿峰SP分润报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  ch198SpCustomizedReport: {
    tableAreaTitle: '客制化报表-乐云CH198 SP报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-乐云CH198 SP报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cnnDtoReport: {
    tableAreaTitle: '客制化报表-CNN DTO报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-CNN DTO报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cnnBigSpReport: {
    tableAreaTitle: '客制化报表-CNEBIG SP报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-CNEBIG SP报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  cneYostarEsFeeReport: {
    tableAreaTitle: '客制化报表-CNEYostar ES fee 报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-CNEYostar ES fee 报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  hk91SpUtilizationReport: {
    tableAreaTitle: '客制化报表-hk91-sp-用量分布-by account',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-hk91-sp-用量分布-by account',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  sgCagSpReport: {
    tableAreaTitle: '客制化报表-SG CAG SP报表',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: '客制化报表-SG CAG SP报表',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  euiAwsbuReport: {
    tableAreaTitle: 'EUI (End User Information) Report For AWS BU',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'EUI (End User Information) Report For AWS BU',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  shieldReclassificationReport: {
    tableAreaTitle: 'Shield产品收费对象',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Shield产品收费对象',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  costRevenueReport: {
    tableAreaTitle: 'Cost Revenue Report',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Cost Revenue Report',
    searchAreaYYYYMMLavel: '月份', // Month
  },
  //
  billingSummaryReport: {
    tableAreaTitle: 'Billing Summary Report',
    searchAreaReportTypeLavel: '报表种类',
    searchAreaReportTypeOption: 'Billing Summary Report',
    searchAreaYYYYMMLavel: '月份', // Month
  },
};
