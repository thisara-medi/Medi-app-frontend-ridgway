import { create } from "zustand";

import {
    authUser
  } from "../lib/AuthService";

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string; 
  contactNumber: number;
  address: string;
  emergencyContactNo: number;
  bloodGroup: string; 
  medicalHistory: string;
  allergic: string;
  NIC: string;
};

export type User = {
    username:String | null// TODO: add other fields. id, role etc..
    token:string | null
}

type AuthStore = {
  user:User; // Patients 
  isAuthenticated:boolean
  addUser: (user: any) => void; 
  setAuthentication:(isAuth:boolean)=>any
  authenticateUser: (user: any) => any; 
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: {username:null, token:null},
    isAuthenticated:false,
    setAuthentication: (isAuth: boolean) =>
  set({ isAuthenticated: isAuth }),
  addUser: (newUser: any) =>
  set({ user: newUser }),

  authenticateUser: async (user: any) => {
    try {
      let resp = await authUser(user);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
}));