/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:48:43
 */
export const cardList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 6; i++) {
    result.push({
      id: i,
      title: 'Data Platform Admin',
      description: '基於Vue Next, TypeScript, Ant Design Vue實現的一套完整的企業級後台管理系統',
      datetime: '2020-11-26 17:39',
      extra: '編輯',
      icon: 'logos:vue',
      color: '#1890ff',
      author: 'ECV',
      percent: 20 * (i + 1),
    });
  }
  return result;
})();
