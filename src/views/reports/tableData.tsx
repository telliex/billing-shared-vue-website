import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { RoleEnum } from '/@/enums/roleEnum';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'bill_period',
      dataIndex: 'bill_period',
      sorter: true,
      width: 200,
    },
    {
      title: 'cno',
      width: 150,
      sorter: true,
      auth: RoleEnum.SUPER,
      dataIndex: 'cno',
      ifShow: () => {
        return true; // 根据业务控制是否显示
      },
    },
    {
      title: 'cname',
      width: 150,
      sorter: true,
      dataIndex: 'cname',
    },
    {
      title: 'ecloud_sales',
      width: 150,
      sorter: true,
      dataIndex: 'ecloud_sales',
    },
    {
      title: 'ec2',
      width: 150,
      sorter: true,
      dataIndex: 'ec2',
    },
    {
      title: 'rds',
      width: 150,
      sorter: true,
      dataIndex: 'rds',
    },
    {
      title: 'es',
      width: 150,
      sorter: true,
      dataIndex: 'es',
    },
    {
      title: 'elasticache',
      width: 150,
      sorter: true,
      dataIndex: 'elasticache',
    },
    {
      title: 'cdn',
      width: 150,
      sorter: true,
      dataIndex: 'cdn',
    },
    {
      title: 'aws_support_sum',
      width: 150,
      sorter: true,
      dataIndex: 'aws_support_sum',
    },
    {
      title: 'other',
      width: 150,
      sorter: (a, b) => a.other - b.other,
      dataIndex: 'other',
    },
    {
      title: 'business_support_exec',
      width: 150,
      sorter: true,
      dataIndex: 'business_support_exec',
    },
    {
      title: 'discount',
      width: 150,
      sorter: true,
      dataIndex: 'discount',
    },
    {
      title: 'credit',
      width: 150,
      sorter: true,
      dataIndex: 'credit',
    },
    {
      title: 'Refund',
      width: 150,
      sorter: true,
      dataIndex: 'Refund',
    },
    {
      title: 'SavingsPlan',
      width: 150,
      sorter: true,
      dataIndex: 'SavingsPlan',
    },
    {
      title: 'RI_Unused_Of_Ecv',
      width: 150,
      sorter: true,
      dataIndex: 'RI_Unused_Of_Ecv',
    },
    {
      title: 'SP_Unused',
      width: 150,
      sorter: true,
      dataIndex: 'SP_Unused',
    },
    {
      title: 'RI_Amortizing',
      width: 150,
      sorter: true,
      dataIndex: 'RI_Amortizing',
    },
    {
      title: 'OCB_Value',
      width: 150,
      sorter: true,
      dataIndex: 'OCB_Value',
    },
    {
      title: 'business_support_exec_discount',
      width: 150,
      sorter: true,
      dataIndex: 'business_support_exec_discount',
    },
    {
      title: 'si_discount',
      width: 150,
      sorter: true,
      dataIndex: 'si_discount',
    },
    {
      title: 'total revenue(USD)',
      width: 150,
      sorter: true,
      dataIndex: 'total revenue(USD)',
    },
    {
      title: 'business_support',
      width: 150,
      sorter: true,
      dataIndex: 'business_support',
    },
    {
      title: 'AWS Support (Developer)',
      width: 150,
      sorter: true,
      dataIndex: 'AWS Support (Developer)',
    },
    {
      title: 'AWS Support (Business)',
      width: 150,
      sorter: true,
      dataIndex: 'AWS Support (Business)',
    },
    {
      title: 'AWS Support (Enterprise)',
      width: 150,
      sorter: true,
      dataIndex: 'AWS Support (Enterprise)',
    },
    {
      title: 'AWS Support COST (Developer)',
      width: 150,
      sorter: true,
      dataIndex: 'AWS Support COST (Developer)',
    },
    {
      title: 'AWS Support COST (Business)',
      width: 150,
      sorter: true,
      dataIndex: 'AWS Support COST (Business)',
    },
    {
      title: 'AWS Support COST (Enterprise)',
      width: 150,
      sorter: true,
      dataIndex: 'AWS Support COST (Enterprise)',
    },
    {
      title: 'sum',
      width: 150,
      sorter: true,
      dataIndex: 'sum',
    },
    {
      title: 'dop_ri',
      width: 150,
      sorter: true,
      dataIndex: 'dop_ri',
    },
    {
      title: 'dop_support',
      width: 150,
      sorter: true,
      dataIndex: 'dop_support',
    },
    {
      title: 'dop_cdn',
      width: 150,
      sorter: true,
      dataIndex: 'dop_cdn',
    },
    {
      title: 'dop_other',
      width: 150,
      sorter: true,
      dataIndex: 'dop_other',
    },
    {
      title: 'ec2_cost',
      width: 150,
      sorter: true,
      dataIndex: 'ec2_cost',
    },
    {
      title: 'rds_cost',
      width: 150,
      sorter: true,
      dataIndex: 'rds_cost',
    },
    {
      title: 'es_cost',
      width: 150,
      sorter: true,
      dataIndex: 'es_cost',
    },
    {
      title: 'elasticache_cost',
      width: 150,
      sorter: true,
      dataIndex: 'elasticache_cost',
    },
    {
      title: 'cdn_cost',
      width: 150,
      sorter: true,
      dataIndex: 'cdn_cost',
    },
    {
      title: 'aws_support_cost_sum',
      width: 150,
      sorter: true,
      dataIndex: 'aws_support_cost_sum',
    },
    {
      title: 'other cost',
      width: 150,
      sorter: true,
      dataIndex: 'other cost',
    },
    {
      title: 'totalcost',
      width: 150,
      sorter: true,
      dataIndex: 'totalcost',
    },
    {
      title: 'RealCost',
      width: 150,
      sorter: true,
      dataIndex: 'RealCost',
    },
    {
      title: 'Gross Profit',
      width: 150,
      sorter: true,
      dataIndex: 'Gross Profit',
    },
    {
      title: 'percent',
      width: 150,
      sorter: true,
      dataIndex: 'percent',
    },
    {
      title: 'settle_dept',
      width: 150,
      sorter: true,
      dataIndex: 'settle_dept',
    },
    {
      title: '客戶收入占比',
      width: 150,
      sorter: true,
      dataIndex: '客戶收入占比',
    },
    {
      title: '毛利占比',
      width: 150,
      sorter: true,
      dataIndex: '毛利占比',
    },
    {
      title: 'Customer Type',
      width: 150,
      sorter: true,
      dataIndex: 'Customer Type',
    },
    {
      title: 'Service Level',
      width: 150,
      sorter: true,
      dataIndex: 'Service Level',
    },
    {
      title: 'TotalCostAddDOP',
      width: 150,
      sorter: true,
      dataIndex: 'TotalCostAddDOP',
    },
    {
      title: 'RealCostAddDOP',
      width: 150,
      sorter: true,
      dataIndex: 'RealCostAddDOP',
    },
  ];
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ];
}

