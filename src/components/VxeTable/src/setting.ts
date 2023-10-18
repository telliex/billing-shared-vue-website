import { VXETable } from '..';
import componentSetting from '/@/settings/componentSetting';
import i18n from './i18n';

VXETable.setup({ ...componentSetting.vxeTable, i18n: (key, args) => i18n.global.t(key, args) });
