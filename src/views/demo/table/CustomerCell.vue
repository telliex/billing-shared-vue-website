<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'id'"> ID: {{ record.id }} </template>
        <template v-else-if="column.key === 'no'">
          <Tag color="green">
            {{ record.no }}
          </Tag>
        </template>
        <template v-else-if="column.key === 'avatar'">
          <Avatar :size="60" :src="record.avatar" />
        </template>
        <template v-else-if="column.key === 'imgArr'">
          <TableImg :size="60" :simpleShow="true" :imgList="text" />
        </template>
        <template v-else-if="column.key === 'imgs'">
          <TableImg :size="60" :imgList="text" />
        </template>

        <template v-else-if="column.key === 'category'">
          <Tag color="green">
            {{ record.no }}
          </Tag>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableImg } from '/@/components/Table';
  import { Tag, Avatar } from 'ant-design-vue';
  import { demoListApi } from '/@/api/demo/table';
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      // slots: { customRender: 'id' },
    },
    {
      title: '頭像',
      dataIndex: 'avatar',
      width: 100,
      // slots: { customRender: 'avatar' },
    },
    {
      title: '分類',
      dataIndex: 'category',
      width: 80,
      align: 'center',
      defaultHidden: true,
      // slots: { customRender: 'category' },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '圖片列表1',
      dataIndex: 'imgArr',
      helpMessage: ['這是簡單模式的圖片列表', '只會顯示一張在表格中', '但點擊可預覽多張圖片'],
      width: 140,
      // slots: { customRender: 'img' },
    },
    {
      title: '照片列表2',
      dataIndex: 'imgs',
      width: 160,
      // slots: { customRender: 'imgs' },
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '編號',
      dataIndex: 'no',
      // slots: { customRender: 'no' },
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
  export default defineComponent({
    components: { BasicTable, TableImg, Tag, Avatar },
    setup() {
      const [registerTable] = useTable({
        title: '自定義列內容',
        titleHelpMessage: '表格中所有頭像、圖片均為mock生成，僅用於演示圖片佔位',
        api: demoListApi,
        columns: columns,
        bordered: true,
        showTableSetting: true,
      });

      return {
        registerTable,
      };
    },
  });
</script>
