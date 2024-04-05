<template>
  <div class="w-screen h-screen flex bg-slate-500">
    <div class="bg-slate-800 m-auto px-5 py-10 rounded-md">
      <div class="text-center text-white text-2xl mb-5">{{ $t("login") }}</div>
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
import {
  NInput,
  NButton,
  NForm,
  NFormItem,
  type FormRules,
  type FormInst,
} from "naive-ui";

const { $i18n } = useNuxtApp();

type Credentials = {
  username: string;
  password: string;
};

// definePageMeta({
//   layout: "guest",
// });

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

const loginHandler = async (e: MouseEvent) => {
  e.preventDefault();
  if (await formRef.value?.validate()) {
    try {


    } catch (error) {

    }
  }

};
</script>

<style></style>