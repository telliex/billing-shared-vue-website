import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, Radio } from 'ant-design-vue';
import RadioButtonGroup from '/@/components/Form/src/components/RadioButtonGroup.vue';
import VXETable from 'vxe-table';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(VXETable).use(Radio);
  app.component('RadioButtonGroup', RadioButtonGroup);
  app.component('RadioGroup', Radio.Group);
  app.component('RadioButton', Radio.Button);
}
