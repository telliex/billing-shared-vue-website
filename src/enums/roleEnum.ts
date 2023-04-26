/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:54
 * @LastEditors: Telliex
 * @LastEditTime: 2023-03-07 03:08:44
 */
export enum RoleEnum {
  // super admin
  SUPER = 'super',
  // test
  TESTER = 'tester',
  // tester
  OPERATION = 'operation',
  // develop
  DEVELOP = 'develop',
  // sales
  SALES = 'sales',
  // accountant
  ACCOUNTANT = 'accountant',
  // bu
  BU = 'bu',
  // // 後台使用者帳號列表 / master_list
  // MASTER_LIST = 'master_list',
  // // 後台使用者帳號新增 / master_new
  // MASTER_NEW = 'master_new',
  // // 客戶資料列表 / customer_list
  // CUSTOMER_LIST = 'customer_list',
  // // 客戶帳單列表 / invoice_list
  // INVOICE_LIST = 'invoice_list',
  // // 客戶資料新增 / customer_new
  // CUSTOMER_NEW = 'customer_new',
  // // 客戶帳單列表 v2 / invoice_list_v2
  // INVOICE_LIST_V2 = 'invoice_list_v2',
  // // 預付群組新增 / prepaid_add_group
  // PREPAID_ADD_GROUP = 'prepaid_add_group',
  // // 預付群組列表 / prepaid_add_group
  // PREPAID_LIST_GROUP = 'prepaid_list_group',
  // // 預付資料上傳 / prepaid_upload
  // PREPAID_UPLOAD = 'prepaid_upload',
  // // workflow / workflow_my_list
  // WORKFLOW_MY_LIST = 'workflow_my_list',
  // // workflow detail / workflow_pending_list
  // WORKFLOW_PENDING_LIST = 'workflow_pending_list',
  // // CUST - CDN 列表 / cdn_list
  // CDN_LIST = 'cdn_list',
  // // CUST - CDN 新增 / cdn_new
  // CDN_NEW = 'cdn_new',
  // // 特殊調整事項列表 / dop_list
  // DOP_LIST = 'dop_list',
  // // 特殊調整事項新增 / dop_new
  // DOP_NEW = 'dop_new',
  // // 結算匯率列表 / rate_list
  // RATE_LIST = 'rate_list',
  // // 結算匯率新增 / rate_new
  // RATE_NEW = 'rate_new',
  // // 會計報表匯出 / financial_report_export_new
  // FINANCIAL_REPORT_EXPORT_NEW = 'financial_report_export_new',
  // // 會計報表匯出_billing / financial_report_export_new_billing
  // FINANCIAL_REPORT_EXPORT_NEW_BILLING = 'financial_report_export_new_billing',
  // // 關帳作業 / close
  // CLOSE = 'close',
  // // 關帳月份列表 / close_list x
  // CLOSE_LIST = 'close_list',
  // // 關帳月份新增 / close_new x
  // CLOSE_NEW = 'close_new',
  // // 關帳作業 verify / close_try_verify
  // CLOSE_TRY_VERIFY = 'close_try_verify',
  // // 會計報表 V2.0 / financial_report_v2
  // FINANCIAL_REPORT_V2 = 'financial_report_v2',
  // // 發票寄送v2.0 / invoice_report_v2.0
  // INVOICE_REPORT_V2 = 'invoice_report_v2.0',
  // // 業務每月營收報表 / sales_monthly_revenue
  // SALES_MONTHLY_REVENUE = 'sales_monthly_revenue',
  // // 業務每月CDN報表 / sales_cdn_revenue
  // SALES_CDN_REVENUE = 'sales_cdn_revenue',
  // // 帳單拆帳處理列表 / customer_sap_list
  // CUSTOMER_SAP_LIST = 'customer_sap_list',
  // // 角色樹狀圖/角色刪除 / role_hierarchy
  // ROLE_HIERARCHY = 'role_hierarchy',
  // // 角色列表/角色刪除 / role_list"
  // ROLE_LIST = 'role_list"',
}
