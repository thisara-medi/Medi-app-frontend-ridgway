import axios from "axios";
import { Reasons, RecordData } from "../stores/PatientRecordStore";
import RecordSearchParamsDto from "../stores/RecordSearchParamsDto";

export function getRecords() {
  return axios.get<RecordData[]>(
    `https://localhost:7160/api/PatientRecord/GetPatientRecordList`
  );
}

export function getRecordsByPatientId(id: number) {
  return axios.get<RecordData[]>(
    `https://localhost:7160/api/PatientRecord/GetRecordByPatientId/${id}`
  );
}

export function getAllRecordsByName(name: string) {
  return axios.get<RecordData[]>(
    `https://localhost:7160/api/PatientRecord/GetPatientRecordsBySearchString/${name}`
  );
}

export function AddPatientRecord(patientRecord: RecordData) {
  return axios.post(
    `https://localhost:7160/api/PatientRecord/AddPatientRecord`,
    patientRecord
  );
}

export function UpdatePatientRecord(patientRecord: RecordData) {
  return axios.put(
    `https://localhost:7160/api/PatientRecord/UpdatePatientRecord`,
    patientRecord
  );
}

export function GetRecordByRecordId(recordId: number, patientId: number) {
  return axios.get(
    `https://localhost:7160/api/PatientRecord/GetPatientRecordById/${recordId}?patientId=${patientId}`
  );
}

export function getReasons() {
  return axios.get<Reasons[]>(
    `https://localhost:7160/api/PatientRecord/GetPatientMedicalRecordReasonList`
  );
}

export function GetPatientStats() {
  return axios.get(`https://localhost:7160/api/Patient/GetPatientStats`);
}

export const GetFile = async (params: RecordSearchParamsDto) => {
  return axios.post(
    `https://localhost:7160/api/PatientRecord/GetPatientRecordsAsCSV`,
    params
  );
};
