
import { baseApi } from ".";

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