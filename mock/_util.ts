/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-02-08 02:03:21
 * @LastEditors: Telliex
 * @LastEditTime: 2023-05-02 00:37:08
 */
// Interface data format used to return a unified format
import { ResultEnum } from '/@/enums/httpEnum';
import { Guid } from 'js-guid';

// export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
//   return {
//     code: ResultEnum.SUCCESS,
//     result,
//     message,
//     type: 'success',
//   };
// }

export function resultSuccess<T = Recordable>(results: T, { msg = 'ok' } = {}) {
  return {
    trace_id: Guid.newGuid().toString(), // add by Telliex
    total_pages: 1, // add by Telliex
    current_page: 1, // add by Telliex
    code: ResultEnum.SUCCESS,
    results,
    msg, // add by Telliex
    type: 'success',
    status: 1000, // add by Telliex
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { msg = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    msg,
  };
}

export function resultError(
  msg = 'Request failed',
  { code = ResultEnum.ERROR, results = null } = {},
) {
  return {
    code,
    results,
    msg,
    type: 'error',
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
