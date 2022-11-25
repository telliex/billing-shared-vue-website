interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: string;
  color: string;
}

interface DynamicInfoItem {
  avatar: string;
  name: string;
  date: string;
  desc: string;
}

export const navItems: NavItem[] = [
  {
    title: '首頁',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '儀表盤',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '組件',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '系統管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '權限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '圖表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
];

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '剛剛',
    desc: `在 <a>開源組</a> 創建了項目 <a>Vue</a>`,
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: '艾文',
    date: '1個小時前',
    desc: `關注了 <a>威廉</a> `,
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: '克里斯',
    date: '1天前',
    desc: `發佈了 <a>個人動態</a> `,
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: 'Vben',
    date: '2天前',
    desc: `發表文章 <a>如何編寫一個Vite插件</a> `,
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: '皮特',
    date: '3天前',
    desc: `回覆了 <a>傑克</a> 的問題 <a>如何進行項目優化？</a>`,
  },
  {
    avatar: 'dynamic-avatar-6|svg',
    name: '傑克',
    date: '1周前',
    desc: `關閉了問題 <a>如何運行項目</a> `,
  },
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '1周前',
    desc: `發佈了 <a>個人動態</a> `,
  },
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '2021-04-01 20:00',
    desc: `推送了代碼到 <a>Github</a>`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: 'carbon:logo-github',
    color: '',
    desc: '不要等待機會，而要創造機會。',
    group: '開源組',
    date: '2021-04-01',
  },
  {
    title: 'Vue',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '現在的你決定將來的你。',
    group: '算法組',
    date: '2021-04-01',
  },
  {
    title: 'Html5',
    icon: 'ion:logo-html5',
    color: '#e18525',
    desc: '沒有什麼才能比努力更重要。',
    group: '上班摸魚',
    date: '2021-04-01',
  },
  {
    title: 'Angular',
    icon: 'ion:logo-angular',
    color: '#bf0c2c',
    desc: '熱情和慾望可以突破一切難關。',
    group: 'UI',
    date: '2021-04-01',
  },
  {
    title: 'React',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '健康的身體是實目標的基石。',
    group: '技術牛',
    date: '2021-04-01',
  },
  {
    title: 'Js',
    icon: 'ion:logo-javascript',
    color: '#4daf1bc9',
    desc: '路是走出來的，而不是空想出來的。',
    group: '架構組',
    date: '2021-04-01',
  },
];
