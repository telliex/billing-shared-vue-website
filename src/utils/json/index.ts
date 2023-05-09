import axios from 'axios';
import { GetS3TargetUrl } from '/@/api/sys/system';
import { Guid } from 'js-guid';
import { createLocalStorage } from '/@/utils/cache';

const ls = createLocalStorage();

export async function getJSONURL(arr: string[]) {
  const targetObj = {};
  const promises: any[] = [];
  arr.forEach((item) => {
    promises.push(
      GetS3TargetUrl({
        trace_id: Guid.newGuid().toString(),
        bucket_region: import.meta.env.VITE_GLOB_S3_REGION,
        bucket_name: import.meta.env.VITE_GLOB_S3_JSON,
        object_key: `${item}.json`,
        duration: '10',
      }),
    );
  });

  await Promise.all(promises).then((result) => {
    arr.forEach((item, index) => {
      targetObj[item] = result[index];
    });

    ls.set('TEMP_JSON_URL_KEY__', targetObj);
  });

  return targetObj;
}

export async function getS3JSON(url: string) {
  const temp: any = await axios.get(url);
  return [...temp.data];
}
