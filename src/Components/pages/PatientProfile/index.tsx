import { Card, Tabs, TabsProps } from "antd";
import BasicDetailsTab from "./tabs/BasicDetailsTab";
import PreviousRecordsTab from "./tabs/PreviousRecordsTab/PreviousRecordsTab";

const tabs: TabsProps["items"] = [
  {
    key: "1",
    label: "Basic Details",
    children: <BasicDetailsTab />,
  },
  {
    key: "2",
    label: "Previous Records",
    children: <PreviousRecordsTab />,
  },
];

function PatientProfile() {
  return (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "black" }}>Patient Profile</h3>
      <Card
        bordered={false}
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Tabs defaultActiveKey="1" items={tabs} />
      </Card>
    </div>
  );
}

export default PatientProfile;
