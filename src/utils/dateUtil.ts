/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-02-08 02:03:11
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-16 08:16:49
 */
/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss';
const DATE_FORMAT = 'YYYY/MM/DD';
const DATE_FORMAT_FOR_YM = 'YYYY/MM';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToYMDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT_FOR_YM,
): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
