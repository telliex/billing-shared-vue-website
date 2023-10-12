import { createI18n } from 'vue-i18n';
import zhCN from './lang/zh-CN/vxetable';
import enUS from './lang/en-US/vxetable';

const messages = {
  zh_CN: {
    ...zhCN,
  },
  en_US: {
    ...enUS,
  },
};

const i18n = createI18n({
  locale: 'en_US',
  messages,
});

export default i18n;
