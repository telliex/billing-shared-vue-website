/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-06-19 02:36:45
 * @LastEditors: Telliex
 * @LastEditTime: 2023-06-19 02:36:53
 */
export interface NavListItem {
  id: string;
  type: string;
  menuName: string;
  description: string;
  permission: string;
  component: string;
  componentName: string;
  routPath: string;
  orderNo: number;
  icon: string;
  parentMenu: string;
  iExt: number;
  isCache: number;
  isShow: number;
  status: number;
  addMaster: number;
  addTime: string;
  changeMaster: number;
  changeTime: string;
}
