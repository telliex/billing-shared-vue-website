// import { VueConstructor } from 'vue';
import { IVFormComponent, IFormConfig, IValidationRule } from '../typings/v-form-component';
import { cloneDeep, isArray, isFunction, isNumber, uniqueId } from 'lodash-es';
// import { del } from '@vue/composition-api';
// import { withInstall } from '/@/utils';

/**
 * 組件install方法
 * @param comp 需要掛載install方法的組件
 */
// export function withInstall<T extends { name: string }>(comp: T) {
//   return Object.assign(comp, {
//     install(Vue: VueConstructor) {
//       Vue.component(comp.name, comp);
//     },
//   });
// }

/**
 * 生成key
 * @param [formItem] 需要生成 key 的控件，可選，如果不傳，默認返回一個唯一 key
 * @returns {string|boolean} 返回一個唯一 id 或者 false
 */
export function generateKey(formItem?: IVFormComponent): string | boolean {
  if (formItem && formItem.component) {
    const key = uniqueId(`${toLine(formItem.component)}_`);
    formItem.key = key;
    formItem.field = key;

    return true;
  }
  return uniqueId('key_');
}

/**
 * 移除數組中指定元素，value可以是一個數字下標，也可以是一個函數，刪除函數第一個返回true的元素
 * @param array {Array<T>} 需要移除元素的數組
 * @param value {number | ((item: T, index: number, array: Array<T>) => boolean}
 * @returns {T} 返回刪除的數組項
 */
export function remove<T>(
  array: Array<T>,
  value: number | ((item: T, index: number, array: Array<T>) => boolean),
): T | undefined {
  let removeVal: Array<T | undefined> = [];
  if (!isArray(array)) return undefined;
  if (isNumber(value)) {
    removeVal = array.splice(value, 1);
  } else {
    const index = array.findIndex(value);
    if (index !== -1) {
      removeVal = array.splice(index, 1);
    }
  }
  return removeVal.shift();
}

/**
 * 判斷數據類型
 * @param value
 */
export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

/**
 * 生成唯一guid
 * @returns {String} 唯一id標識符
 */
export function randomUUID(): string {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4() + S4() + S4()}`;
}

/**
 * 駝峰轉下劃線
 * @param str
 */
export function toLine(str: string) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 遍歷表單項
 * @param array
 * @param cb
 */
export function formItemsForEach(array: IVFormComponent[], cb: (item: IVFormComponent) => void) {
  if (!isArray(array)) return;
  const traverse = (schemas: IVFormComponent[]) => {
    schemas.forEach((formItem: IVFormComponent) => {
      if (['Grid'].includes(formItem.component)) {
        // 柵格佈局
        formItem.columns?.forEach((item) => traverse(item.children));
      } else {
        cb(formItem);
      }
    });
  };
  traverse(array);
}

/**
 * 查找表單項
 */
export const findFormItem: (
  schemas: IVFormComponent[],
  cb: (formItem: IVFormComponent) => boolean,
) => IVFormComponent | undefined = (schemas, cb) => {
  let res;
  const traverse = (schemas: IVFormComponent[]): boolean => {
    return schemas.some((formItem: IVFormComponent) => {
      const { component: type } = formItem;
      // 處理柵格
      if (['Grid'].includes(type)) {
        return formItem.columns?.some((item) => traverse(item.children));
      }
      if (cb(formItem)) res = formItem;
      return cb(formItem);
    });
  };
  traverse(schemas);
  return res;
};

/**
 * 打開json模態框時刪除當前項屬性
 * @param formConfig {IFormConfig}
 * @returns {IFormConfig}
 */
export const removeAttrs = (formConfig: IFormConfig): IFormConfig => {
  const copyFormConfig = cloneDeep(formConfig);
  delete copyFormConfig.currentItem;
  delete copyFormConfig.activeKey;
  copyFormConfig.schemas &&
    formItemsForEach(copyFormConfig.schemas, (item) => {
      delete item.icon;
      delete item.key;
    });
  return copyFormConfig;
};

/**
 * 處理異步選項屬性，如 select treeSelect 等選項屬性如果傳遞為函數並且返回Promise對象，獲取異步返回的選項屬性
 * @param {(() => Promise<any[]>) | any[]} options
 * @return {Promise<any[]>}
 */
export const handleAsyncOptions = async (
  options: (() => Promise<any[]>) | any[],
): Promise<any[]> => {
  try {
    if (isFunction(options)) return await options();
    return options;
  } catch {
    return [];
  }
};

/**
 * 格式化表單項校驗規則配置
 * @param {IVFormComponent[]} schemas
 */
export const formatRules = (schemas: IVFormComponent[]) => {
  formItemsForEach(schemas, (item) => {
    if ('required' in item) {
      !isArray(item.rules) && (item.rules = []);
      item.rules.push({ required: true, message: item.message });
      delete item['required'];
      delete item['message'];
    }
  });
};

/**
 * 將校驗規則中的正則字符串轉換為正則對像
 * @param {IValidationRule[]} rules
 * @return {IValidationRule[]}
 */
export const strToReg = (rules: IValidationRule[]) => {
  const newRules = cloneDeep(rules);
  return newRules.map((item) => {
    if (item.pattern) item.pattern = runCode(item.pattern);
    return item;
  });
};

/**
 * 執行一段字符串代碼，並返回執行結果，如果執行出錯，則返回該參數
 * @param code
 * @return {any}
 */
export const runCode = <T>(code: any): T => {
  try {
    return new Function(`return ${code}`)();
  } catch {
    return code;
  }
};
