/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2023-04-26 05:17:01
 */

export default {
  labelChangeTime: '最后异动时间',
  labelChangeMaster: '最后异动人',
  labelCno: '客户编号',
  labelInvoiceMergeNo: '发票合并(合并对象)',
  labelCname: '客户名称',
  labelName: '客户辖下组织',
  labelLinkedAccountId: 'Linked Account ID',
  labelLinkedAccountName: 'Linked Account Name',
  labelTaxationAddress: '公司地址',
  labelGuiAddress: '寄送发票地址',
  labelUbn: '税务识别码',
  labelContact: '技术联络人',
  labelContactEmail: '技术联络人email',
  labelOverdueEmail: '逾期帐单联络email',
  labelGuiContact: '发票联络人（联络窗口）',
  labelGuiTel: '发票联络人电话',
  labelGuiEmailInvoice1: '发票寄送 (mail1)',
  labelGuiEmailInvoice2: '发票寄送 (mail2)',
  labelGuiEmailInvoice3: '发票寄送 (mail3)',
  labelGuiEmailEinv: '电子发票寄送 mail ',
  labelDomainName: 'Domain Name',
  labelZipCode: '邮递区号',
  labelIndustryCatalog: '产业类别',
  labelGuiMemo: '备注',
  labelBusinessSupport: 'MSP Technical Support',
  labelBusinessSupportPl: 'AWS Partner-Led Support',
  labelAwsBs: 'Business Support',
  labelAwsEs: 'Enterprise Support',
  labelMinCharge: '低消', //
  labelDiscountPeriod: '折扣优惠期数',
  labelBusinessSupportRate: '固定费率',
  labelSupportRate: '低消',
  labelBsMincharge: '低消',
  labelEsMincharge: '低消',
  labelDeadlin: '缴款截止日(+次月天数)',
  labelMSP: 'MSP',
  labeLGuiPending: '自动寄发帐单',
  labelDiscount: 'Discount',
  labelAlertBudget: 'POC预算金额(美金)',
  labelBillDetail: 'Email 帐单版本',
  labelServiceLevel: 'Service Level',
  labelCustomerType: '客户型态',
  labelFamily: 'Family (SI Parent ID)',
  labelEcloudSales: '业务(id)',
  labelPaymentCountry: '付款帐本',
  labelLeadgerCountry: '帐本国家',
  labelCountry: '客户国家',
  labelCurrency: '帐单币别',
  labelCurrencyPay: '付款币别',
  labelExchangeType: '汇率种类',
  labelAutoInvoice: '自动寄发 Invoice',
  labelInvoiceMonth: '发票(当月/次月/预收/拆帐)',
  labelSettleDate: '结帐日期(20 或月底)',
  labelReserveAmount: '预收馀额',
  labelSettleDept: '客户结算部门',
  labelSapCno: 'SAP CNO',
  labelPaymentInformation: '付款资讯',
  labelBankName: 'BANK NAME',
  labelBankSwiftCode: 'BANK + BRANCH CODE / SWIFT CODE',
  labelBankAccountNo: 'A/C NO',
  labelBankAccountName: 'A/C NAME',
  labelMSPAvailability: 'MSP Availability',
  labelMSPInventory: 'MSP Inventory',
  labelMSPPerformance: 'MSP Performance',
  labelMSPSecurity: 'MSP Security',
  labelMSPRightSizing: 'MSP Right Sizing',
  labelCpuRpt: 'MSP Monitor Alert',
  tooltipCno: 'ECV 为客户设的专属代码',
  tooltipInvoiceMergeNo: '合并客户多个帐号的发票金额，合并帐号请从最小 MGT 客户 ID 开始选择',
  tooltipCname: '同与客户签立之合约中的公司名称',
  tooltipName: '仅SI客户需填写，请填写客户旗下客户名称',
  tooltipLinkedAccountId1: '一般帐号 Link Account ID 必须为 12码，不足请补 0 ，如： 000000000091',
  tooltipLinkedAccountId2: '拆帐帐号 Link Account ID 必须为 14 码，不足请补 0 ，如：000000000091-1',
  tooltipLinkedAccountId3:
    '客户编号为M开头，Link Account ID 必须为8码，不足请补0，如： 00000001、10000002',
  tooltipLinkedAccountName: '帐单上此帐户显示名称',
  tooltipTaxationAddress: '客户公司签约地址',
  tooltipGuiAddress: '纸本发票寄送地址，可同公司地址',
  tooltipUbn: '统一编号或税籍编号',
  tooltipContact: '客户技术联络人',
  tooltipContactEmail: '客户技术联络人邮件地址',
  tooltipOverdueEmail: '系统自动寄发逾期帐单的客户邮件地址',
  tooltipGuiContact: '系统自动寄发客户发票的客户联络人',
  tooltipGuiTel: '系统自动寄发客户发票的客户联络人电话',
  tooltipGuiEmailInvoice1: '系统自动寄发客户帐单与 Invoice 至此客户联络邮件地址',
  tooltipGuiEmailInvoice2: '系统自动寄发客户帐单与 Invoice 至此客户联络邮件地址',
  tooltipGuiEmailInvoice3: '系统自动寄发客户帐单与 Invoice 至此客户联络邮件地址',
  tooltipGuiEmailEinv: '系统自动寄发台湾客户发票',
  tooltipDomainName: '',
  tooltipZipCode: '',
  tooltipIndustryCatalog: '',
  tooltipGuiMemo: '',
  tooltipBusinessSupport: '',
  tooltipBusinessSupportPl: '',
  tooltipMinCharge:
    'ECV 每月 MSP 服务依客户 Service Level 计算费率。如客户当月费用未高于低消金额，客户当月费用以低消金额计算',
  tooltipDiscountPeriod: '此栏位为给予新绑入客户技术维护费折扣期数，在到期前两个月会发送提醒',

  tooltipDeadlin: 'Payment Term',
  tooltipMSP: '',
  tooltipGuiPending: '每月4号 ECV 关帐后，Billing Team会让系统自动寄发客户帐单',
  tooltipDiscount: '业务额外给予客户的折扣数，请填写负数值 ex: 5% Discount 请填 -0.05',
  tooltipAlertBudget: '仅供内部使用',
  tooltipBillDetail: '',
  tooltipServiceLevel: 'MSP服务级别',
  tooltipCustomerType: 'Direct Account: 直客，OMSP: 代理商的客户',
  tooltipFamily: '仅用于SI客户设定 Mother Account，请填写 MGT 客户 ID 在所有须看到帐单的帐户资料中',
  tooltipEcloudSales: '',
  tooltipPaymentCountry: 'ECV与客户签约的分公司',
  tooltipLeadgerCountry: 'ECV 付款分公司',
  tooltipCountry: '客户公司所处国别',
  tooltipCurrency: '帐单显示币别',
  tooltipCurrencyPay: '客户实际付款币别',
  tooltipExchangeType: '依与客户签立之合约设定',
  tooltipAutoInvoice: '',
  tooltipInvoiceMonth: '依与客户签立之合约设定',
  tooltipSettleDate: '依与客户签立之合约设定',
  tooltipReserveAmount: '仅供内部使用',
  tooltipSettleDept: '客户营收的挂帐单位',
  tooltipSapCno: 'SAP(帐务)系统的客户编号',
  tooltipMSPAvailability: '专业级以上客户才需勾选此栏位。(授权Atlas系统生产MSP Report所需资料)',
  tooltipMSPInventory: '专业级以上客户才需勾选此栏位。(授权Atlas系统生产MSP Report所需资料)',
  tooltipMSPPerformance: '专业级以上客户才需勾选此栏位。(授权Atlas系统生产MSP Report所需资料)',
  tooltipMSPSecurity: '专业级以上客户才需勾选此栏位。(授权Atlas系统生产MSP Report所需资料)',
  tooltipMSPRightSizing: '专业级以上客户才需勾选此栏位。(授权Atlas系统生产MSP Report所需资料)',
  tooltipCpuRpt: '专业级以上客户才需勾选此栏位。(授权Atlas系统生产MSP Report所需资料)',
  tooltipFr:
    '客户购买 AWS Enterprise Support 时需勾选此栏，请依客户购买的特定AWS Enterprise Support费率填写',
  tooltipBs:
    '客户购买 AWS Enterprise Support 时需勾选此栏，但将采用 Business Support 费率计价；如未勾选此栏 ，ECV 将不会向客人收取此项费用，此项费用也不会列在客户帐单中。如客户当月费用未高于低消金额，当月费用以低消金额计算',
  tooltipEs:
    '仅客户购买 AWS Enterprise Support 时需勾选此栏，并将采用 Enterprise Support 费率计价；如未勾选此栏， ECV 将不会向客人收取此项费用，此项费用也不会列在客户帐单中。如客户当月费用未高于低消金额，当月费用以低消金额计算',
  mainTitleOfAddCustomerPage: '建立客户主档',
  subtitleOfCustomerListPage: '查询栏位',
  btnValidateForm: '手动校验表单',
  btnResetValidate: '清空校验信息',
  btnGetFormValues: '获取表单值',
  btnResetFields: '清除',
  btnRestoreDefault: 'Restore Default',
  btnDiscountCustomerList: '折扣优惠客户清单',
  btnExport: '导出',
  btnFitTableHeight: '自适应高度',
  btnUnFitTableHeight: '取消自适应高度',
};
