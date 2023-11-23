import MainLayout from "./Components/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PatientManagement from "./Components/pages/PatientManagement";
import PatientRegistation from "./Components/pages/PatientRegistation";
import PatientReports from "./Components/pages/PatientReports";
import PatientProfile from "./Components/pages/PatientProfile";
import EditRecord from "./Components/pages/RecordsPage/EditRecord";
import NewRecord from "./Components/pages/RecordsPage/NewRecord";
import LoginPage from "./Components/LoginPage";
// import { useAuthStore } from "./stores/AuthStore";

function App() {
  
  /** 
   * Temporary disabled isAuthenticated check to persist logged in 
   * status during page refreshes. Refreshing the page resets the store
   * along with isAuthenticated value, which navigates the user back to 
   * login page.
   * 
   * TODO: Implement token validation in server-side to allow only requests with valid tokens.
   * 
   */
  // const { isAuthenticated } = useAuthStore(); 
  const ProtectedRoute = ({ children }: any) => {
    if (localStorage.getItem("token") == null) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          Login here
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<PatientManagement />} />
            <Route
              path="/patient-registration"
              element={<PatientRegistation />}
            />
            <Route path="/patient-reports" element={<PatientReports />} />
            <Route path="/patient-profile/:id" element={<PatientProfile />} />
            <Route
              path="/patient-profile/records/:patientId/:recordId"
              element={<EditRecord />}
            />
            <Route
              path="/patient-profile/:patientId/new-record"
              element={<NewRecord />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
