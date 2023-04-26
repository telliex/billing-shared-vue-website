/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-02-20 07:18:02
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-20 11:29:40
 */

import { defHttp } from '/@/utils/http/axios';
import { GetDictResultModel } from './model/dictModel';

const version = '/v1.0';

enum Api {
  Dictionary = `/common/dict`,
}

export const getDict = (trace_id: string) =>
  defHttp.post<GetDictResultModel>({
    url: version + Api.Dictionary,
    params: { trace_id },
  });