export function getMultipleHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },

        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120,
        },
      ],
    },
  ];
}

export function getCustomHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      helpMessage: 'headerHelpMessage方式1',
      width: 200,
    },
    {
      // title: '姓名',
      dataIndex: 'name',
      width: 120,
      // slots: { title: 'customTitle' },
    },
    {
      // title: '地址',
      dataIndex: 'address',
      width: 120,
      // slots: { title: 'customAddress' },
      sorter: true,
    },

    {
      title: '编号',
      dataIndex: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 120,
    },
  ];
}
const renderContent = ({ text, index }: { text: any; index: number }) => {
  const obj: any = {
    children: text,
    attrs: {},
  };
  if (index === 9) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '地址',
      dataIndex: 'address',
      colSpan: 2,
      width: 120,
      sorter: true,
      customRender: ({ text, index }: { text: any; index: number }) => {
        const obj: any = {
          children: text,
          attrs: {},
        };
        if (index === 2) {
          obj.attrs.rowSpan = 2;
        }
        if (index === 3) {
          obj.attrs.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '编号',
      dataIndex: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customRender: renderContent,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      customRender: renderContent,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      customRender: renderContent,
    },
  ];
}
export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema(1)],
  };
}
export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
}

export function getTreeTableData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: 'John Brown',
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      });
    }
    return arr;
  })();
}
