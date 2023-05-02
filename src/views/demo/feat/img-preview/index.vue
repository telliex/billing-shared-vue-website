<template>
  <PageWrapper title="圖片預覽示例">
    <ImagePreview :imageList="imgList" />
    <a-button @click="openImg" type="primary">無預覽圖</a-button>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { PageWrapper } from '/@/components/Page';
  // import { PreviewActions } from '/@/components/Preview/src/typing';

  const imgList: string[] = [
    'https://picsum.photos/id/66/346/216',
    'https://picsum.photos/id/67/346/216',
    'https://picsum.photos/id/68/346/216',
  ];
  export default defineComponent({
    components: { PageWrapper, ImagePreview },
    setup() {
      function openImg() {
        const onImgLoad = ({ index, url, dom }) => {
          console.log(`第${index + 1}張圖片已加載，URL為：${url}`, dom);
        };
        // 可以使用createImgPreview返回的 PreviewActions 來控制預覽邏輯，實現類似幻燈片、自動旋轉之類的騷操作
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true, onImgLoad });
      }
      return { imgList, openImg };
    },
  });
</script>
