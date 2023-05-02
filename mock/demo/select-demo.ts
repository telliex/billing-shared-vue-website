/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-05-01 23:22:19
 * @LastEditors: Telliex
 * @LastEditTime: 2023-05-02 00:49:49
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const demoList = (keyword, count = 20) => {
  const result = {
    list: [] as any[],
  };
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `${keyword ?? ''}選項${index}`,
      id: `${index}`,
    });
  }
  return result;
};

export default [
  {
    url: '/basic-api/select/getDemoOptions',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query;
      console.log(keyword);
      return resultSuccess(demoList(keyword, count));
    },
  },
] as MockMethod[];
