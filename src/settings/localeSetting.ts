import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType } from '/#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_TW: 'zh_TW',
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  // 是否顯示語言選擇器
  showPicker: false,
  // Locale
  locale: LOCALE.EN_US,
  // Default locale
  fallback: LOCALE.EN_US,
  // available Locales
  availableLocales: [LOCALE.ZH_TW, LOCALE.ZH_CN, LOCALE.EN_US],
};

// locale list
export const localeList: DropMenu[] = [
  {
    text: '繁體中文',
    event: LOCALE.ZH_TW,
  },
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
