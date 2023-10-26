import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { Guid } from 'js-guid';
const { uploadUrl = '' } = useGlobSetting();

enum Api {
  GetUploadFileToS3Value = '/UploadFileToS3',
}
const version = '/v1.0';

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

export const upLoad2S3 = (body: any) =>
  defHttp.post(
    {
      url: '/aws' + version + Api.GetUploadFileToS3Value,
      data: body,
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('resObj7777777', resObj);

          if (resObj.status === 1000 || resObj.status === 1001) {
            return {
              trace_id: Guid.newGuid().toString(),
              total_pages: 0,
              current_page: 0,
              results: [resObj.results],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          } else {
            return {
              trace_id: Guid.newGuid().toString(),
              total_pages: 0,
              current_page: 0,
              results: [],
              status: 9999,
              msg: 'No data !!',
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/elu-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
