import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import moment from 'moment';

import { VxeFormItemProps, VxeGridPropTypes } from '/@/components/VxeTable';
import XEUtils from 'xe-utils';

export const columns: BasicColumn[] = [
  {
    title: '部門名稱',
    dataIndex: 'deptName',
    width: 160,
    align: 'left',
  },
  {
    title: '狀態',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '啟用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '備註',
    width: 150,
    dataIndex: 'remark',
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: '創建人',
    dataIndex: 'addMasterName',
    width: 100,
  },
  {
    title: '創建時間',
    dataIndex: 'addTime',
    width: 180,
    customRender: ({ record }) => {
      return moment(record.addTime).format('YYYY-MM-DD h:mm:ss');
    },
  },
  {
    title: '修改人',
    dataIndex: 'changeMasterName',
    width: 100,
  },
  {
    title: '修改時間',
    dataIndex: 'changeTime',
    width: 180,
    customRender: ({ record }) => {
      return moment(record.changeTime).format('YYYY-MM-DD h:mm:ss');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部門名稱',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '狀態',
    component: 'Select',
    componentProps: {
      options: [
        { label: '啟用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部門名稱',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentDept',
    label: '上級部門',
    component: 'TreeSelect',

    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'status',
    label: '狀態',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '啟用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    required: true,
  },
  {
    label: '備註',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: 'Dept Name',
    field: 'deptName',
    showOverflow: 'tooltip',
    width: 160,
    sortable: true,
  },
  {
    title: 'Status',
    field: 'status',
    minWidth: 80,
    showOverflow: false,
    sortable: true,
    // formatter({ cellValue }) {
    //   return cellValue === 1 ? 'Enable' : 'Disable';
    // },
    slots: { default: 'status' },
  },
  {
    title: 'Remark',
    width: 150,
    field: 'remark',
    showOverflow: 'tooltip',
    align: 'center',
  },
  {
    title: 'Creator',
    width: 160,
    field: 'addMasterName',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Create Time',
    width: 180,
    field: 'addTime',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
    formatter({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm');
    },
  },
  {
    title: 'Latest Modified User',
    width: 160,
    field: 'changeMasterName',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Latest Updated Date',
    width: 160,
    field: 'changeTime',
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
    formatter({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm');
    },
  },
  {
    width: 100,
    title: 'Setting',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  { slots: { default: 'folding_group' }, span: 24 },
  {
    field: 'deptName',
    title: 'Dept Name',
    itemRender: {
      defaultValue: null,
      name: 'AInput',
      props: {
        placeholder: 'Please enter department name',
        clearable: true,
      },
    },
    span: 6,
    folding: true,
  },
  {
    field: 'status',
    title: 'Status',
    itemRender: {
      name: 'ASelect',
      defaultValue: null,
      props: {
        clearable: true,
        options: [
          { label: 'Enable', value: 1 },
          { label: 'Disable', value: 0 },
        ],
      },
    },
    span: 4,
    folding: true,
  },
  {
    span: 14,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: {
            type: 'primary',
            content: 'Search',
            htmlType: 'submit',
            postIcon: 'ant-design:search-outlined',
          },
          attrs: { class: 'mr-2' },
        },
        // { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
    folding: true,
  },
];
