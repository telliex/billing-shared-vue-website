/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:46:45
 */
import { BasicColumn } from '/@/components/Table/src/types/table';

import { Badge } from 'ant-design-vue';

export const refundTimeTableSchema: BasicColumn[] = [
  {
    title: '時間',
    width: 150,
    dataIndex: 't1',
  },
  {
    title: '當前進度',
    width: 150,
    dataIndex: 't2',
  },
  {
    title: '狀態',
    width: 150,
    dataIndex: 't3',
    customRender: ({ record }) => {
      return <Badge status="success" text={record.t3} />;
    },
  },
  {
    title: '操作員ID	',
    width: 150,
    dataIndex: 't4',
  },
  {
    title: '耗時',
    width: 150,
    dataIndex: 't5',
  },
];

export const refundTimeTableData: any[] = [
  {
    t1: '2017-10-01 14:10',
    t2: '聯繫客户',
    t3: '進行中',
    t4: '取貨員 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取貨員出發',
    t3: '成功',
    t4: '取貨員 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取貨員接單',
    t3: '成功',
    t4: '系統',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '申請審批通過',
    t3: '成功',
    t4: '用户',
    t5: '1h',
  },
];
