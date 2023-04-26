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
    title: '測試A',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '測試B',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '測試C',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '測試D',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '測試E',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '測試F',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
];

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: 'A',
    date: '剛剛',
    desc: `做了什麽不重要，因爲是測試假文`,
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: 'B',
    date: '剛剛',
    desc: `做了什麽不重要，因爲是測試假文`,
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: 'C',
    date: '剛剛',
    desc: `做了什麽不重要，因爲是測試假文`,
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: 'D',
    date: '剛剛',
    desc: `做了什麽不重要，因爲是測試假文`,
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: 'E',
    date: '剛剛',
    desc: `做了什麽不重要，因爲是測試假文`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: 'carbon:logo-github',
    color: '',
    desc: '我是假文，不要閲讀。',
    group: '測試中',
    date: '????-??-??',
  },
  {
    title: 'Vue',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '我是假文，不要閲讀。',
    group: '測試中',
    date: '????-??-??',
  },
  {
    title: 'Html5',
    icon: 'ion:logo-html5',
    color: '#e18525',
    desc: '我是假文，不要閲讀。',
    group: '測試中',
    date: '????-??-??',
  },
  {
    title: 'Angular',
    icon: 'ion:logo-angular',
    color: '#bf0c2c',
    desc: '我是假文，不要閲讀。',
    group: '測試中',
    date: '????-??-??',
  },
  {
    title: 'React',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '我是假文，不要閲讀。',
    group: '測試中',
    date: '????-??-??',
  },
  {
    title: 'Js',
    icon: 'ion:logo-javascript',
    color: '#4daf1bc9',
    desc: '我是假文，不要閲讀。',
    group: '測試中',
    date: '????-??-??',
  },
];
