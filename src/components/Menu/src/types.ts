/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 03:13:44
 */
// import { ComputedRef } from 'vue';
// import { ThemeEnum } from '/@/enums/appEnum';
// import { MenuModeEnum } from '/@/enums/menuEnum';
export interface MenuState {
  // 默認選中的列表
  defaultSelectedKeys: string[];

  // 模式
  // mode: MenuModeEnum;

  // // 主題
  // theme: ComputedRef<ThemeEnum> | ThemeEnum;

  // 縮進
  inlineIndent?: number;

  // 展開數組
  openKeys: string[];

  // 當前選中的菜單項 key 數組
  selectedKeys: string[];

  // 收縮狀態下展開的數組
  collapsedOpenKeys: string[];
}
