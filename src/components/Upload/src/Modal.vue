<template>
  <BasicModal v-bind="$attrs" title="File Columns Check" :helpMessage="[]" width="700px">
    <p class="h-20" v-for="index in 20" :key="index"></p>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  export default defineComponent({
    components: { BasicModal },
    props: {
      userData: { type: Object },
    },
    setup() {
      return {};
    },
  });
</script>
