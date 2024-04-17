import type { User } from "~/models";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {} as User,
  }),
  actions: {
    async fetchMe(): Promise<User> {
      const authStore = useAuthStore();
      const res: User = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      this.profile = res;
      return res;
    },

    async updateProfile(): Promise<User> {
      const authStore = useAuthStore();
      const res: User = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/api/auth/me`,
        {
          method: "PATCH",
          body: {
            profilePicture: this.$state.profile.profilePicture
          },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      return res;
    },
  },
});
