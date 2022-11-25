import { ComputedRef, isRef, nextTick, Ref, ref, unref, watch } from 'vue';
import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
import { useLayoutHeight } from '/@/layouts/default/content/useContentViewHeight';
import { getViewportOffset } from '/@/utils/domUtils';
import { isNumber, isString } from '/@/utils/is';

export interface CompensationHeight {
  // 使用 layout Footer 高度作為判斷補償高度的條件
  useLayoutFooter: boolean;
  // refs HTMLElement
  elements?: Ref[];
}

type Upward = number | string | null | undefined;

/**
 * 動態計算內容高度，根據錨點dom最下座標到屏幕最下座標，根據傳入dom的高度、padding、margin等值進行動態計算
 * 最終獲取合適的內容高度
 *
 * @param flag 用於開啓計算的響應式標識
 * @param anchorRef 錨點組件 Ref<ElRef | ComponentRef>
 * @param subtractHeightRefs 待減去高度的組件列表 Ref<ElRef | ComponentRef>
 * @param substractSpaceRefs 待減去空閒空間(margins/paddings)的組件列表 Ref<ElRef | ComponentRef>
 * @param offsetHeightRef 計算偏移的響應式高度，計算高度時將直接減去此值
 * @param upwardSpace 向上遞歸減去空閒空間的 層級 或 直到指定class為止 數值為2代表向上遞歸兩次|數值為ant-layout表示向上遞歸直到碰見.ant-layout為止
 * @returns 響應式高度
 */
export function useContentHeight(
  flag: ComputedRef<Boolean>,
  anchorRef: Ref,
  subtractHeightRefs: Ref[],
  substractSpaceRefs: Ref[],
  upwardSpace: Ref<Upward> | ComputedRef<Upward> | Upward = 0,
  offsetHeightRef: Ref<number> = ref(0),
) {
  const contentHeight: Ref<Nullable<number>> = ref(null);
  const { footerHeightRef: layoutFooterHeightRef } = useLayoutHeight();
  let compensationHeight: CompensationHeight = {
    useLayoutFooter: true,
  };

  const setCompensation = (params: CompensationHeight) => {
    compensationHeight = params;
  };

  function redoHeight() {
    nextTick(() => {
      calcContentHeight();
    });
  }

  function calcSubtractSpace(
    element: Element | null | undefined,
    direction: 'all' | 'top' | 'bottom' = 'all',
  ): number {
    function numberPx(px: string) {
      return Number(px.replace(/[^\d]/g, ''));
    }
    let subtractHeight = 0;
    const ZERO_PX = '0px';
    if (element) {
      const cssStyle = getComputedStyle(element);
      const marginTop = numberPx(cssStyle?.marginTop ?? ZERO_PX);
      const marginBottom = numberPx(cssStyle?.marginBottom ?? ZERO_PX);
      const paddingTop = numberPx(cssStyle?.paddingTop ?? ZERO_PX);
      const paddingBottom = numberPx(cssStyle?.paddingBottom ?? ZERO_PX);
      if (direction === 'all') {
        subtractHeight += marginTop;
        subtractHeight += marginBottom;
        subtractHeight += paddingTop;
        subtractHeight += paddingBottom;
      } else if (direction === 'top') {
        subtractHeight += marginTop;
        subtractHeight += paddingTop;
      } else {
        subtractHeight += marginBottom;
        subtractHeight += paddingBottom;
      }
    }
    return subtractHeight;
  }

  function getEl(element: any): Nullable<HTMLDivElement> {
    if (element == null) {
      return null;
    }
    return (element instanceof HTMLDivElement ? element : element.$el) as HTMLDivElement;
  }

  async function calcContentHeight() {
    if (!flag.value) {
      return;
    }
    // Add a delay to get the correct height
    await nextTick();

    const anchorEl = getEl(unref(anchorRef));
    if (!anchorEl) {
      return;
    }
    const { bottomIncludeBody } = getViewportOffset(anchorEl);

    // substract elements height
    let substractHeight = 0;
    subtractHeightRefs.forEach((item) => {
      substractHeight += getEl(unref(item))?.offsetHeight ?? 0;
    });

    // subtract margins / paddings
    let substractSpaceHeight = calcSubtractSpace(anchorEl) ?? 0;
    substractSpaceRefs.forEach((item) => {
      substractSpaceHeight += calcSubtractSpace(getEl(unref(item)));
    });

    // upwardSpace
    let upwardSpaceHeight = 0;
    function upward(element: Element | null, upwardLvlOrClass: number | string | null | undefined) {
      if (element && upwardLvlOrClass) {
        const parent = element.parentElement;
        if (parent) {
          if (isString(upwardLvlOrClass)) {
            if (!parent.classList.contains(upwardLvlOrClass)) {
              upwardSpaceHeight += calcSubtractSpace(parent, 'bottom');
              upward(parent, upwardLvlOrClass);
            } else {
              upwardSpaceHeight += calcSubtractSpace(parent, 'bottom');
            }
          } else if (isNumber(upwardLvlOrClass)) {
            if (upwardLvlOrClass > 0) {
              upwardSpaceHeight += calcSubtractSpace(parent, 'bottom');
              upward(parent, --upwardLvlOrClass);
            }
          }
        }
      }
    }
    if (isRef(upwardSpace)) {
      upward(anchorEl, unref(upwardSpace));
    } else {
      upward(anchorEl, upwardSpace);
    }

    let height =
      bottomIncludeBody -
      unref(layoutFooterHeightRef) -
      unref(offsetHeightRef) -
      substractHeight -
      substractSpaceHeight -
      upwardSpaceHeight;

    // compensation height
    const calcCompensationHeight = () => {
      compensationHeight.elements?.forEach((item) => {
        height += getEl(unref(item))?.offsetHeight ?? 0;
      });
    };
    if (compensationHeight.useLayoutFooter && unref(layoutFooterHeightRef) > 0) {
      calcCompensationHeight();
    } else {
      calcCompensationHeight();
    }

    contentHeight.value = height;
  }

  onMountedOrActivated(() => {
    nextTick(() => {
      calcContentHeight();
    });
  });
  useWindowSizeFn(
    () => {
      calcContentHeight();
    },
    50,
    { immediate: true },
  );
  watch(
    () => [layoutFooterHeightRef.value],
    () => {
      calcContentHeight();
    },
    {
      flush: 'post',
      immediate: true,
    },
  );

  return { redoHeight, setCompensation, contentHeight };
}
