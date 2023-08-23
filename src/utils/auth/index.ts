import { Persistent, BasicKeys } from '/@/utils/cache/persistent';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { TOKEN_KEY } from '/@/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}

export async function stringToHSA265(password: string) {
  const passwordBuffer = new TextEncoder().encode(password);
  const passwordHashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
  const passwordHashArray = Array.from(new Uint8Array(passwordHashBuffer));
  const passwordHashHex = passwordHashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return passwordHashHex;
}

export function isSHA256Format(input) {
  const sha256Regex = /^[0-9a-fA-F]{64}$/;
  return sha256Regex.test(input);
}
