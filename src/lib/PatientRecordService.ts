import axios from "axios";
import { Reasons, RecordData } from "../stores/PatientRecordStore";

export function getRecords() {
    return axios.get<RecordData[]>(`https://pms-endpoints-ridgway.azurewebsites.net/api/PatientRecord/GetPatientRecordList`); 
  }

export function getRecordsByPatientId(id: number) {
    return axios.get<RecordData[]>(`https://pms-endpoints-ridgway.azurewebsites.net/api/PatientRecord/GetRecordByPatientId/${id}`); 
  }

export function getAllRecordsByName (name: string) {
  return axios.get<RecordData[]>(`https://pms-endpoints-ridgway.azurewebsites.net/api/PatientRecord/GetPatientRecordsBySearchString/${name}`);
}

  export function AddPatientRecord(patientRecord: RecordData) {
    return axios.post(`https://pms-endpoints-ridgway.azurewebsites.net/api/PatientRecord/AddPatientRecord`, patientRecord);
  }

  export function UpdatePatientRecord(patientRecord: RecordData) {
    return axios.put(`https://pms-endpoints-ridgway.azurewebsites.net/api/PatientRecord/UpdatePatientRecord`, patientRecord);
  }

  export function GetRecordByRecordId(recordId: number, patientId: number) {
    return axios.get(`https://pms-endpoints-ridgway.azurewebsites.net/api/PatientRecord/GetPatientRecordById/${recordId}?patientId=${patientId}`);
  }

  export function getReasons() {
    return axios.get<Reasons[]>(`https://pms-endpoints-ridgway.azurewebsites.net/api/PatientRecord/GetPatientMedicalRecordReasonList`); 
  }