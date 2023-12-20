import { create } from "zustand";
import { GetPatientStats } from "../lib/PatientRecordService"; // Update with the correct path

type DashboardStore = {
  totalPatients: number;
  newPatientsToday: number;
  newPatientsThisWeek: number;
  activePatients: number;
  isLoading: boolean;
  fetchData: () => any;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  totalPatients: 0,
  newPatientsToday: 0,
  newPatientsThisWeek: 0,
  activePatients: 0,
  isLoading: false,
  fetchData: async () => {
    set({ isLoading: true });
    try {
      // Fetch data from your API using the new GetPatientStats function
      const response = await GetPatientStats();
      return response?.data;

      // Assuming your API response has properties like 'totalPatients', 'newPatientsToday', etc.
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      set({ isLoading: false });
    }
  },
}));
