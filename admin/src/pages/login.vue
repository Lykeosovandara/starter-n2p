<template>
  <div class="w-screen h-screen flex bg-slate-500">
    <div class="bg-slate-800 m-auto px-5 py-10 rounded-md">
      <img :src="logo" class="h-20 m-auto mb-10 rounded" />
      <n-form ref="formRef" :rules="validationRules" :model="loginCredentials">
        <div class="w-72 mb-5">
          <n-form-item path="username" :show-label="false">
            <n-input v-model:value="loginCredentials.username" type="text" :placeholder="$i18n.t('username')" />
          </n-form-item>
          <n-form-item path="password" :show-label="false">
            <n-input v-model:value="loginCredentials.password" type="password" :placeholder="$i18n.t('password')" />
          </n-form-item>
        </div>
        <n-button type="primary" class="w-72" @click="loginHandler">{{
          $t("login")
        }}</n-button>
      </n-form>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import logo from "~/assets/images/logo.jpg";
import {
  NInput,
  NButton,
  NForm,
  NFormItem,
  type FormRules,
  type FormInst,
  useNotification,
} from "naive-ui";

const { $i18n } = useNuxtApp();
import { useAuthStore } from "~/stores";
const store = useAuthStore()


type Credentials = {
  username: string;
  password: string;
};

definePageMeta({
  layout: "guest",
});

const formRef = ref<FormInst | null>(null);
const loginCredentials = ref<Credentials>({ username: "", password: "" });

const validationRules: FormRules = {
  username: [
    {
      required: true,
      message: $i18n.t("validation.is_required", {
        field: $i18n.t("username"),
      }),
    },
  ],
  password: [
    {
      required: true,
      message: $i18n.t("validation.is_required", {
        field: $i18n.t("password"),
      }),
    },
  ],
};

const notification = useNotification();
const loginHandler = async (e: MouseEvent) => {
  e.preventDefault();
  if (await formRef.value?.validate()) {
    try {
      await store.login(loginCredentials.value.username, loginCredentials.value.password)
  
    } catch (error) {
      const content = `${$i18n.t("networkErr")} [${error}]`
      notification.error({
        content,
        duration: 2500
      })
    }
  }

};
</script>
  
<style></style>
  