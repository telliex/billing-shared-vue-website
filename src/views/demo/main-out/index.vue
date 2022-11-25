<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:43:43
-->
<template>
  <div class="fixed h-full w-full flex flex-col justify-center items-center text-4xl">
    <div class="">位於主框架外的頁面</div>
    <a-button @click="$router.go(-1)" class="mt-10" type="primary">Back</a-button>
  </div>
</template>
