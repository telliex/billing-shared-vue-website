/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-05-01 23:22:19
 * @LastEditors: Telliex
 * @LastEditTime: 2023-05-02 00:56:03
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const demoTreeList = (keyword) => {
  const result = {
    list: [] as Recordable[],
  };
  for (let index = 0; index < 5; index++) {
    const children: Recordable[] = [];
    for (let j = 0; j < 3; j++) {
      children.push({
        title: `${keyword ?? ''}選項${index}-${j}`,
        value: `${index}-${j}`,
        key: `${index}-${j}`,
      });
    }
    result.list.push({
      title: `${keyword ?? ''}選項${index}`,
      value: `${index}`,
      key: `${index}`,
      children,
    });
  }
  return result;
};

export default [
  {
    url: '/basic-api/tree/getDemoOptions',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword } = query;
      console.log(keyword);
      return resultSuccess(demoTreeList(keyword));
    },
  },
] as MockMethod[];
