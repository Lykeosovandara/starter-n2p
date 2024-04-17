export type Shop = {
  id?: number;
  createdDt?: string;
  updatedDt?: string;
  shopName: string;
  ownerName: string;
  district: string;
  commune: string;
  province: string;
  latitude?: number;
  longitude?: number;
  shopImg?: string;
  isVerify: boolean;
  phone: string;
};
