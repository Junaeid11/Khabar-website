
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "provider"; 
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profile: {
      _id: string;
      gender: string;
      user: string;
      createdAt: string;
      updatedAt: string;
      address: string;
      dateOfBirth: string;
      phoneNo: string;
      photo: string;
      __v: number;
  };
}
