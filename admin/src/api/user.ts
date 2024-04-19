
import type { ResponseApi, User } from "~/models";
import { baseApi } from ".";
import type { PaginationProps } from "naive-ui";

export const generateTokenBy = async (
  id: number
): Promise<{
  qrCode: string;
}> => {
  const result = await baseApi(`auth/generate/${id}`);
  return result as { qrCode: string };
};

// clear user session by id
export const clearSessionBy = async (id: number): Promise<void> => {
  await baseApi(`auth/clearMobileInfo/${id}`, "DELETE");
};

export const fetchUsers = async ({ page, pageSize }: PaginationProps): Promise<ResponseApi<any>> => {
  const result = await baseApi("users", "GET",  {
    page: page,
    take: pageSize,
  },);
  return result as ResponseApi<any>;
}