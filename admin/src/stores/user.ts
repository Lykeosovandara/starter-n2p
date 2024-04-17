import { type Auth, type User } from "~/models";
import { type PaginationProps } from "naive-ui";

export const useUsersStore = defineStore("users", {
  state: () => ({ users: [] as User[] }),
  actions: {
    async fetchUsers({ page, pageSize }: PaginationProps) {
      const authStore = useAuthStore();

      const res: any = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/api/users`,
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

      this.users = res.data as User[];
    },

    async addUser(user: User) {
      const authStore = useAuthStore();
      await $fetch(`${useRuntimeConfig().public.apiUrl}/api/auth/register`, {
        method: "POST",
        body: {
          password: user.password,
          username: user.userName,
          role: user.role,
        },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    },
    async resetPassword(username: string, password: string) {
      const authStore = useAuthStore();
      await $fetch(`${useRuntimeConfig().public.apiUrl}/api/auth/reset`, {
        method: "POST",
        body: {
          password,
          username,
        },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    },

    async generateToken(id: string): Promise<{
      qrCode: string;
    }> {
      const authStore = useAuthStore();
      const res: {
        qrCode: string;
      } = await $fetch(
        `${useRuntimeConfig().public.apiUrl}/api/auth/generate/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      return res;
    },
  },
});
