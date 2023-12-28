import { Card, Button, Input, DatePicker } from "antd";
import PatientReportsListings from "./PatientReportsListings";
import { useState } from "react";
import type { SearchProps } from "antd/es/input";
import RecordSearchParamsDto from "../../../stores/RecordSearchParamsDto";
import { GetFile } from "../../../lib/PatientRecordService";

const { Search } = Input;
const { RangePicker } = DatePicker;

function PatientReports() {
  const [name, setName] = useState("");
  // const { records, getAllRecordsByNameThunk } = useRecordsStore();
  //const [id, setid] = useState("");

  const onSearchName: SearchProps["onSearch"] = (value, _e) => setName(value);
  // const onSearchid: SearchProps["onSearch"] = (value, _e) => setid(value);
  // const onSearchReason: SearchProps['onSearch'] = (value, _e) => setReason(value);

  console.log(name);
  //console.log(id);
  const exportRecordsAsCSV = async () => {
    try {
      // Assuming you have the search parameters (name, reason, patientType) available in your component's state
      const params: RecordSearchParamsDto = {
        searchstring: name.toString(),
      };

      // Make the API call with the search parameters
      const response = await GetFile(params);

      // Rest of the code to create and download the file
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "patient_records.csv";
      a.click();
    } catch (error) {
      console.error("Error exporting records as CSV:", error);
    }
  };

  return (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "black" }}>Patient Reports</h3>

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
              onClick={exportRecordsAsCSV}
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
