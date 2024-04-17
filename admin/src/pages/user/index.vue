<template>
  <div class=" h-screen flex">
    <n-card :title="$i18n.t('user')">
      <n-button class="mb-4">
        <NuxtLink to="user/add">ADD USER</NuxtLink>
      </n-button>
      <n-data-table :columns="columns" :data="userValue" :pagination="pagination" class="pr-4" />
    </n-card>

    <n-modal v-model:show="showQr">
      <n-card style="width: 350px; height: 350px; " :title="$i18n.t('loginCode')" :bordered="false"
        class="flex flex-col items-center">

        <img :src="showQrValue" class="rounded-md" />

      </n-card>

    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { NDataTable, NButton, NCard, type DataTableColumns, NModal, useNotification, NAvatar } from "naive-ui";
import { generateTokenBy, clearSessionBy } from "~/api";

const { $i18n } = useNuxtApp();

const showQrValue = ref<string>("");
const showQr = ref<boolean>(false);

const router = useRouter();
const userValue = computed(() => usersStore.users);

const usersStore = useUsersStore();
const pagination = usePagination(() => {
  return usersStore.fetchUsers(pagination);
});

definePageMeta({
  middleware: 'auth'
})

onMounted(() => {
  usersStore.fetchUsers(pagination);
})

const columns: DataTableColumns = [
  {
    title: $i18n.t("id"),
    key: "id",
  },
  {
    title: $i18n.t("picture"),
    key: "profilePicture",
    render(row) {
      return [
        h(NAvatar, {
          round: true,
          size: "large",
          src: `${row.profilePicture}`
        })
      ]
    }
  },
  {
    title: $i18n.t("username"),
    key: "userName",
  },

  {
    title: $i18n.t("role"),
    key: "role",
  },
  {
    title: $i18n.t("action"),
    key: 'action',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            onClick: () => {
              router.push("user/" + row.userName)
            },
            style: {
              marginRight: '6px'
            },
          },
          { default: () => $i18n.t("resetPassword") }
        ),
        h(
          NButton,
          {
            size: 'small',
            onClick: async () => showModel(row.id as string),
            style: {
              marginRight: '6px'
            },
          },
          { default: () => $i18n.t("loginCode") }
        ),
        h(
          NButton,
          {
            size: 'small',
            onClick: async () => clearSession(row.id as string),
            style: {
              marginRight: '6px',
              color: 'white'
            },
            type: 'error'
          },
          { default: () => $i18n.t("clearSession") }
        ),
      ]
    }
  },
  {
    title: $i18n.t("createdBy"),
    key: "createdBy",
    render(row: any) {
      // return p tag
      return [
        h("p", `${row?.createdBy?.userName ?? "N/A"}`)
      ]
    }
  },
  {
    title: $i18n.t("device"),
    key: "createdBy",
    render(row: any) {
      // return p tag
      return [
        h("p", `${row?.mobileInfo ?? "N/A"}`)
      ]
    }
  },

];
const notification = useNotification();
const showModel = async (id: string) => {
  try {
    const result = await generateTokenBy(+id);
    showQrValue.value = result.qrCode;
    showQr.value = true;
  } catch (error) {
    const content = `${$i18n.t("networkErr")} [${error}]`
    notification.error({
      content,
      duration: 2500
    })
  }
}
// clear session
const clearSession = async (id: string) => {
  try {
    const result = await clearSessionBy(+id);
    usersStore.fetchUsers(pagination);
    notification.success({
      content: $i18n.t("sessionCleared"),
      duration: 2500
    })
  } catch (error) {
    const content = `${$i18n.t("networkErr")} [${error}]`
    notification.error({
      content,
      duration: 2500
    })
  }
}

</script>