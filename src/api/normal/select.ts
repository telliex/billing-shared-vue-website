import { defHttp } from '/@/utils/http/axios';
import { DropDownOptionsItem, selectParams } from './model/optionsModel';
enum Api {
  DROP_DOWN_OPTIONS_LIST = '/select/getDropDownOptions',
}

/**
 * @description: Get sample options value
 */
export const countryOptionsListApi = (params?: selectParams) => {
  return defHttp.get<DropDownOptionsItem[]>({
    url: Api.DROP_DOWN_OPTIONS_LIST,
    params,
    transformResponse: [
      function (data) {
        const resObj = JSON.parse(data);
        return resObj;
      },
    ],
  });
};
