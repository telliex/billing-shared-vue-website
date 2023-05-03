import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_TW';

const modules = import.meta.globEager('./zh-TW/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'zh-TW'),
    antdLocale,
  },
};
