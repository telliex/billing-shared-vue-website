import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import '/@/design/index.less';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';

import { isDevMode } from './utils/env';

if (isDevMode()) {
  import('ant-design-vue/es/style');
}

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  // 配置 store
  setupStore(app);

  // Initialize internal system configuration
  // 初始化內部系統配置
  initAppConfigStore();

  // Register global components
  // 注冊全局組件
  registerGlobComp(app);

  // Multilingual configuration
  // 多語言配置
  // Asynchronous case: language files may be obtained from the server side
  // 異步案例：語言文件可能從服務器端獲取
  await setupI18n(app);

  // Configure routing
  // 配置路由
  setupRouter(app);

  // router-guard
  // 路由守衛
  setupRouterGuard(router);

  // Register global directive
  // 注冊全局指令
  setupGlobDirectives(app);

  // Configure global error handling
  // 配置全局錯誤處理
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
