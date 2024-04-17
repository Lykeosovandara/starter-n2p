<template>
    <div>
        <n-card :title="shop?.shopName">
            <template #cover>
                <img :src="props?.shop?.shopImg" class="h-96 object-scale-down rounded-md">
            </template>
            <div class="flex flex-col">
                <div>Owner: {{ shop?.ownerName }}</div>
                <div>Contact: {{ shop?.phone }}</div>
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { NMenu, NCard, } from "naive-ui";
import { type Shop } from "@/models";

const props = defineProps({
    shop: {
        type: Object as PropType<Shop>,
        required: false
    }
})

</script>
  