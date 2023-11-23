import { create } from "zustand";
import {
  addPatient,
  getPatientById,
  getPatients,
  removePatient,
  updatePatient,
} from "../lib/PatientService";

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
  nic: string;
  insuranceInfomation: string;
};




type PatientStore = {
  patients: Patient[]; // Patients 
  addAction: (patient: any) => void; // Actions to update state
  removeAction: (id: number) => void; // Actions to update state
  removeAllAction: () => void; // Actions to update state
  getThunk: () => any; // Thunk to make async calls to API endpoints
  getByIdThunk: (id: number) => any; // Thunk to make async calls to API endpoints
  addThunk: (patient: any) => any; // Thunk to make async calls to API endpoints
  updateThunk: (patient: any) => any; // Thunk to make async calls to API endpoints
  removeByIdThunk: (id: number) => any; // Thunk to make async calls to API endpoints
};



export const usePatientsStore = create<PatientStore>((set) => ({
  patients: [],
  addAction: (patient: any) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  removeAction: (id: number) =>
    set((state) => ({
      patients: state.patients.filter((patient) => patient?.id != id),
    })),
  removeAllAction: () => set(() => ({ patients: [] })),
  getThunk: async () => {
    try {
      let resp = await getPatients();
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  getByIdThunk: async (id: number) => {
    try {
      let resp = await getPatientById(id);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  addThunk: async (patient: any) => {
    try {
      let resp = await addPatient(patient);

      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  updateThunk: async (patient: Patient) => {
    try {
      let resp = await updatePatient(patient);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  removeByIdThunk: async (id: number) => {
    try {
      let resp = await removePatient(id);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
}));


