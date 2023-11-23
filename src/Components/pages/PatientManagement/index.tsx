import { Card, Button} from "antd";
import PatientManagementListing from "./PatientManagementListings";
import { useNavigate } from "react-router-dom";

function PatientManagement() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "black" }}>Patient Management</h3>
      <Card bordered={false}>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 10,
          }}
        >
          {/* <Search placeholder="Search by Name/ID/NIC" style={{ width: 200 }} /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="middle"
              type="primary"
              onClick={() => navigate("patient-registration")}
            >
              Register New Patient
            </Button>
          </div>
        </div>
        <PatientManagementListing />
      </Card>
    </div>
  );
}

export default PatientManagement;
