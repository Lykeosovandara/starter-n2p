import type { Dashboard } from "~/models/dashboard";
import { baseApi } from ".";

export const fetchDashboard = async (): Promise<Dashboard> => {
    const res = await baseApi("dashboard");
    return res as Dashboard;
  };