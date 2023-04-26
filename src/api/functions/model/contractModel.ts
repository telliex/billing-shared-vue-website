/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-02-20 07:18:24
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-23 21:18:36
 */

// 查詢合約 res
export interface GetContractListSendModel {
  contract_class?: string;
  contract_id?: string;
  contract_type?: string;
  current_page: number;
  end_date?: string;
  page_size: number;
  payer_account_id_list?: string[];
  start_date?: string;
  trace_id: string;
}

// 查詢合約 req
export interface GetContractListResultModel {
  current_page?: number;
  items?: Item[];
  page_size?: number;
  total_pages?: number;
}

export interface Item {
  add_master_name?: string;
  add_time?: string;
  change_master_name?: string;
  change_time?: string;
  contract_class?: string;
  contract_id?: string;
  contract_period?: ContractPeriod[];
  contract_term?: number;
  contract_type?: string;
  end_date?: string;
  id?: string;
  is_include_payer_fee?: boolean;
  payer_account_id_list?: string[];
  previous_id?: string;
  start_date?: string;
  status?: string;
  termination_id?: string;
  termination_id_date?: string;
}

export interface ContractPeriod {
  cost_discount_rate?: number;
  cost_min_charge?: number;
  end_date?: string;
  revenue_discount_rate?: number;
  revenue_min_charge?: number;
  start_date?: string;
  status?: string;
}

export interface GetContractInfoSendModel {
  /**
   * 合約類別
   */
  contract_class?: string;
  /**
   * 合約編號
   */
  contract_id?: string;
  /**
   * 合約類型
   */
  contract_type?: string;
  /**
   * id
   */
  id: string;
  trace_id: string;
}

export interface GetContractInfoResultModel {
  /**
   * 新建資料之人員
   */
  add_master_name: string;
  /**
   * 建立時間
   */
  add_time: string;
  /**
   * 異動資料之人員
   */
  change_master_name: string;
  /**
   * 更新時間
   */
  change_time: string;
  contract_class: string;
  /**
   * 合約編號
   */
  contract_id: string;
  contract_period: ContractPeriod[];
  /**
   * 合約狀態
   */
  contract_status: string;
  /**
   * 幾年合約
   */
  contract_term: number;
  /**
   * 合約類型
   */
  contract_type: string;
  /**
   * 合約結束時間
   */
  end_date: string;
  /**
   * id，GUID
   */
  id: string;
  /**
   * 計算 support 使用量基數是否包含 payer account 費用
   */
  is_include_payer_fee: boolean;
  /**
   * payer account id
   */
  payer_account_id_list: string[];
  /**
   * 前一個合約編號
   */
  previous_contract_id: string;
  /**
   * 合約生效開始時間
   */
  start_date: string;
}

export interface CreateContractSendModel {
  add_master: number | null;
  add_master_name: string;
  change_master: number | null;
  change_master_name: string;
  contract_class: string;
  contract_id?: string;
  contract_period: ContractPeriod[];
  contract_term: number;
  contract_type: string;
  end_date: string;
  is_include_payer_fee: boolean;
  payer_account_id_list: string[];
  previous_id?: string;
  start_date: string;
  trace_id: string;
}

export interface UpdateContractSendModel {
  add_master?: number | null;
  add_master_name?: null | string;
  change_master: number;
  change_master_name?: string;
  contract_class: string;
  contract_id?: string;
  contract_period: ContractPeriod[];
  contract_term: number;
  contract_type: string;
  end_date: string;
  id: string;
  is_include_payer_fee: boolean;
  payer_account_id: string[];
  previous_id?: string;
  start_date: string;
  trace_id: string;
}

export interface DeleteContractSendModel {
  id: string;
  trace_id: string;
}

export interface StopContractSendModel {
  contract_id: string;
  id: string;
  termination_id?: string;
  termination_id_date?: string;
  trace_id: string;
}

export interface GetContractIdDropdown {
  payer_account_id_list: string[];
  status_list: string[];
  trace_id: string;
}

export interface GetContractTypeDropdown {
  payer_account_id_list: string[];
  trace_id: string;
}

export interface GetPayerAccountIdDropdown {
  trace_id: string;
}
