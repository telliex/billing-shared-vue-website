<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="File Columns Check"
    width="400px"
    :canFullscreen="false"
    :showOkBtn="false"
    :showCancelBtn="true"
    okType="default"
    @visible-change="handleVisibleChange"
    :closeFunc="closeFunc"
  >
    <div class="p-5">
      <h3>Please check :</h3>
      <ul class="pl-5">
        <li class="h-8" v-for="item in modelRef" :key="item">{{ item }}</li>
      </ul>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicModal },
    props: {
      userData: { type: Object },
    },

    setup(props, { emit }) {
      const modelRef = ref({});
      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        modelRef.value = { ...data.columns };
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }
      async function closeFunc() {
        console.log('closeFunc');
        emit('close');
        return true;
      }
      return { register, modelRef, handleVisibleChange, closeFunc };
    },
  });
</script>
