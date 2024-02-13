// useIdleLogout.js
import { onMounted, onUnmounted } from 'vue';
// import { useRouter } from 'vue-router';
import { useUserStore } from '/@/store/modules/user';

import { createLocalStorage } from '/@/utils/cache';

const ls = createLocalStorage();

const IDLE_TIMEOUT = 0.1 * 60 * 60 * 1000; // 3小时转换为毫秒
const JWT_TIMEOUT = 24 * 60 * 60 * 1000; // 24小时转换为毫秒
const JWT_REFRESH_TIMEOUT = 30 * 60 * 1000; // 30分钟转换为毫秒
let getJWTStatus = false;

export function useIdleLogout() {
  // const router = useRouter();

  const userStore = useUserStore();
  let timeoutId;

  function logoutUser() {
    userStore.logout(true); // 假设你有一个 Vuex action 来处理登出
    // router.push('/login'); // 重定向到登录页面

    localStorage.removeItem('lastActivity');
  }

  function updateUserLastActivity() {
    const now = new Date().getTime();
    localStorage.setItem('lastActivity', now.toString());
  }

  function checkIdleTime() {
    const now = new Date().getTime();
    const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
    const idleTime = now - lastActivity;

    if (idleTime > IDLE_TIMEOUT) {
      logoutUser();
    } else {
      const remainingTime = IDLE_TIMEOUT - idleTime;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logoutUser, remainingTime);
    }
  }

  async function checkJWTTime() {
    if (ls.get('TEMP_USER_ID_KEY__')) {
      const now = new Date().getTime();
      // const lastActivity = ls.get('USER_TOKEN_OBJECT_KEY__').exp;
      const lastJWTActivity = ls.get('USER_TOKEN_OBJECT_KEY__').time;

      const idleTime = now - lastJWTActivity;

      if (idleTime > JWT_TIMEOUT) {
        logoutUser();
      } else {
        if (!getJWTStatus && idleTime >= JWT_REFRESH_TIMEOUT) {
          //刷新token
          getJWTStatus = true;
          console.log('刷新token');
          userStore.refreshToken();
          setTimeout(() => {
            getJWTStatus = false;
          }, 3000);
        }
      }
    }
  }

  function resetIdleTimer() {
    if (ls.get('TEMP_USER_ID_KEY__')) {
      clearTimeout(timeoutId);
      updateUserLastActivity();
      timeoutId = setTimeout(logoutUser, IDLE_TIMEOUT);
    }
  }

  onMounted(() => {
    window.addEventListener('load', checkIdleTime);
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keydown', resetIdleTimer);
    document.addEventListener('scroll', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
    document.addEventListener('mousemove', checkJWTTime);
    // document.addEventListener('keydown', checkJWTTime);
    // document.addEventListener('scroll', checkJWTTime);
    // document.addEventListener('click', checkJWTTime);
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);

    document.removeEventListener('mousemove', resetIdleTimer);
    document.removeEventListener('keydown', resetIdleTimer);
    document.removeEventListener('scroll', resetIdleTimer);
    document.removeEventListener('click', resetIdleTimer);
    document.removeEventListener('mousemove', checkJWTTime);
    // document.removeEventListener('keydown', checkJWTTime);
    // document.removeEventListener('scroll', checkJWTTime);
    // document.removeEventListener('click', checkJWTTime);
  });

  return {
    checkJWTTime,
    checkIdleTime,
  };
}
