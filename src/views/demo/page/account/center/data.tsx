export interface ListItem {
  title: string;
  icon: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  component: string;
}

export const tags: string[] = [
  '很有想法的',
  '專注設計',
  '川妹子',
  '大長腿',
  '海納百川',
  '前端開發',
  'vue3',
];

export const teams: ListItem[] = [
  {
    icon: 'ri:alipay-fill',
    title: '科學搬磚組',
    color: '#ff4000',
  },
  {
    icon: 'emojione-monotone:letter-a',
    title: '中二少年團',
    color: '#7c51b8',
  },
  {
    icon: 'ri:alipay-fill',
    title: '高逼格設計',
    color: '#00adf7',
  },
  {
    icon: 'jam:codepen-circle',
    title: '程序員日常',
    color: '#00adf7',
  },
  {
    icon: 'fa:behance-square',
    title: '科學搬磚組',
    color: '#7c51b8',
  },
  {
    icon: 'jam:codepen-circle',
    title: '程序員日常',
    color: '#ff4000',
  },
];

export const details: ListItem[] = [
  {
    icon: 'ic:outline-contacts',
    title: '交互專家',
  },
  {
    icon: 'grommet-icons:cluster',
    title: '某某某事業群',
  },
  {
    icon: 'bx:bx-home-circle',
    title: '福建省廈門市',
  },
];

export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '文章',
    component: 'Article',
  },
  {
    key: '2',
    name: '應用',
    component: 'Application',
  },
  {
    key: '3',
    name: '項目',
    component: 'Project',
  },
];

export const actions: any[] = [
  { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
  { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
  { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
];

export const articleList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 4; i++) {
    result.push({
      title: 'Vben Admin',
      description: ['Vben', '設計語言', 'Typescript'],
      content: '基於Vue Next, TypeScript, Ant Design實現的一套完整的企業級後台管理系統。',
      time: '2020-11-14 11:20',
    });
  }
  return result;
})();

export const applicationList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 8; i++) {
    result.push({
      title: 'Vben Admin',
      icon: 'emojione-monotone:letter-a',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    });
  }
  return result;
})();

export const projectList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 8; i++) {
    result.push({
      title: 'Vben Admin',
      content: '基於Vue Next, TypeScript, Ant Design實現的一套完整的企業級後台管理系統。',
    });
  }
  return result;
})();
