/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-24 07:06:04
 */

export default {
  labelChangeTime: '最後異動時間',
  labelChangeMaster: '最後異動人',
  labelCno: '客戶編號',
  labelInvoiceMergeNo: '發票合併(合併對象)',
  labelCname: '客戶名稱',
  labelName: '客戶轄下組織',
  labelLinkedAccountId: 'Linked Account ID',
  labelLinkedAccountName: 'Linked Account Name',
  labelTaxationAddress: '公司地址',
  labelGuiAddress: '寄送發票地址',
  labelUbn: '稅務識別碼',
  labelContact: '技術聯絡人',
  labelContactEmail: '技術聯絡人email',
  labelOverdueEmail: '逾期帳單聯絡email',
  labelGuiContact: '發票聯絡人（聯絡窗口）',
  labelGuiTel: '發票聯絡人電話',
  labelGuiEmailInvoice1: '發票寄送 (mail1)',
  labelGuiEmailInvoice2: '發票寄送 (mail2)',
  labelGuiEmailInvoice3: '發票寄送 (mail3)',
  labelGuiEmailEinv: '電子發票寄送 mail ',
  labelDomainName: 'Domain Name',
  labelZipCode: '郵遞區號',
  labelIndustryCatalog: '產業類別',
  labelGuiMemo: '備註',
  labelBusinessSupport: 'MSP Technical Support',
  labelBusinessSupportPl: 'AWS Partner-Led Support',
  labelAwsBs: 'Business Support',
  labelAwsEs: 'Enterprise Support',
  labelMinCharge: '低消', //
  labelDiscountPeriod: '折扣優惠期數',
  labelBusinessSupportRate: '固定費率',
  labelSupportRate: '低消',
  labelBsMincharge: '低消',
  labelEsMincharge: '低消',
  labelDeadlin: '繳款截止日(+次月天數)',
  labelMSP: 'MSP',
  labeLGuiPending: '自動寄發帳單',
  labelDiscount: 'Discount',
  labelAlertBudget: 'POC預算金額(美金)',
  labelBillDetail: 'Email 帳單版本',
  labelServiceLevel: 'Service Level',
  labelCustomerType: '客戶型態',
  labelFamily: 'Family (SI Parent ID)',
  labelEcloudSales: '業務(id)',
  labelPaymentCountry: '付款帳本',
  labelLeadgerCountry: '帳本國家',
  labelCountry: '客戶國家',
  labelCurrency: '帳單幣別',
  labelCurrencyPay: '付款幣別',
  labelExchangeType: '匯率種類',
  labelAutoInvoice: '自動寄發 Invoice',
  labelInvoiceMonth: '發票(當月/次月/預收/拆帳)',
  labelSettleDate: '結帳日期(20 或月底)',
  labelReserveAmount: '預收餘額',
  labelSettleDept: '客戶結算部門',
  labelSapCno: 'SAP CNO',
  labelPaymentInformation: '付款資訊',
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
  tooltipCno: 'ECV 為客戶設的專屬代碼',
  tooltipInvoiceMergeNo: '合併客戶多個帳號的發票金額，合併帳號請從最小 MGT 客戶 ID 開始選擇',
  tooltipCname: '同與客戶簽立之合約中的公司名稱',
  tooltipName: '僅SI客戶需填寫，請填寫客戶旗下客戶名稱',
  tooltipLinkedAccountId1: '一般帳號 Link Account ID 必須為 12碼，不足請補 0 ，如： 000000000091',
  tooltipLinkedAccountId2: '拆帳帳號 Link Account ID 必須為 14 碼，不足請補 0 ，如：000000000091-1',
  tooltipLinkedAccountId3:
    '客戶編號為M開頭，Link Account ID 必須為8碼，不足請補0，如： 00000001、10000002',
  tooltipLinkedAccountName: '帳單上此帳戶顯示名稱',
  tooltipTaxationAddress: '客戶公司簽約地址',
  tooltipGuiAddress: '紙本發票寄送地址，可同公司地址',
  tooltipUbn: '統一編號或稅籍編號',
  tooltipContact: '客戶技術聯絡人',
  tooltipContactEmail: '客戶技術聯絡人郵件地址',
  tooltipOverdueEmail: '系統自動寄發逾期帳單的客戶郵件地址',
  tooltipGuiContact: '系統自動寄發客戶發票的客戶聯絡人',
  tooltipGuiTel: '系統自動寄發客戶發票的客戶聯絡人電話',
  tooltipGuiEmailInvoice1: '系統自動寄發客戶帳單與 Invoice 至此客戶聯絡郵件地址',
  tooltipGuiEmailInvoice2: '系統自動寄發客戶帳單與 Invoice 至此客戶聯絡郵件地址',
  tooltipGuiEmailInvoice3: '系統自動寄發客戶帳單與 Invoice 至此客戶聯絡郵件地址',
  tooltipGuiEmailEinv: '系統自動寄發台灣客戶發票',
  tooltipDomainName: '',
  tooltipZipCode: '',
  tooltipIndustryCatalog: '',
  tooltipGuiMemo: '',
  tooltipBusinessSupport: '',
  tooltipBusinessSupportPl: '',
  tooltipMinCharge:
    'ECV 每月 MSP 服務依客戶 Service Level 計算費率。如客戶當月費用未高於低消金額，客戶當月費用以低消金額計算',
  tooltipDiscountPeriod: '此欄位為給予新綁入客戶技術維護費折扣期數，在到期前兩個月會發送提醒',

  tooltipDeadlin: 'Payment Term',
  tooltipMSP: '',
  tooltipGuiPending: '每月4號 ECV 關帳後，Billing Team會讓系統自動寄發客戶帳單',
  tooltipDiscount: '業務額外給予客戶的折扣數，請填寫負數值 ex: 5% Discount 請填 -0.05',
  tooltipAlertBudget: '僅供內部使用',
  tooltipBillDetail: '',
  tooltipServiceLevel: 'MSP服務級別',
  tooltipCustomerType: 'Direct Account: 直客，OMSP: 代理商的客戶',
  tooltipFamily: '僅用於SI客戶設定 Mother Account，請填寫 MGT 客戶 ID 在所有須看到帳單的帳戶資料中',
  tooltipEcloudSales: '',
  tooltipPaymentCountry: 'ECV與客戶簽約的分公司',
  tooltipLeadgerCountry: 'ECV 付款分公司',
  tooltipCountry: '客戶公司所處國別',
  tooltipCurrency: '帳單顯示幣別',
  tooltipCurrencyPay: '客戶實際付款幣別',
  tooltipExchangeType: '依與客戶簽立之合約設定',
  tooltipAutoInvoice: '',
  tooltipInvoiceMonth: '依與客戶簽立之合約設定',
  tooltipSettleDate: '依與客戶簽立之合約設定',
  tooltipReserveAmount: '僅供內部使用',
  tooltipSettleDept: '客戶營收的掛帳單位',
  tooltipSapCno: 'SAP(帳務)系統的客戶編號',
  tooltipMSPAvailability: '專業級以上客戶才需勾選此欄位。(授權Atlas系統生產MSP Report所需資料)',
  tooltipMSPInventory: '專業級以上客戶才需勾選此欄位。(授權Atlas系統生產MSP Report所需資料)',
  tooltipMSPPerformance: '專業級以上客戶才需勾選此欄位。(授權Atlas系統生產MSP Report所需資料)',
  tooltipMSPSecurity: '專業級以上客戶才需勾選此欄位。(授權Atlas系統生產MSP Report所需資料)',
  tooltipMSPRightSizing: '專業級以上客戶才需勾選此欄位。(授權Atlas系統生產MSP Report所需資料)',
  tooltipCpuRpt: '專業級以上客戶才需勾選此欄位。(授權Atlas系統生產MSP Report所需資料)',
  tooltipFr:
    '客戶購買 AWS Enterprise Support 時需勾選此欄，請依客戶購買的特定AWS Enterprise Support費率填寫',
  tooltipBs:
    '客戶購買 AWS Enterprise Support 時需勾選此欄，但將採用 Business Support 費率計價；如未勾選此欄 ，ECV 將不會向客人收取此項費用，此項費用也不會列在客戶帳單中。如客戶當月費用未高於低消金額，當月費用以低消金額計算',
  tooltipEs:
    '僅客戶購買 AWS Enterprise Support 時需勾選此欄，並將採用 Enterprise Support 費率計價；如未勾選此欄， ECV 將不會向客人收取此項費用，此項費用也不會列在客戶帳單中。如客戶當月費用未高於低消金額，當月費用以低消金額計算',
  mainTitleOfAddCustomerPage: '建立客戶主檔',
  subtitleOfCustomerListPage: '查詢欄位',
  btnValidateForm: '手動校驗表單',
  btnResetValidate: '清空校驗信息',
  btnGetFormValues: '獲取表單值',
  btnResetFields: '重置',
  btnRestoreDefault: 'Restore Default',
  btnDiscountCustomerList: '折扣優惠客戶清單',
  btnExport: '導出',
  btnFitTableHeight: '自適應高度',
  btnUnFitTableHeight: '取消自適應高度',
};
