import { Ref, SetupContext } from 'vue';
import { IVFormComponent, IFormConfig, AForm } from '../typings/v-form-component';
import { findFormItem, formItemsForEach } from '../utils';
import { cloneDeep, isFunction } from 'lodash-es';
import { IAnyObject } from '../typings/base-type';

interface IFormInstanceMethods extends AForm {
  submit: () => Promise<any>;
}

export interface IProps {
  formConfig: IFormConfig;
  formModel: IAnyObject;
}

type ISet = <T extends keyof IVFormComponent>(
  field: string,
  key: T,
  value: IVFormComponent[T],
) => void;
// 獲取當前field綁定的表單項
type IGet = (field: string) => IVFormComponent | undefined;
// 獲取field在formData中的值
type IGetValue = (field: string) => any;
// 設置field在formData中的值並且觸發校驗
type ISetValue = (field: string | IAnyObject, value?: any) => void;
// 隱藏field對應的表單項
type IHidden = (field: string) => void;
// 顯示field對應的表單項
type IShow = (field: string) => void;
// 設置field對應的表單項綁定的props屬性
type ISetProps = (field: string, key: string, value: any) => void;
// 獲取formData中的值
type IGetData = () => Promise<IAnyObject>;
// 禁用表單，如果field為空，則禁用整個表單
type IDisable = (field?: string | boolean) => void;
// 設置表單配置方法
type ISetFormConfig = (key: string, value: any) => void;
interface ILinkOn {
  [key: string]: Set<IVFormComponent>;
}

export interface IVFormMethods extends Partial<IFormInstanceMethods> {
  set: ISet;
  get: IGet;
  getValue: IGetValue;
  setValue: ISetValue;
  hidden: IHidden;
  show: IShow;
  setProps: ISetProps;
  linkOn: ILinkOn;
  getData: IGetData;
  disable: IDisable;
}
export function useVFormMethods(
  props: IProps,
  _context: Partial<SetupContext>,
  formInstance: Ref<AForm | null>,
  formInstanceMethods: Partial<IFormInstanceMethods>,
): IVFormMethods {
  /**
   * 根據field獲取表單項
   * @param {string} field
   * @return {IVFormComponent | undefined}
   */
  const get: IGet = (field) =>
    findFormItem(props.formConfig.schemas, (item) => item.field === field);

  /**
   * 根據表單field設置表單項字段值
   * @param {string} field
   * @param {keyof IVFormComponent} key
   * @param {never} value
   */
  const set: ISet = (field, key, value) => {
    const formItem = get(field);
    if (formItem) formItem[key] = value;
  };

  /**
   * 設置表單項的props
   * @param {string} field 需要設置的表單項field
   * @param {string} key 需要設置的key
   * @param value 需要設置的值
   */
  const setProps: ISetProps = (field, key, value) => {
    const formItem = get(field);
    if (formItem?.componentProps) {
      ['options', 'treeData'].includes(key) && setValue(field, undefined);

      formItem.componentProps[key] = value;
    }
  };
  /**
   * 設置字段的值，設置後觸發校驗
   * @param {string} field  需要設置的字段
   * @param value  需要設置的值
   */
  const setValue: ISetValue = (field, value) => {
    if (typeof field === 'string') {
      // props.formData[field] = value
      props.formModel[field] = value;
      formInstance.value?.validateField(field, value, []);
    } else {
      const keys = Object.keys(field);
      keys.forEach((key) => {
        props.formModel[key] = field[key];
        formInstance.value?.validateField(key, field[key], []);
      });
    }
  };
  /**
   * 設置表單配置方法
   * @param {string} key
   * @param value
   */
  const setFormConfig: ISetFormConfig = (key, value) => {
    props.formConfig[key] = value;
  };
  /**
   * 根據表單項field獲取字段值，如果field為空，則
   * @param {string} field  需要設置的字段
   */
  const getValue: IGetValue = (field) => {
    const formData = cloneDeep(props.formModel);
    return formData[field];
  };

  /**
   * 獲取formData中的值
   * @return {Promise<IAnyObject<any>>}
   */
  const getData: IGetData = async () => {
    return cloneDeep(props.formModel);
  };
  /**
   * 隱藏指定表單項
   * @param {string} field 需要隱藏的表單項的field
   */
  const hidden: IHidden = (field) => {
    set(field, 'hidden', true);
  };

  /**
   * 禁用表單
   * @param {string | undefined} field
   */
  const disable: IDisable = (field) => {
    typeof field === 'string'
      ? setProps(field, 'disabled', true)
      : setFormConfig('disabled', field !== false);
  };

  /**
   * 顯示表單項
   * @param {string} field 需要顯示的表單項的field
   */
  const show: IShow = (field) => {
    set(field, 'hidden', false);
  };

  /**
   * 監聽表單字段聯動時觸發
   * @type {ILinkOn}
   */
  const linkOn: ILinkOn = {};
  const initLink = (schemas: IVFormComponent[]) => {
    // 首次遍歷，查找需要關聯字段的表單
    formItemsForEach(schemas, (formItem) => {
      // 如果需要關聯，則進行第二層遍歷，查找表單中關聯的字段，存到Set中
      formItemsForEach(schemas, (item) => {
        if (!linkOn[item.field!]) linkOn[item.field!] = new Set<IVFormComponent>();
        if (formItem.link?.includes(item.field!) && isFunction(formItem.update)) {
          linkOn[item.field!].add(formItem);
        }
      });
      linkOn[formItem.field!].add(formItem);
    });
  };
  initLink(props.formConfig.schemas);

  return {
    linkOn,
    setValue,
    getValue,
    hidden,
    show,
    set,
    get,
    setProps,
    getData,
    disable,
    ...formInstanceMethods,
  };
}
