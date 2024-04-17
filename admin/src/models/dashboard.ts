import type { Activity } from ".";

export type Dashboard = {
  totalActivity: number;
  totalActivityClose: number;
  last5Activity: Activity[];
};
