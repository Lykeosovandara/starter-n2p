<template>
  <n-layout-sider :collapsed="collapse" show-trigger collapse-mode="width" :width="250" @collapse="onCollapseMenu"
    @expand="onExpandMenu">
    <div class="h-[calc(100vh-70px)]">
      <n-menu v-model:value="activeRoute" :options="menus" :collapsed="collapse" default-expand-all
        class="text-xs"></n-menu>
    </div>
  </n-layout-sider>
</template>
  
<script setup lang="ts">
import { NMenu, NLayoutSider } from "naive-ui";
const { menus } = useSideMenu();
const route = useRoute();
const activeRoute = ref<string | null>(route.path.toString());
const collapse = ref<boolean>(false);

const onCollapseMenu = () => {
  collapse.value = true;
};

const onExpandMenu = () => {
  collapse.value = false;
};
</script>
  