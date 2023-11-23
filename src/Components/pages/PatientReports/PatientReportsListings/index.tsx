import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import _ from "lodash";
import {
  RecordData,
  useRecordsStore,
} from "../../../../stores/PatientRecordStore";
import { useRecordsStoreSearch } from "../../../../stores/PatientRecordStore";

type ListingPropTypes = {
  headerComponent?: React.ReactNode;
  searchParam: string;
};

// interface PatientReportsListingsProps {
//   searchParam: string;
// }

const columns = [
  {
    title: "Date and time",
    dataIndex: "dateAndTime",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Patient Type",
    dataIndex: "patientType",
  },
  {
    title: "Patient Classification",
    dataIndex: "patientClassification",
  },
  {
    title: "BHT number ",
    dataIndex: "bhtNumber",
  },
  {
    title: "Surgery",
    dataIndex: "surgery",
  },
  {
    title: "Indication for the surgery",
    dataIndex: "indicationForTheSurgery",
  },
  {
    title: "Indication for admission to the ICU",
    dataIndex: "IndicationForAddmisionToIcu",
  },
];

function getRandomDate() {
  const year = 2023;
  const month = getRandomNumberInRange(1, 12);
  const day = getRandomNumberInRange(1, 31);

  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
}

function getRandomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PatientReportsListing = (props: ListingPropTypes) => {
  const { records, getAllRecordsThunk } = useRecordsStore();
  const { recordsSearch, getAllRecordsByNameThunk, removeAllAction } =
    useRecordsStoreSearch();
  const [data, setData] = useState([]);

  // console.log("Search Param Name : ", props.searchParam);

  useEffect(() => {
    let getData = async () => {
      try {
        const apiResponse = await getAllRecordsThunk();

        apiResponse.forEach((record: RecordData) => {
          const existingIndex = records.findIndex(
            (existingRecord) =>
              existingRecord.patientMedicalRecordID ===
              record.patientMedicalRecordID
          );
          if (existingIndex === -1) {
            records.push(record);
          }
        });

        const newData: any = [];
        records.forEach((record) => {
          // console.log(record)
          newData.push({
            key: record.patientMedicalRecordID,
            dateAndTime: getRandomDate(),
            name: `${record.patientProfile?.firstName} ${record.patientProfile?.lastName}`,
            patientClassification: record.patientCategories,
            bhtNumber: record.bhtNumber,
            surgery: record.surgery,
            indicationForTheSurgery: record.indicationForAdmissionToTheICU,
            IndicationForAddmisionToIcu: record.indicationForAdmissionToTheICU,
          });
        });

        // console.log(newData);
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    let getData = async () => {
      try {
        const apiResponseSearch =
          props.searchParam !== ""
            ? await getAllRecordsByNameThunk(props.searchParam)
            : await getAllRecordsThunk();

        // console.log(apiResponseSearch);
        apiResponseSearch.forEach((record: RecordData) => {
          const existingIndex = recordsSearch.findIndex(
            (existingRecord) =>
              existingRecord.patientMedicalRecordID ===
              record.patientMedicalRecordID
          );
          if (existingIndex === -1) {
            recordsSearch.push(record);
          }
        });

        const newData: any = [];
        recordsSearch.forEach((record) => {
          // console.log(record)
          newData.push({
            key: record.patientMedicalRecordID,
            dateAndTime: getRandomDate(),
            name: `${record.patientProfile?.firstName} ${record.patientProfile?.lastName}`,
            patientClassification: record.patientCategories,
            bhtNumber: record.bhtNumber,
            surgery: record.surgery,
            indicationForTheSurgery: record.indicationForAdmissionToTheICU,
            IndicationForAddmisionToIcu: record.indicationForAdmissionToTheICU,
          });
        });

        // console.log(records);
        setData(newData);
        removeAllAction();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [props.searchParam]);

  return (
    <>
      <React.Fragment>
        {props.headerComponent && props.headerComponent}

        <Space direction="vertical" style={{ width: "100%", padding: "10px" }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
          />
        </Space>
      </React.Fragment>
    </>
  );
};

export default PatientReportsListing;
