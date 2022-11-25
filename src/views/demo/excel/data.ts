/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:53
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:34:44
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '年齡',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '編號',
    dataIndex: 'no',
    width: 80,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '開始時間',
    dataIndex: 'beginTime',
  },
  {
    title: '結束時間',
    dataIndex: 'endTime',
  },
];

export const data: any[] = (() => {
  const arr: any[] = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: `${index}`,
      name: `${index} John Brown`,
      age: `${index + 10}`,
      no: `${index}98678`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  return arr;
})();

// ["ID", "姓名", "年齡", "編號", "地址", "開始時間", "結束時間"]
export const arrHeader = columns.map((column) => column.title);
// [["ID", "姓名", "年齡", "編號", "地址", "開始時間", "結束時間"],["0", "0 John Brown", "10", "098678"]]
export const arrData = data.map((item) => {
  return Object.keys(item).map((key) => item[key]);
});
