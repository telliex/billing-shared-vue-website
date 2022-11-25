<template>
  <PageWrapper title="modal組件使用示例">
    <Alert
      message="使用 useModal 進行彈窗操作，默認可以拖動，可以通過 draggable
    參數進行控制是否可以拖動/全屏，並演示了在Modal內動態加載內容並自動調整高度"
      show-icon
    />
    <a-button type="primary" class="my-4" @click="openModalLoading">
      打開彈窗,加載動態數據並自動調整高度(默認可以拖動/全屏)
    </a-button>

    <Alert message="內外同時同時顯示隱藏" show-icon />
    <a-button type="primary" class="my-4" @click="openModal2"> 打開彈窗 </a-button>
    <Alert message="自適應高度" show-icon />
    <a-button type="primary" class="my-4" @click="openModal3"> 打開彈窗 </a-button>

    <Alert message="內外數據交互" show-icon />
    <a-button type="primary" class="my-4" @click="send"> 打開彈窗並傳遞數據 </a-button>

    <Alert message="使用動態組件的方式在頁面內使用多個彈窗" show-icon />
    <a-space>
      <a-button type="primary" class="my-4" @click="openTargetModal(1)"> 打開彈窗1 </a-button>
      <a-button type="primary" class="my-4" @click="openTargetModal(2)"> 打開彈窗2 </a-button>
      <a-button type="primary" class="my-4" @click="openTargetModal(3)"> 打開彈窗3 </a-button>
      <a-button type="primary" class="my-4" @click="openTargetModal(4)"> 打開彈窗4 </a-button>
    </a-space>

    <component :is="currentModal" v-model:visible="modalVisible" :userData="userData" />

    <Modal1 @register="register1" :minHeight="100" />
    <Modal2 @register="register2" />
    <Modal3 @register="register3" />
    <Modal4 @register="register4" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, shallowRef, ComponentOptions, ref, nextTick } from 'vue';
  import { Alert, Space } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import Modal1 from './Modal1.vue';
  import Modal2 from './Modal2.vue';
  import Modal3 from './Modal3.vue';
  import Modal4 from './Modal4.vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { Alert, Modal1, Modal2, Modal3, Modal4, PageWrapper, ASpace: Space },
    setup() {
      const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
      const [register1, { openModal: openModal1 }] = useModal();
      const [register2, { openModal: openModal2 }] = useModal();
      const [register3, { openModal: openModal3 }] = useModal();
      const [register4, { openModal: openModal4 }] = useModal();
      const modalVisible = ref<Boolean>(false);
      const userData = ref<any>(null);

      function send() {
        openModal4(true, {
          data: 'content',
          info: 'Info',
        });
      }
      function openModalLoading() {
        openModal1(true);
        // setModalProps({ loading: true });
        // setTimeout(() => {
        //   setModalProps({ loading: false });
        // }, 2000);
      }

      function openTargetModal(index) {
        switch (index) {
          case 1:
            currentModal.value = Modal1;
            break;
          case 2:
            currentModal.value = Modal2;
            break;
          case 3:
            currentModal.value = Modal3;
            break;
          default:
            currentModal.value = Modal4;
            break;
        }
        nextTick(() => {
          // `useModal` not working with dynamic component
          // passing data through `userData` prop
          userData.value = { data: Math.random(), info: 'Info222' };
          // open the target modal
          modalVisible.value = true;
        });
      }

      return {
        register1,
        openModal1,
        register2,
        openModal2,
        register3,
        openModal3,
        register4,
        openModal4,
        modalVisible,
        userData,
        openTargetModal,
        send,
        currentModal,
        openModalLoading,
      };
    },
  });
</script>
