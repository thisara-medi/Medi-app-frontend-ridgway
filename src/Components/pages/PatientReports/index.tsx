import { Card, Button, Input, Row, Col, DatePicker } from "antd";
import PatientReportsListings from "./PatientReportsListings";
import ReportSummeryCard from "../../custom-components/ReportSummeryCard";
import { useState } from "react";
import type { SearchProps } from "antd/es/input";

const { Search } = Input;
const { RangePicker } = DatePicker;

function PatientReports() {
  const [name, setName] = useState("");
  // const { records, getAllRecordsByNameThunk } = useRecordsStore();
  // const [reason, setReason] = useState("");

  const onSearchName: SearchProps["onSearch"] = (value, _e) => setName(value);
  // const onSearchReason: SearchProps['onSearch'] = (value, _e) => setReason(value);

  console.log(name);

  return (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "black" }}>Patient Reports</h3>
      <div>
        <Row style={{ marginBottom: 15 }}>
          <Col md={6} style={{ padding: 10 }}>
            <ReportSummeryCard
              name="Patients Total"
              value="11.9M"
              increment="+2.5%"
            />
          </Col>
          <Col md={6} style={{ padding: 10 }}>
            <ReportSummeryCard
              name="New This Week"
              value="8.236K"
              increment="+1.2%"
            />
          </Col>
          <Col md={6} style={{ padding: 10 }}>
            <ReportSummeryCard
              name="New Patients Today"
              value="8K"
              increment="+5.2%"
            />
          </Col>
          <Col md={6} style={{ padding: 10 }}>
            <ReportSummeryCard
              name="Active Patients"
              value="2.352M"
              increment="+11%"
            />
          </Col>
        </Row>
      </div>
      <Card bordered={false}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div>
            <Search
              placeholder="Search by Name/ID/NIC"
              style={{ width: 250 }}
              // onChange={(e) => setInput(e.target.value)}
              onSearch={onSearchName}
            />
            <Search
              placeholder="Search by Reason"
              style={{ width: 200 }}
              // onSearch={onSearchReason}
            />
            <RangePicker />
          </div>
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
              ghost
              style={{ marginRight: 5 }}
            >
              Export
            </Button>
          </div>
        </div>
        <PatientReportsListings searchParam={name} />
      </Card>
    </div>
  );
}

export default PatientReports;
