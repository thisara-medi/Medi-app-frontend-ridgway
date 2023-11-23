import { create } from "zustand";
import {
  getRecordsByPatientId,
  getRecords,
  getAllRecordsByName,
  AddPatientRecord,
  UpdatePatientRecord,
  GetRecordByRecordId,
  getReasons
} from "../lib/PatientRecordService";
import { Patient } from "./PatientStore";

export type RecordData = {
  patientMedicalRecordID?: number | null;
  PatientProfileID?: number | null;
  bhtNumber?: number | null;
  wardNumber?: number | null;
  background?: string | null;
  diagnosis?: string | null;
  investigations?: string | null;
  treatments?: string | null;
  dailyStatus?: string | null;
  plan?: string | null;
  specialRemarks?: string | null;
  fiepath?: string | null;
  createdDate?: string | null;
  patientProfile? : Patient | null;
  }

  export type Reasons = {

    reasonID :number,
    reasonDescription: string
  }

  type RecordStore = {
  records: RecordData[];  
  getAllRecordsThunk: () => any;
  getRecordsByPatientIdThunk: (id: number) => any;
  addThunk: (patientRecord: RecordData) => any; // Thunk to make async calls to API endpoints
  updateThunk: (patientRecord: RecordData) => any; // Thunk to make async calls to API endpoints
  getRecordByRecordIdThunk: (patientId: number, PatientMedicalRecordID:number) => any;
};

type RecordStoreSearch = {
  recordsSearch: RecordData[];
  getAllRecordsByNameThunk: (name: string) => any;
  removeAllAction: () => void;
}


type ReasonsStore = {
  reasons : Reasons[];
  getReasonsThunk: ()=> any;
}


export const useReasonsStore = create<ReasonsStore>(() => ({
  reasons: [],
  getReasonsThunk: async () => {
    try {
      let resp = await getReasons();
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
}));



export const useRecordsStore = create<RecordStore>((set) => ({
  records: [],

  addAction: (record: any) =>
  set((state) => ({ records: [...state.records, record] })),

  removeAction: (id: number) =>
  set((state) => ({
    records: state.records.filter((record) => record?.PatientProfileID != id),
  })),

  removeAllAction: () => set(() => ({ records: [] })),


  getAllRecordsThunk: async () => {
    try {
      let resp = await getRecords();
      return resp?.data;
    } catch (e) {
      return e;
    }
  },

  getRecordsByPatientIdThunk: async (id: number) => {
    try {
      let resp = await getRecordsByPatientId(id);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  addThunk: async (patientRecord: RecordData) => {
    try {
      let resp = await AddPatientRecord(patientRecord);

      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  updateThunk: async (patientRecord: RecordData) => {
    try {
      let resp = await UpdatePatientRecord(patientRecord);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },

  getRecordByRecordIdThunk: async (patientId: number, recordId:number) => {
    try {
      let resp = await GetRecordByRecordId(patientId,recordId);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  

  // getAllRecordsByNameThunk: async (name: string) => {
  //   try {
  //     let resp = await getAllRecordsByName(name);
  //     return resp?.data;
  //   } catch (e) {
  //     return e;
  //   }
  // }
}));

export const useRecordsStoreSearch = create<RecordStoreSearch>((set) => ({
  recordsSearch: [],
  getAllRecordsByNameThunk: async (name: string) => {
    try {
      let resp = await getAllRecordsByName(name);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },

  removeAllAction: () => set(() => ({ recordsSearch: [] })),

  addThunk: async (patientRecord: RecordData) => {
    try {
      let resp = await AddPatientRecord(patientRecord);

      return resp?.data;
    } catch (e) {
      return e;
    }
  },
  updateThunk: async (patientRecord: RecordData) => {
    try {
      let resp = await UpdatePatientRecord(patientRecord);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },

  getRecordByRecordIdThunk: async (patientId: number, recordId:number) => {
    try {
      let resp = await GetRecordByRecordId(patientId,recordId);
      return resp?.data;
    } catch (e) {
      return e;
    }
  },
}));