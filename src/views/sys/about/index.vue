<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2023-03-16 16:11:53
 * @LastEditors: Telliex
 * @LastEditTime: 2023-05-02 01:34:59
-->
<template>
  <PageWrapper title="About">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1"> MARS ...... </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <!-- <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { GITHUB_URL, SITE_URL, DOC_URL } from '/@/settings/siteSetting';

  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  // const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: 'Version',
      field: 'version',
      render: commonTagRender('blue'),
    },
    {
      label: 'Last Update Date',
      field: 'lastBuildTime',
      render: commonTagRender('blue'),
    },
    // {
    //   label: '文檔地址',
    //   field: 'doc',
    //   render: commonLinkRender('文檔地址'),
    // },
    // {
    //   label: '預覽地址',
    //   field: 'preview',
    //   render: commonLinkRender('預覽地址'),
    // },
    // {
    //   label: 'Github',
    //   field: 'github',
    //   render: commonLinkRender('Github'),
    // },
  ];

  const infoData = {
    version,
    lastBuildTime,
    doc: DOC_URL,
    preview: SITE_URL,
    github: GITHUB_URL,
  };

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  // const [register] = useDescription({
  //   title: '生產環境依賴',
  //   data: dependencies,
  //   schema: schema,
  //   column: 3,
  // });

  // const [registerDev] = useDescription({
  //   title: '開發環境依賴',
  //   data: devDependencies,
  //   schema: devSchema,
  //   column: 3,
  // });

  const [infoRegister] = useDescription({
    title: 'Information',
    data: infoData,
    schema: infoSchema,
    column: 2,
  });
</script>
