/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 03:21:46
 */
import type { Component } from 'vue';
import {
  Input,
  Select,
  Checkbox,
  InputNumber,
  Switch,
  DatePicker,
  TimePicker,
  AutoComplete,
} from 'ant-design-vue';
import type { ComponentType } from './types/componentType';
import { ApiSelect, ApiTreeSelect } from '/@/components/Form';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', Input);
componentMap.set('InputNumber', InputNumber);
componentMap.set('Select', Select);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('AutoComplete', AutoComplete);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('Switch', Switch);
componentMap.set('Checkbox', Checkbox);
componentMap.set('DatePicker', DatePicker);
componentMap.set('TimePicker', TimePicker);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
