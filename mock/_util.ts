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

export function resultSuccess<T = any>(items: T[], { msg = 'ok' } = {}) {
  return {
    trace_id: Guid.newGuid().toString(), // add by Telliex
    total_pages: null, // add by Telliex
    current_page: null, // add by Telliex
    // code: ResultEnum.SUCCESS,
    results: {
      total: null,
      currentPage: null,
      pageSize: null,
      items: items,
    },
    msg, // add by Telliex
    // type: 'success',
    status: 1000, // add by Telliex
    requested_time: '2023-12-14T08:30:50.120Z',
    responsed_time: '2023-12-14T08:32:50.120Z',
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  items: T[],
  { msg = 'ok' } = {},
) {
  // const pageData = pagination(page, pageSize, list);

  return {
    trace_id: Guid.newGuid().toString(), // add by Telliex
    total_pages: null, // add by Telliex
    current_page: page, // add by Telliex
    // code: ResultEnum.SUCCESS,
    results: {
      total: null,
      currentPage: page,
      pageSize: pageSize,
      items: items,
    },
    msg, // add by Telliex
    // type: 'success',
    status: 1000, // add by Telliex
    requested_time: '2023-12-14T08:30:50.120Z',
    responsed_time: '2023-12-14T08:32:50.120Z',
  };
}

export function resultError(
  items = null,
  { code = ResultEnum.ERROR, msg = 'Request failed' } = {},
) {
  return {
    trace_id: Guid.newGuid().toString(), // add by Telliex
    total_pages: null, // add by Telliex
    current_page: null, // add by Telliex
    // code: ResultEnum.SUCCESS,
    results: items,
    msg, // add by Telliex
    // type: 'success',
    status: code, // add by Telliex
    requested_time: '2023-12-14T08:30:50.120Z',
    responsed_time: '2023-12-14T08:32:50.120Z',
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
