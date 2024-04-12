// axios配置  可自行根據項目進行更改，只需更改該文件即可，其他文件可以不動
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios';
import { clone } from 'lodash-es';
import type { RequestOptions, Result } from '/#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { useGlobSetting } from '/@/hooks/setting';
import { useMessage } from '/@/hooks/web/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/httpEnum';
import { isString, isUnDef, isNull, isEmpty } from '/@/utils/is';
import { getToken } from '/@/utils/auth';
import { setObjToUrlParams, deepMerge } from '/@/utils';
import { useErrorLogStoreWithOut } from '/@/store/modules/errorLog';
import { useI18n } from '/@/hooks/web/useI18n';
import { joinTimestamp, formatRequestDate } from './helper';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { AxiosRetry } from '/@/utils/http/axios/axiosRetry';
import axios from 'axios';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createErrorModal, createSuccessModal } = useMessage();

/**
 * @description: 數據處理，方便區分多種處理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 處理響應數據。如果數據不是預期格式，可直接拋出錯誤
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n();
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生響應頭 比如：需要獲取響應頭時使用該屬性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不進行任何處理，直接返回
    // 用於頁面代碼可能需要直接獲取code，data，message這些信息時開啓
    if (!isTransformResponse) {
      return res.data;
    }
    // 錯誤的時候返回

    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'));
    }
    //  這裏 code，result，message為 後台統一的字段，需要在 types.ts內修改為項目自己的接口返回格式
    const { code, results, msg, status } = data;

    // 這裏邏輯可以根據項目進行修改
    // const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    const hasSuccess = data && Reflect.has(data, 'status') && (status === 1000 || status === 1001);
    if (hasSuccess) {
      let successMsg = msg;

      if (isNull(successMsg) || isUnDef(successMsg) || isEmpty(successMsg)) {
        successMsg = t(`sys.api.operationSuccess`);
      }

      if (options.successMessageMode === 'modal') {
        createSuccessModal({ title: t('sys.api.successTip'), content: successMsg });
      } else if (options.successMessageMode === 'message') {
        createMessage.success(successMsg);
      }
      return results;
    }

    // 在此處根據自己項目的實際情況對不同的code執行不同的操作
    // 如果不希望中斷當前請求，請return數據，否則直接拋出異常即可
    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t('sys.api.timeoutMessage');
        const userStore = useUserStoreWithOut();
        userStore.setToken(undefined);
        userStore.logout(true);
        break;
      default:
        if (msg) {
          timeoutMsg = msg;
        }
    }

    // errorMessageMode='modal'的時候會顯示modal錯誤彈窗，而不是消息提示，用於一些比較重要的錯誤
    // errorMessageMode='none' 一般是調用時明確表示不希望自動彈出錯誤提示
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'));
  },

  // 請求之前處理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 給 get 請求加上時間戳參數，避免從緩存中拿數據。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful風格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET請求如果沒有提供data，則將params視為data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful風格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 請求攔截器處理
   */
  requestInterceptors: (config, options) => {
    // 請求之前處理config
    const token = getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  /**
   * @description: 響應攔截器處理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 響應錯誤處理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    const { t } = useI18n();
    const errorLogStore = useErrorLogStoreWithOut();
    errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage');
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg');
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);

    // 添加自動重試機制 保險起見 只針對GET請求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合併
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        authenticationScheme: 'Bearer',
        // authenticationScheme: '',
        timeout: 10 * 1000,
        // 基礎接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 數據處理方式
        transform: clone(transform),
        // 配置項，下面的選項都可以在獨立的接口請求中覆蓋
        requestOptions: {
          // 默認將prefix 添加到url
          joinPrefix: true,
          // 是否返回原生響應頭 比如：需要獲取響應頭時使用該屬性
          isReturnNativeResponse: false,
          // 需要對返回數據進行處理
          isTransformResponse: true,
          // post請求的時候添加參數到url
          joinParamsToUrl: false,
          // 格式化提交參數時間
          formatDate: true,
          // 消息提示類型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入時間戳
          joinTime: true,
          // 忽略重複請求
          ignoreCancelToken: true,
          // 是否攜帶token
          withToken: true,
          retryRequest: {
            isOpenRetry: false,
            count: 1,
            waitTime: 3000,
          },
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
