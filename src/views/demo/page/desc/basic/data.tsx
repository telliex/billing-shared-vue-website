import { DescItem } from '/@/components/Description/index';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { Button } from '/@/components/Button';

import { Badge } from 'ant-design-vue';

export const refundData = {
  a1: '1000000000',
  a2: '已取貨',
  a3: '1234123421',
  a4: '3214321432',
};

export const personData = {
  b1: '付小小',
  b2: '18100000000',
  b3: '菜鳥倉儲',
  b4: '浙江省杭州市西湖區萬塘路18號',
  b5: '無',
};
export const refundSchema: DescItem[] = [
  {
    field: 'a1',
    label: '取貨單號',
  },
  {
    field: 'a2',
    label: '狀態',
  },
  {
    field: 'a3',
    label: '銷售單號',
  },
  {
    field: 'a4',
    label: '子訂單',
  },
];
export const personSchema: DescItem[] = [
  {
    field: 'b1',
    label: '用户姓名',
  },
  {
    field: 'b2',
    label: '聯繫電話',
  },
  {
    field: 'b3',
    label: '常用快遞',
  },
  {
    field: 'b4',
    label: '取貨地址',
  },
  {
    field: 'b5',
    label: '備註',
  },
];

export const refundTableSchema: BasicColumn[] = [
  {
    title: '商品編號',
    width: 150,
    dataIndex: 't1',
    customRender: ({ record }) => {
      return (
        <Button type="link" size="small">
          {() => record.t1}
        </Button>
      );
    },
  },
  {
    title: '商品名稱',
    width: 150,
    dataIndex: 't2',
  },
  {
    title: '商品條碼',
    width: 150,
    dataIndex: 't3',
  },
  {
    title: '單價	',
    width: 150,
    dataIndex: 't4',
  },
  {
    title: '數量（件）	',
    width: 150,
    dataIndex: 't5',
  },
  {
    title: '金額',
    width: 150,
    dataIndex: 't6',
  },
];
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

export const refundTableData: any[] = [
  {
    t1: 1234561,
    t2: '礦泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 1,
    t6: 2.0,
  },
  {
    t1: 1234562,
    t2: '礦泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 2,
    t6: 2.0,
  },
  {
    t1: 1234562,
    t2: '礦泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 2,
    t6: 2.0,
  },
  {
    t1: 1234562,
    t2: '礦泉水 550ml',
    t3: '12421432143214321',
    t4: '2.00',
    t5: 2,
    t6: 2.0,
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
