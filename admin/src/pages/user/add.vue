<template>
    <div class="h-screen flex">
        <BackHeader :title="$i18n.t('createNewUser')">
            <n-form ref="formRef" :model="userCredentials" :rules="validationRules">
                <n-form-item path="userName" label="Username">
                    <n-input v-model:value="userCredentials.userName" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="password" label="Password">
                    <n-input v-model:value="userCredentials.password" type="password" @keydown.enter.prevent />
                </n-form-item>

                <n-text style="font-size: 16px">
                    Role
                </n-text>
                <!-- select role -->
                <n-select v-model:value="userCredentials.role" filterable placeholder="Please select a song"
                    :options="options" class="pb-6 pt-2" />

                <n-button :disabled="userCredentials.role === null || userCredentials.password === null" round
                    @click="addUserHandler" class="w-full">
                    Create User
                </n-button>
            </n-form>
        </BackHeader>

    </div>
</template>

<script lang="ts" setup>
import {
    NInput,
    NButton,
    NForm,
    NFormItem,
    NSelect,
    NText,
    type FormRules,
    type FormInst,
    useNotification,
} from "naive-ui";

import type { User } from "~/models";

enum Role {
    Sale = 'sale',
    Manager = 'manager',
    Admin = 'admin',
}
const { $i18n } = useNuxtApp();
const userStore = useUsersStore();

definePageMeta({
    layout: "default",
});

const options = [
    {
        label: 'Admin',
        value: Role.Admin
    },
    {
        label: 'Manager',
        value: Role.Manager
    },
    {
        label: 'Sale',
        value: Role.Sale
    },
]
const router = useRouter();
const formRef = ref<FormInst | null>(null);
const userCredentials = ref<User>({ userName: "", password: "", role: Role.Sale });


const validationRules: FormRules = {
    userName: [
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

definePageMeta({
    middleware: 'auth'
})

const notification = useNotification();

const addUserHandler = async (e: MouseEvent) => {
    e.preventDefault();
    if (await formRef.value?.validate()) {
        try {
            notification.info({
                content: $i18n.t("createSuccessful", {
                    field: "User",

                }),
                duration: 2500
            })
            await userStore.addUser(userCredentials.value);
            router.back();
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