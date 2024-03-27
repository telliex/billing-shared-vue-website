import { BasicFetchResult } from '/@/api/model/baseModel';

export interface DropDownOptionsItem {
  label: string;
  value: string;
  key: string;
}

export interface selectParams {
  which: string;
}

/**
 * @description: Request list return value
 */
export type DropDownOptionsGetResultModel = BasicFetchResult<DropDownOptionsItem>;
