<script lang="tsx">
  import type { PropType, CSSProperties } from 'vue';
  // import { Icon } from '/@/components/Icon';
  import { computed, defineComponent, unref, toRef, onMounted, onUnmounted, ref } from 'vue';
  import { BasicMenu } from '/@/components/Menu';
  import { SimpleMenu } from '/@/components/SimpleMenu';
  import { AppLogo } from '/@/components/Application';

  import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { ScrollContainer } from '/@/components/Container';
  import { Icon } from '/@/components/Icon';
  import { useGo } from '/@/hooks/web/usePage';
  import { useSplitMenu } from './useLayoutMenu';
  import { openWindow } from '/@/utils';
  import { propTypes } from '/@/utils/propTypes';
  import { isUrl } from '/@/utils/is';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      theme: propTypes.oneOf(['light', 'dark']),

      splitType: {
        type: Number as PropType<MenuSplitTyeEnum>,
        default: MenuSplitTyeEnum.NONE,
      },

      isHorizontal: propTypes.bool,
      // menu Mode
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: '',
      },
    },
    setup(props) {
      const go = useGo();
      const ctrlPressed = ref(false);
      const system = import.meta.env.VITE_GLOB_APP_TITLE;
      const {
        getMenuMode,
        getMenuType,
        getMenuTheme,
        getCollapsed,
        getCollapsedShowTitle,
        getAccordion,
        getIsHorizontal,
        getIsSidebarType,
        getSplit,
      } = useMenuSetting();
      const { getShowLogo } = useRootSetting();

      const { prefixCls } = useDesign('layout-menu');

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

      const { getIsMobile } = useAppInject();

      const getComputedMenuMode = computed(() =>
        unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode),
      );

      const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType));

      const getUseScroll = computed(() => {
        return (
          !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) ||
            props.splitType === MenuSplitTyeEnum.LEFT ||
            props.splitType === MenuSplitTyeEnum.NONE)
        );
      });

      const getWrapperStyle = computed((): CSSProperties => {
        return {
          height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})`,
        };
      });

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`,
          unref(getComputedMenuTheme),
          {
            [`${prefixCls}--mobile`]: unref(getIsMobile),
          },
        ];
      });

      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          theme: unref(getComputedMenuTheme),
          accordion: unref(getAccordion),
          collapse: unref(getCollapsed),
          collapsedShowTitle: unref(getCollapsedShowTitle),
          onMenuClick: handleMenuClick,
        };
      });
      /**
       * click menu
       * @param menu
       */

      // [Ctrl + click] to open in a new tab
      function handleKeyDown() {
        if (!ctrlPressed.value) {
          ctrlPressed.value = true;
        }
      }

      // [Ctrl + click] to open in a new tab
      function handleKeyUp() {
        if (ctrlPressed.value) {
          ctrlPressed.value = false;
        }
      }
      function gotoMGT() {
        window.location.href = import.meta.env.VITE_GLOB_OLD_MGT_URL;
      }

      function handleMenuClick(path: string) {
        // click menu item with ctrl button will open in a new tab
        if (ctrlPressed.value) {
          window.open('/#' + path, '_blank');
          return;
        }
        go(path);
      }

      /**
       * before click menu
       * @param menu
       */
      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) {
          return true;
        }
        openWindow(path);
        return false;
      }

      function renderHeader() {
        if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null;

        return (
          <AppLogo
            showTitle={!unref(getCollapsed)}
            class={unref(getLogoClass)}
            theme={unref(getComputedMenuTheme)}
          />
        );
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps);
        // const showString = `display:${unref(getCollapsed) ? 'none' : 'inline-block'}`;
        if (!menus || !menus.length) return null;
        return !props.isHorizontal ? (
          <div>
            {system === 'CBMS' && (
              <a-button type="text" style="color:#fff" onclick={gotoMGT}>
                <Icon icon="ion:arrow-undo-sharp" />
                MGT
              </a-button>
            )}
            <SimpleMenu {...menuProps} isSplitMenu={unref(getSplit)} items={menus} />
          </div>
        ) : (
          <BasicMenu
            {...(menuProps as any)}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            showLogo={unref(getIsShowLogo)}
            mode={unref(getComputedMenuMode as any)}
            items={menus}
          />
        );
      }
      // [Ctrl + click] to open in a new tab
      onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
      });
      // [Ctrl + click] to open in a new tab
      onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      });

      return () => {
        return (
          <>
            {renderHeader()}
            {unref(getUseScroll) ? (
              <ScrollContainer style={unref(getWrapperStyle)}>{() => renderMenu()}</ScrollContainer>
            ) : (
              renderMenu()
            )}
          </>
        );
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    &-logo {
      height: @header-height;
      padding: 10px 4px 10px 10px;

      img {
        width: @logo-width;
        height: @logo-height;
      }
    }

    &--mobile {
      .@{logo-prefix-cls} {
        &__title {
          opacity: 100%;
        }
      }
    }
  }
</style>
