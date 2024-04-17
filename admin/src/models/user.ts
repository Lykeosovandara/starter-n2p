export type User = {
    id?: number;
    userName: string;
    password: string;
    recordStat?: string;
    createdDt?: string;
    updatedDt?: string;
    role: string
    profilePicture?: string
    createdBy? : User
  };
  