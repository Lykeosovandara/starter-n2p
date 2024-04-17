import { useAuthStore } from "~/stores";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuth } = useAuthStore();
  

  if ( isAuth === false) {
    return navigateTo("/login");
  }
}); 
