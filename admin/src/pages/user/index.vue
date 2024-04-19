<template>
  <div class=" h-screen flex">
    <n-card :title="$i18n.t('user')">
      <n-button class="mb-4">
        <NuxtLink to="user/add">ADD USER</NuxtLink>
      </n-button>
      <n-data-table remote :columns="columns" :data="users" :pagination="pagination" class="pr-4"
        @update:page="handlePageChange" :loading="loadingRef" />
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
import { NDataTable, NButton, NCard, type DataTableColumns, NModal, useNotification, NAvatar, type PaginationProps } from "naive-ui";
import { generateTokenBy, clearSessionBy, fetchUsers } from "~/api";
import type { User } from "~/models";

const { $i18n } = useNuxtApp();

const showQrValue = ref<string>("");
const loadingRef = ref(false);
const showQr = ref<boolean>(false);

const router = useRouter();
const users = ref<User[]>([]);

const pagination = reactive<Partial<PaginationProps>>({
  pageSize: 9,
  page: 1,
  pageCount: 10,
  prefix({ itemCount }) {
    return `Total is ${itemCount}.`
  }
})


definePageMeta({
  middleware: 'auth'
})

onMounted(() => {


  getUsers();
});
// get user for table
const getUsers = async () => {


  loadingRef.value = true
  const result = await fetchUsers({
    page: pagination!.page!,
    pageSize: pagination!.pageSize!,

  });
  users.value = result.data;
  pagination.pageCount = result.meta!.pageCount;
  pagination.itemCount = result.meta!.itemCount;
  loadingRef.value = false
}

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
    getUsers();
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


async function handlePageChange(currentPage: number) {
  loadingRef.value = true
  users.value = await fetchUsers({
    page: pagination!.page!,
    pageSize: pagination!.pageSize!,

  });
  pagination.page = currentPage;
  pagination.pageCount = result.meta!.pageCount;
  pagination.itemCount = result.meta!.itemCount;
  loadingRef.value = false
}

</script>