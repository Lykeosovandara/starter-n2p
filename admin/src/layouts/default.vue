<template>
  <client-only>
    <n-config-provider :theme="darkTheme">
      <n-dialog-provider>
        <n-notification-provider>
          <n-layout>
            <app-header></app-header>
            <n-layout :has-sider="true">
              <side-menu></side-menu>
              <n-layout>
                <div class=" h-full">
                  <nuxt-page />
                </div>
              </n-layout>
            </n-layout>
          </n-layout>
        </n-notification-provider>
      </n-dialog-provider>
    </n-config-provider>
  </client-only>
</template>
  
<script setup lang="ts">
import { NLayout, NConfigProvider, darkTheme, NNotificationProvider, NDialogProvider } from "naive-ui";



onMounted(() => {

})

</script>
  
