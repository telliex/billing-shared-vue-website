/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 03:12:34
 */
/**
 * 獲取主題類型 深色淺色模式 對應的值
 * @param darkModeVal 深色模式值
 * @param themeMode 主題類型——外觀(默認), 內容, 代碼塊
 */
export const getTheme = (
  darkModeVal: 'light' | 'dark' | string,
  themeMode: 'default' | 'content' | 'code' = 'default',
) => {
  const isDark = darkModeVal === 'dark';
  switch (themeMode) {
    case 'default':
      return isDark ? 'dark' : 'classic';
    case 'content':
      return isDark ? 'dark' : 'light';
    case 'code':
      return isDark ? 'dracula' : 'github';
  }
};
