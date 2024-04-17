<template>
  <div class="h-screen p-10">
    <div class="flex flex-col justify-center items-center">


      <n-avatar round :size="96" :src="profileValue.profilePicture" />

      <n-upload :headers="{
        'Authorization': 'Bearer ' + authStore.token,
      }" :action="config.public.apiUrl + '/api/upload'" :data="{ 'name': 'file' }" @finish="handleFinish" :show-remove-button="false" :show-file-list="false" class="flex flex-col items-center p-4"><n-button
          strong secondary type="default" >
          {{ $i18n.t('upload') }}
        </n-button> </n-upload>

      <n-button strong secondary type="error" :on-click="authStore.logout">
        {{ $i18n.t('logout') }}
      </n-button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
const authStore = useAuthStore();
const config = useRuntimeConfig();

definePageMeta({
  middleware: 'auth'
})

import {
  NButton,
  NAvatar,
  NUpload,
  type UploadFileInfo,
  useNotification
} from "naive-ui";
import type { FileUpload } from "~/models/upload";
import { useProfileStore } from "~/stores";
const { $i18n } = useNuxtApp();
const profileStore = useProfileStore();
const profileValue = computed(() => profileStore.profile)
onMounted(() => {
  profileStore.fetchMe();
})

const notification = useNotification();
const handleFinish = ({
  file,
  event
}: {
  file: UploadFileInfo
  event?: ProgressEvent
}) => {

  const img = `${useRuntimeConfig().public.apiUrl}/uploads/${file.name}`;
  profileStore.profile.profilePicture = img;
  profileStore.updateProfile().then(() => {
    notification.info({
      content: $i18n.t("updateSuccessful", {
        field: "Profile",

      }),
      duration: 2500
    })
  }).catch((error) => {
    const content = `${$i18n.t("networkErr")} [${error}]`
    notification.error({
      content,
      duration: 2500
    })
  })

}

</script>
  