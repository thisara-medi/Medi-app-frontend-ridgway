import { Card, Button,} from "antd";
import TimeChangeReqListing from "./PatientReportsListings";
import { useNavigate } from "react-router-dom";


function PreviousRecordsTab() {
  const navigate = useNavigate();

  return (
    <Card bordered={false}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
       
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button size="middle" type="primary" hidden={true} ghost style={{ marginRight: 5 }}>
            Export
          </Button>
          <Button
            size="middle"
            type="primary"
            onClick={() => navigate("new-record")}
          >
            Add New Record
          </Button>
        </div>
      </div>
      <TimeChangeReqListing />
    </Card>
  );
}

export default PreviousRecordsTab;
