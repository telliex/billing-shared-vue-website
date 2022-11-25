<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 03:20:02
-->
<template>
  <div
    :class="prefixCls"
    class="flex items-center mx-auto"
    v-if="imgList && imgList.length"
    :style="getWrapStyle"
  >
    <Badge :count="!showBadge || imgList.length == 1 ? 0 : imgList.length" v-if="simpleShow">
      <div class="img-div">
        <PreviewGroup>
          <template v-for="(img, index) in imgList" :key="img">
            <Image
              :width="size"
              :style="{
                display: index === 0 ? '' : 'none !important',
              }"
              :src="srcPrefix + img"
            />
          </template>
        </PreviewGroup>
      </div>
    </Badge>
    <PreviewGroup v-else>
      <template v-for="(img, index) in imgList" :key="img">
        <Image
          :width="size"
          :style="{ marginLeft: index === 0 ? 0 : margin }"
          :src="srcPrefix + img"
        />
      </template>
    </PreviewGroup>
  </div>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue';
  import { defineComponent, computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Image, Badge } from 'ant-design-vue';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'TableImage',
    components: { Image, PreviewGroup: Image.PreviewGroup, Badge },
    props: {
      imgList: propTypes.arrayOf(propTypes.string),
      size: propTypes.number.def(40),
      // 是否簡單顯示（只顯示第一張圖片）
      simpleShow: propTypes.bool,
      // 簡單模式下是否顯示圖片數量的badge
      showBadge: propTypes.bool.def(true),
      // 圖片間距
      margin: propTypes.number.def(4),
      // src前綴，將會附加在imgList中每一項之前
      srcPrefix: propTypes.string.def(''),
    },
    setup(props) {
      const getWrapStyle = computed((): CSSProperties => {
        const { size } = props;
        const s = `${size}px`;
        return { height: s, width: s };
      });

      const { prefixCls } = useDesign('basic-table-img');
      return { prefixCls, getWrapStyle };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-table-img';

  .@{prefix-cls} {
    .ant-image {
      margin-right: 4px;
      cursor: zoom-in;

      img {
        border-radius: 2px;
      }
    }

    .img-div {
      display: inline-grid;
    }
  }
</style>
