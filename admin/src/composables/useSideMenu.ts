import { type MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import { Icon } from "#components";

export const useSideMenu = () => {
  const menus: MenuOption[] = [
    createMenu("/", "dashboard", "ri:dashboard-line", "1em"),
    createMenu("/user", "user", "ri:team-line", "1em"),
    createMenu("/profile", "profile", "ic:round-person-outline", "1em"),
   
  ];

  return { menus };
};

function createMenu(
  to: string,
  toName: string,
  icName?: string,
  icSize?: string,
  children?: MenuOption[],
  key?: string,
): MenuOption {
  const { $i18n } = useNuxtApp();

  const icon = icName && icSize ? renderIcon(icName, icSize) : undefined;

  return {
    label: () => h(RouterLink, { to }, { default: () => $i18n.t(toName) }),
    key: key ?? to,
    icon,
    children,
  };
}

function renderIcon(name: string, size: string) {
  return () => h(Icon, { name, size });
}
