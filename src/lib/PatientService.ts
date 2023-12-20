import axios from "axios";
import { Patient } from "../stores/PatientStore";

export function getPatients() {
  return axios.get<Patient[]>(
    `https://localhost:7160/api/Patient/GetPatientList`
  );
}

export function getPatientById(id: number) {
  return axios.get<Patient[]>(
    `https://localhost:7160/api/Patient/GetPatientById/${id}`
  );
}

export function addPatient(patient: Patient) {
  return axios.post(`https://pms-endpoints-ridgway.azurewebsites.net/api/Patient/AddPatient`, patient); // TODO: Replace correct API endpoint
}

export function removePatient(id: number) {
  return axios.delete(`/API/${id}`); // TODO: Replace correct API endpoint
}

export function updatePatient(patient: any) {
  return axios.put(`https://localhost:7160/api/Patient/UpdatePatient`, patient);
}
export function getAllPatientsBySearch(
  searchString: string,
  searchType: number
) {
  return axios.get<Patient[]>(
    `https://localhost:7160/api/Patient/GetPatientBySearchString/${searchString}/${searchType}`
  );
}
