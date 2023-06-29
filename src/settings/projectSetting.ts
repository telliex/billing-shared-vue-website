import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // (change) Whether to show the configuration button
  showSettingButton: false,

  //  (change)Whether to show the theme switch button
  showDarkModeToggle: false,

  // `Settings` button position
  // 設置按鈕位置 可選項
  // SettingButtonPositionEnum.AUTO: 自動選擇
  // SettingButtonPositionEnum.HEADER: 位於頭部
  // SettingButtonPositionEnum.FIXED: 固定在右側
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // Permission mode
  // 權限模式,默認前端角色權限模式
  // ROUTE_MAPPING: 前端模式（選單由路由生成，默認）
  // ROLE：前端模式（選單路由分開）
  permissionMode: PermissionModeEnum.BACK,

  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing
  // 會話超時處理方案
  // SessionTimeoutProcessingEnum.ROUTE_JUMP: 路由跳轉到登錄頁
  // SessionTimeoutProcessingEnum.PAGE_COVERAGE: 生成登錄彈窗，覆蓋當前頁面
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // color 項目主題色
  themeColor: primaryColor,

  // Website gray mode, open for possible mourning dates
  // 網站灰色模式
  grayMode: false,

  // Color Weakness Mode
  colorWeak: false,

  // Whether to cancel the menu, the top, the multi-tab page display, for possible embedded in other systems
  // 是否取消選單,頂部,多標簽頁顯示, 用於可能內嵌在別的系統內
  fullContent: false,

  // content mode
  contentMode: ContentEnum.FULL,

  // Whether to display the logo
  showLogo: true,

  // Whether to show footer copyright
  showFooter: false,

  // [Header] configuration
  headerSetting: {
    // header bg color
    // src\settings\designSetting.ts
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function
    //  (change)開啟鎖屏功能
    useLockPage: false,
    // Whether to show the full screen button
    //  (change)顯示全屏按鈕
    showFullScreen: false,
    // Whether to show the document button
    //  (change)顯示文檔按鈕
    showDoc: false,
    // Whether to show the notification button
    //  (change)顯示消息中心按鈕
    showNotice: false,
    // Whether to display the menu search
    //  (change)顯示選單搜索按鈕
    showSearch: false,
  },

  // [Menu] configuration
  menuSetting: {
    // sidebar menu bg color
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    //  Whether to fix the left menu
    fixed: true,
    // Menu collapse
    collapsed: false,
    // When sider hide because of the responsive layout
    siderHidden: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
    // Whether it can be dragged
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    //  (change)Menu width
    menuWidth: 250,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.SIDEBAR,
    // Menu theme
    theme: ThemeEnum.DARK,
    // Split menu
    split: false,
    // Top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.HEADER,
    // Turn on accordion mode, only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
    // Module opening method ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // Fixed expanded menu
    mixSideFixed: false,
  },

  // [Multi-label tab]
  multiTabsSetting: {
    // 刷新後是否保留已經打開的標簽頁
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
  },

  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoading
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true 是否打開頁面切換 loading
    openPageLoading: true,

    // Whether to open the top progress bar 是否打開頁面切換頂部進度條
    openNProgress: false,
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  //  (change)是否開啟 KeepAlive緩存  開發時候最好關閉,不然每次都需要清除緩存
  openKeepAlive: false,

  // Automatic screen lock time, 0 does not lock the screen. Unit minute default 0
  // 自動鎖屏時間，為0不鎖屏。 單位分鐘 默認1個小時
  lockTime: 0,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: false,

  // Use error-handler-plugin
  // 是否使用全局錯誤捕獲
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true,

  //  Is it possible to embed iframe pages
  //  是否可以嵌入iframe頁面
  canEmbedIFramePage: true,

  // Whether to delete unclosed messages and notify when switching the interface
  // 切換界面的時候是否刪除未關閉的message及notify
  closeMessageOnSwitch: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  // 切換界面的時候是否取消已經發送但是未響應的http請求。
  // 如果開啟,想對單獨接口覆蓋。可以在單獨接口設置
  removeAllHttpPending: false,
};

export default setting;
