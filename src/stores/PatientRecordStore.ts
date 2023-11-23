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
  bhtNumber?: string | null;
  patientCategories?: number | null;
  reasonId?: number | null;
  age?: number | null;
  name?: string | null;
  weight?: number | null;
  height?: number | null;
  surgery?: string | null;
  indicationForAdmissionToTheICU?: string | null;
  tranexamicAcidGivenOrNot?: boolean | null;
  preOpBP_mmHg?: number | null;
  preOpHR_bpm?: number | null;
  preOpRR_bpm?: number | null;
  preOpBloodUrea_mg_dL?: number | null;
  preOpNa?: number | null;
  preOpK?: number | null;
  preOpSCcreatinine?: number | null;
  preOpHB_g_dL?: number | null;
  preOpWBC_103?: number | null;
  preOpFBS_mg_dL?: number | null;
  preOpNeutrophilCount?: number | null;
  postOpDay1BP?: number | null;
  postOpDay1HR?: number | null;
  postOpDay1RR?: number | null;
  postOpDay1BloodUrea?: number | null;
  postOpDay1SerumNa?: number | null;
  postOpDay1SerumK?: number | null;
  postOpDay1SerumCreatinine?: number | null;
  postOpDay1HB?: number | null;
  postOpDay1WBC?: number | null;
  postOpDay1FBS?: number | null;
  postOpDay1NeutrophilCount_103_uL?: number | null;
  postOpD3BP?: number | null;
  postOpD3HR?: number | null;
  postOpD3RR?: number | null;
  postOpD3BloodUrea?: number | null;
  postOpD3SerumNa?: number | null;
  postOpD3SerumK?: number | null;
  postOpD3SerumCreatinine?: number | null;
  postOpD3HB?: number | null;
  postOpD3WBC?: number | null;
  postOpD3FBS?: number | null;
  postOpD3NeutrophilCount_103_uL?: number | null;
  postOpD5BP?: number | null;
  postOpD5HR?: number | null;
  postOpD5RR?: number | null;
  postOpD5BloodUrea?: number | null;
  postOpD5SerumNa?: number | null;
  postOpD5SerumK?: number | null;
  postOpD5SerumCreatinine?: number | null;
  postOpD5HB?: number | null;
  postOpD5WBC?: number | null;
  postOpD5FBS?: number | null;
  postOpD5Neutrophil?: number | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  bmi?: number | null;
  dateofSurgery?: string | null;
  hypertension?: boolean | null;
  dld?: boolean | null;
  dm?: boolean | null;
  thyroid?: boolean | null;
  others?: string | null;
  ischemicHeartDiseases?: boolean | null;
  other1?: string | null;
  other2?: string | null;
  peripheralNeuropathies?: boolean | null;
  stroke?: boolean | null;
  otherBoneDissordersInLimbs_congenital?: boolean | null;
  otherBoneDissordersInLimbs_traumatic?: boolean | null;
  hxOfOtherMSKInjuriesAndPains?: string | null;
  hepato_Gastrointestinal?: boolean | null;
  respiratory?: boolean | null;
  renal?: boolean | null;
  other?: string | null;
  perOperativeBloodLoss?: number | null;
  bloodLossInTheDrainD2?: number | null;
  bloodLossInTheDrainD1_D2?: number | null;
  torniquetTimeMin?: number | null;
  nOofPostOpBloodTransfussions?: number | null;
  n0ofPostOpFFPTransfussions?: number | null;
  totalOperativeRoomTime_min?: number | null;
  boneAvolsion?: boolean | null;
  ligametAvulsions?: boolean | null;
  iatrogenicFactors?: string | null;
  superficialWoundInfections_1st?: number | null;
  deepWoundInfections_1st?: number | null;
  quadricepMuscleRupture_1st?: number | null;
  skinOpening_1st?: number | null;
  fatEmbolism_1st?: number | null;
  surgicalWoundComplication_1st?: number | null;
  hematoma_1st?: number | null;
  chestComplications_1st?: number | null;
  superficialWoundInfections_2nd?: number | null;
  deepWoundInfections_2nd?: number | null;
  quadricepMuscleRupture_2st?: number | null;
  skinOpening_2st?: number | null;
  fatEmbolism_2st?: number | null;
  surgicalWoundComplication_2st?: number | null;
  hematoma_2st?: number | null;
  chestComplications_2st?: number | null;
  superficialWoundInfections_Intermediate?: number | null;
  deepWoundInfections_Intermediate?: number | null;
  quadricepMuscleRupture_Intermediate?: number | null;
  skinOpening_Intermediate?: number | null;
  fatEmbolism_Intermediate?: number | null;
  surgicalWoundComplication_Intermediate?: number | null;
  hematoma_Intermediate?: number | null;
  chestComplications_Intermediate?: number | null;
  superficialWoundInfections_Late?: number | null;
  deepWoundInfections_Late?: number | null;
  quadricepMuscleRupture_Late?: number | null;
  skinOpening_Late?: number | null;
  fatEmbolism_Late?: number | null;
  surgicalWoundComplication_Late?: number | null;
  hematoma_Late?: number | null;
  chestComplications_Late?: number | null;
  painTolerance_PostOpD1?: number | null;
  painTolerance_beforeDischarge?: number | null;
  noofDaysInTheICU?: number | null;
  effectivenessInMobilization?: number | null;
  noofDaysInTheHospital?: number | null;
  createdDate?: string | null;
  createdBy?: string | null;
  modifiedDate?: string | null;
  modifiedBy?: string | null;
  isDeleted?: boolean | null;
  deletedDate?: string | null;
  deletedBy?: string | null;
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