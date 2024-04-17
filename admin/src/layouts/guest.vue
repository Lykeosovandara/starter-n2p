<template>
  <n-notification-provider>
    <nuxt-page />
  </n-notification-provider>
</template>
  
<script setup lang="ts">


import {  NNotificationProvider } from "naive-ui";


const store = useAuthStore()


onMounted(async () => {
  await store.initToken();
  await navigateTo("/");

})

</script>
  