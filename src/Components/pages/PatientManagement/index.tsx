import { Card, Button, Input, Select } from "antd";
import PatientManagementListing from "./PatientManagementListings";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchProps } from "antd/es/input";

const { Search } = Input;
const { Option } = Select;

function PatientManagement() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [searchType, setSearchType] = useState(0);

  const selectAfter = (
    <Select defaultValue="0" onChange={(value) => setSearchType(Number(value))}>
      <Option value="0">Name</Option>
      <Option value="1">Contact No:</Option>
      <Option value="2">NIC</Option>
    </Select>
  );

  const onSearchName: SearchProps["onSearch"] = (value, _e) => setName(value);

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
          <Search
            placeholder="Search"
            addonBefore={selectAfter}
            style={{ width: 250, justifyContent: "flex-start" }}
            onSearch={onSearchName}
          />
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
              onClick={() => navigate("/patient-registration")}
            >
              Register New Patient
            </Button>
          </div>
        </div>
        <PatientManagementListing searchParam={name} searchIndex={searchType} />
      </Card>
    </div>
  );
}

export default PatientManagement;
