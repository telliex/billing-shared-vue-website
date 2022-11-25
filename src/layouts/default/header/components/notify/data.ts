export interface ListItem {
  id: string;
  avatar: string;
  // 通知的標題內容
  title: string;
  // 是否在標題上顯示刪除線
  titleDelete?: boolean;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: '通知',
    list: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新週報',
        description: '',
        datetime: '2017-08-09',
        type: '1',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推薦的 曲妮妮 已通過第三輪面試',
        description: '',
        datetime: '2017-08-08',
        type: '1',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '這種模板可以區分多種通知類型',
        description: '',
        datetime: '2017-08-07',
        // read: true,
        type: '1',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左側圖標用於區分不同的類型',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title:
          '標題可以設置自動顯示省略號，本例中標題行數已設為1行，如果內容超過1行將自動截斷並支持tooltip顯示完整標題。',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左側圖標用於區分不同的類型',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左側圖標用於區分不同的類型',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左側圖標用於區分不同的類型',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000009',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左側圖標用於區分不同的類型',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000010',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左側圖標用於區分不同的類型',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
    ],
  },
  {
    key: '2',
    name: '消息',
    list: [
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲麗麗 評論了你',
        description: '描述信息描述信息描述信息',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回覆了你',
        description: '這種模板用於提醒誰與你發生了互動',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '標題',
        description:
          '請將鼠標移動到此處，以便測試超長的消息在此處將如何處理。本例中設置的描述最大行數為2，超過2行的描述內容將被省略並且可以通過tooltip查看完整內容',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
    ],
  },
  {
    key: '3',
    name: '待辦',
    list: [
      {
        id: '000000009',
        avatar: '',
        title: '任務名稱',
        description: '任務需要在 2017-01-12 20:00 前啓動',
        datetime: '',
        extra: '未開始',
        color: '',
        type: '3',
      },
      {
        id: '000000010',
        avatar: '',
        title: '第三方緊急代碼變更',
        description: '冠霖 需在 2017-01-07 前完成代碼變更任務',
        datetime: '',
        extra: '馬上到期',
        color: 'red',
        type: '3',
      },
      {
        id: '000000011',
        avatar: '',
        title: '信息安全考試',
        description: '指派竹爾於 2017-01-09 前完成更新併發布',
        datetime: '',
        extra: '已耗時 8 天',
        color: 'gold',
        type: '3',
      },
      {
        id: '000000012',
        avatar: '',
        title: 'ABCD 版本發佈',
        description: '指派竹爾於 2017-01-09 前完成更新併發布',
        datetime: '',
        extra: '進行中',
        color: 'blue',
        type: '3',
      },
    ],
  },
];
