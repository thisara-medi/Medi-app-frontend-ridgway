import { Card, Tabs, TabsProps, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import PatientDetails from "./tabs/PatientDetailsTab";

const tabs: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <Space>
        <UserOutlined style={{ fontSize: 20 }} />
        <div>
          <h4 style={{ margin: 0 }}>Patient Details</h4>
          <small>Basic Details</small>
        </div>
      </Space>
    ),
    children: <PatientDetails />,
  },
  // {
  //   key: "2",
  //   label: (
  //     <Space>
  //       <UserOutlined style={{ fontSize: 20 }} />
  //       <div>
  //         <h4 style={{ margin: 0 }}>2. New Record</h4>
  //         <small>New Details</small>
  //       </div>
  //     </Space>
  //   ),
  //   children: <NewRecords />,
  // },
];

function PatientRegistation() {
  return (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "black" }}>Patient Management</h3>
      <Card bordered={false}>
        <Tabs defaultActiveKey="1" items={tabs} />
      </Card>
    </div>
  );
}

export default PatientRegistation;
