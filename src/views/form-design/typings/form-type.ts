import { Ref } from 'vue';
import { IAnyObject } from './base-type';
import { IFormConfig, IVFormComponent } from './v-form-component';

export interface IToolbarMethods {
  showModal: (jsonData: IAnyObject) => void;
}

type ChangeTabKey = 1 | 2;
export interface IPropsPanel {
  changeTab: (key: ChangeTabKey) => void;
}
export interface IState {
  // 語言
  locale: any;
  // 公用組件
  baseComponents: IVFormComponent[];
  // 自定義組件
  customComponents: IVFormComponent[];
  // 佈局組件
  layoutComponents: IVFormComponent[];
  // 屬性面板實例
  propsPanel: Ref<null | IPropsPanel>;
  // json模態框實例
  jsonModal: Ref<null | IToolbarMethods>;
  // 導入json數據模態框
  importJsonModal: Ref<null | IToolbarMethods>;
  // 代碼預覽模態框
  codeModal: Ref<null | IToolbarMethods>;
  // 預覽模態框
  eFormPreview: Ref<null | IToolbarMethods>;

  eFormPreview2: Ref<null | IToolbarMethods>;
}

export interface IFormDesignMethods {
  // 設置當前選中的控件
  handleSetSelectItem(item: IVFormComponent): void;
  // 添加控件到formConfig.formItems中
  handleListPush(item: IVFormComponent): void;
  // 複製控件
  handleCopy(item?: IVFormComponent, isCopy?: boolean): void;
  // 添加控件屬性
  handleAddAttrs(schemas: IVFormComponent[], index: number): void;
  setFormConfig(config: IFormConfig): void;
  // 添加到表單中之前觸發
  handleBeforeColAdd(
    event: { newIndex: string },
    schemas: IVFormComponent[],
    isCopy?: boolean,
  ): void;
}
