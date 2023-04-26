// import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
// import { RoleEnum } from '/@/enums/roleEnum';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '合約類別',
      dataIndex: 'contract_class',
      sorter: false,
      width: 120,
      customRender: ({ record }) => {
        console.log(record);
        if (record.contract_class === '1') {
          return 'Resold';
        } else {
          return '無法判斷';
        }
      },
    },
    {
      title: '合約編號',
      dataIndex: 'contract_id',
      sorter: false,
      width: 120,
    },
    {
      title: 'Payer Account Id',
      dataIndex: 'payer_account_id_list',
      sorter: false,
      width: 150,
      customRender: ({ record }) => {
        console.log(record);
        return record.payer_account_id_list.join('\r\n');
      },
    },
    {
      title: '合約類型',
      dataIndex: 'contract_type',
      sorter: false,
      width: 100,
      customRender: ({ record }) => {
        console.log(record);
        if (record.contract_type === '2') {
          return 'Resold Enterprise On-Ramp';
        } else if (record.contract_type === '1') {
          return 'Resold ES';
        } else {
          return '無法判斷';
        }
      },
    },
    {
      title: '加入計算',
      dataIndex: 'is_include_payer_fee',
      sorter: false,
      width: 100,
      customRender: ({ record }) => {
        console.log(record);
        if (record.is_include_payer_fee === false) {
          return '否';
        } else if (record.is_include_payer_fee === true) {
          return '是';
        } else {
          return '無法判斷';
        }
      },
    },
    {
      title: '前一合約編號',
      dataIndex: 'previous_id',
      sorter: false,
      width: 120,
    },
    {
      title: '合約狀態',
      dataIndex: 'status',
      sorter: false,
      width: 100,
      customRender: ({ record }) => {
        if (record.status === '1') {
          return (
            <span class="dot">
              <i style="background-color: #52C41A;"></i>Normal
            </span>
          );
        } else if (record.status === '0') {
          return (
            <span class="dot">
              <i style="background-color: #ff4d4f;"></i>Expired
            </span>
          );
        } else if (record.status === '2') {
          return (
            <span class="dot">
              <i style="background-color: #000000;"></i>Delete
            </span>
          );
        } else if (record.status === '3') {
          return (
            <span class="dot">
              <i style="background-color: #B2B2B2;"></i>Terminated
            </span>
          );
        } else if (record.status === '4') {
          return (
            <span class="dot">
              <i style="background-color: #FAAD14;"></i>Waiting
            </span>
          );
        } else {
          return '無法判斷';
        }
      },
    },
    {
      title: '建立人員',
      dataIndex: 'add_master_name',
      sorter: false,
      width: 120,
    },
    {
      title: '建立時間',
      dataIndex: 'add_time',
      sorter: false,
      width: 150,
      customRender: ({ record }) => {
        return record.add_time.replace('T', ' ');
      },
    },
    {
      title: '異動人員',
      dataIndex: 'change_master_name',
      sorter: false,
      width: 120,
    },
    {
      title: '異動時間',
      dataIndex: 'change_time',
      sorter: false,
      width: 150,
      customRender: ({ record }) => {
        return record.change_time.replace('T', ' ');
      },
    },
  ];
}
