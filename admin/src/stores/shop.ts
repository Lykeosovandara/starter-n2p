import { type PaginationProps } from "naive-ui";
import type { Shop } from "~/models";

export const useShopStore = defineStore("shops", {
  state: () => ({ stores: [] as Shop[] }),
  actions: {
    async fetchShops({ page, pageSize }: PaginationProps) {
      const authStore = useAuthStore();

      const res: any = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/api/shops`,
        {
          query: {
            page: page,
            take: pageSize,
          },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      this.stores = res.data as Shop[];


      console.log(res.data);
      
    },

    async shopById(id: number): Promise<Shop> {
      const authStore = useAuthStore();

      const res = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/api/shops/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      return res as Shop;
    },
    async addShop(shop: Shop) {
      const authStore = useAuthStore();
      
      await $fetch(`${useRuntimeConfig().public.apiUrl}/api/shops`, {
        method: "POST",
        body: shop,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    },
    async updateShop(shop: Shop, id: number) {
      const authStore = useAuthStore();
      await $fetch(`${useRuntimeConfig().public.apiUrl}/api/shops/${id}`, {
        method: "PATCH",
        body: shop,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    },
    async deleteShop(id: number) {
      const authStore = useAuthStore();
      await $fetch(`${useRuntimeConfig().public.apiUrl}/api/shops/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    },
  },
});
