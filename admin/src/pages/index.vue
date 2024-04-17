<template>
  <div class="flex flex-col p-5 h-screen">
    <!-- Card Total Account -->
    <div class="flex flex-col">
      <div class="w-full">
        <div class="">
          <n-card :title="$t('dataSummary')">
            <n-row>
              <n-col :span="12">
                <n-statistic label="Total Shop">
                  <n-number-animation show-separator :from="0" :to="dashboard?.totalActivity" :active="true" :duration="500" />
                </n-statistic>
              </n-col>
              <n-col :span="12">
                <n-statistic label="Total Sales"><n-number-animation show-separator :from="0" :to="dashboard?.totalActivityClose"
                    :active="true" :duration="500" /></n-statistic>
              </n-col>
            </n-row>
          </n-card>
        </div>

        <n-card :title="$t('shopVisitedToday')" class="mt-4">
          <n-table size="medium" bordered>
            <thead>
              <tr class="text-center">
                <th>{{ $t("shopName") }}</th>
                <th>{{ $t("retailerName") }}</th>
                <th>{{ $t("visitBy") }}</th>
                <th>{{ $t("visitAt") }}</th>
                <th>{{ $t("saleStatus") }}</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="shop in dashboard?.last5Activity" :key="shop.id">
                <td>{{ shop.shop.shopName }}</td>
                <td>{{ shop.shop.ownerName }}</td>
                <td>{{ shop.user.userName }}</td>
                <td>{{ formatDate(shop.createdDt) }}</td>
                <td >
                  <span :class="textColor(shop.status)">{{ saleStatus(shop.status) }}</span>
                </td>
              </tr>


            </tbody>
          </n-table>
        </n-card>
      </div>

      <!-- Card Warning -->

    </div>


  </div>
</template>

<script setup lang="ts">
const dashboard = ref<Dashboard>();
const i18n = useI18n();

// function return sale or no sale by status
const saleStatus = (status: string) => {
  if (status === "CLOSE") {
    return i18n.t("sale");
  } else {
    return i18n.t("noSale");
  }
};

// return text color base on status 
const textColor = (status: string) => {
  if (status === "CLOSE") {
    return "text-green-500";
  } else {
    return "text-red-500";
  }
};



onMounted(async () => {
  dashboard.value = await fetchDashboard()
});



definePageMeta({
  middleware: 'auth'
})
import {
  NCard,
  NRow,
  NCol,
  NStatistic,
  NNumberAnimation,
  NTable,
} from "naive-ui";
import { fetchDashboard } from "~/api";
import type { Dashboard } from "~/models/dashboard";
const { $i18n } = useNuxtApp();
</script>
