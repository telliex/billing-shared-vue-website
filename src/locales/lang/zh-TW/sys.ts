/*
 * @Description:S
 * @Anthor: Telliex
 * @Date: 2022-10-03 02:49:24
 * @LastEditors: Telliex
 * @LastEditTime: 2023-04-26 05:36:28
 */
export default {
  api: {
    operationFailed: '操作失敗',
    errorTip: '錯誤提示',
    errorMessage: '操作失敗,系統異常!',
    timeoutMessage: '登錄超時,請重新登錄!',
    apiTimeoutMessage: '接口請求超時,請刷新頁面重試!',
    apiRequestFailed: '請求出錯，請稍候重試',
    networkException: '網絡異常',
    networkExceptionMsg: '網絡異常，請檢查您的網絡連接是否正常!',

    errMsg401: '用戶沒有權限（令牌、用戶名、密碼錯誤）!',
    errMsg403: '用戶得到授權，但是訪問是被禁止的。!',
    errMsg404: '網絡請求錯誤,未找到該資源!',
    errMsg405: '網絡請求錯誤,請求方法未允許!',
    errMsg408: '網絡請求超時!',
    errMsg500: '服務器錯誤,請聯系管理員!',
    errMsg501: '網絡未實現!',
    errMsg502: '網絡錯誤!',
    errMsg503: '服務不可用，服務器暫時過載或維護!',
    errMsg504: '網絡超時!',
    errMsg505: 'http版本不支持該請求!',
  },
  app: { logoutTip: '溫馨提醒', logoutMessage: '是否確認退出系統?', menuLoading: '菜單加載中...' },
  errorLog: {
    tableTitle: '錯誤日志列表',
    tableColumnType: '類型',
    tableColumnDate: '時間',
    tableColumnFile: '文件',
    tableColumnMsg: '錯誤信息',
    tableColumnStackMsg: 'stack信息',

    tableActionDesc: '詳情',

    modalTitle: '錯誤詳情',

    fireVueError: '點擊觸發vue錯誤',
    fireResourceError: '點擊觸發資源加載錯誤',
    fireAjaxError: '點擊觸發ajax錯誤',

    enableMessage: '只在`/src/settings/projectSetting.ts` 內的useErrorHandle=true時生效.',
  },
  exception: {
    backLogin: '返回登錄',
    backHome: '返回首頁',
    subTitle403: '抱歉，您無權訪問此頁面。',
    subTitle404: '抱歉，您訪問的頁面不存在。',
    subTitle500: '抱歉，服務器報告錯誤。',
    noDataTitle: '當前頁無數據',
    networkErrorTitle: '網絡錯誤',
    networkErrorSubTitle: '抱歉，您的網絡連接已斷開，請檢查您的網絡！',
  },
  lock: {
    unlock: '點擊解鎖',
    alert: '鎖屏密碼錯誤',
    backToLogin: '返回登錄',
    entry: '進入系統',
    placeholder: '請輸入鎖屏密碼或者用戶密碼',
  },
  login: {
    backSignIn: '返回',
    signInFormTitle: '登錄',
    mobileSignInFormTitle: '手機登錄',
    qrSignInFormTitle: '二維碼登錄',
    signUpFormTitle: '注冊',
    forgetFormTitle: '重置密碼',

    signInTitle: '雲端報表管理系統',
    signInDesc: '登入開始使用！',
    policy: '我同意xxx隱私政策',
    scanSign: `掃碼後點擊"確認"，即可完成登錄`,

    loginButton: '登錄',
    registerButton: '注冊',
    rememberMe: '記住我',
    forgetPassword: '忘記密碼?',
    otherSignIn: '其他登錄方式',

    // notify
    loginSuccessTitle: '登錄成功',
    loginSuccessDesc: '歡迎回來',

    // placeholder
    accountPlaceholder: '請輸入帳號',
    passwordPlaceholder: '請輸入密碼',
    smsPlaceholder: '請輸入驗證碼',
    mobilePlaceholder: '請輸入手機號碼',
    policyPlaceholder: '勾選後才能注冊',
    diffPwd: '兩次輸入密碼不一致',

    company: '公司',
    userName: '帳號',
    password: '密碼',
    confirmPassword: '確認密碼',
    email: '郵箱',
    smsCode: '短信驗證碼',
    mobile: '手機號碼',
  },
};
