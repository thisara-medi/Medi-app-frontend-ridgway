import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import _ from "lodash";
import {
  RecordData,
  useRecordsStore,
} from "../../../../../../stores/PatientRecordStore";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

type ListingPropTypes = {
  headerComponent?: React.ReactNode;
};

const columns = [
  {
    title: "",
    dataIndex: "edit",
  },
  {
    title: "Ward Number",
    dataIndex: "wardNumber",
  },
  {
    title: "BHT number ",
    dataIndex: "bhtNumber",
  },
  {
    title: "Background",
    dataIndex: "background",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
  },
  {
    title: "investigations",
    dataIndex: "investigations",
  },
  {
    title: "treatments",
    dataIndex: "treatments",
  },
  {
    title: "plan",
    dataIndex: "plan",
  },
];

const PatientReportsListing = (props: ListingPropTypes) => {
  const { id } = useParams();
  const { getRecordsByPatientIdThunk } = useRecordsStore();
  const [data, setData] = useState([]);
  const tempData: any = [];
  const navigate = useNavigate();

  useEffect(() => {
    let getData = async () => {
      try {
        const apiResponse = await getRecordsByPatientIdThunk(Number(id));

        console.log(apiResponse);

        apiResponse.forEach((record: any) => {
          const existingIndex = tempData.findIndex(
            (existingPatient: RecordData) =>
              existingPatient.patientMedicalRecordID ===
              record.patientMedicalRecordID
          );

          if (existingIndex === -1) {
            tempData.push({
              key: record.patientMedicalRecordID,
              wardNumber: record.wardNumber,
              bhtNumber: record.bhtNumber,
              diagnosis: record.diagnosis,
              investigations: record.investigations, //TODO : replace this
              treatments: record.treatments,
              plan: record.plan,
              background: record.background,
              edit: (
                <Button
                  size="small"
                  onClick={() =>
                    navigate(
                      `/patient-profile/records/${id}/${record.patientMedicalRecordID}`
                    )
                  }
                >
                  <EditOutlined />
                </Button>
              ),
            
            });
          }
        });
        setData(tempData);
        // console.log(tempData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <React.Fragment>
        {props.headerComponent && props.headerComponent}

        <Space direction="vertical" style={{ width: "100%", padding: "10px" }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1800 }}
            onRow={(record: any) => ({
              onClick: () =>
                navigate(`/patient-profile/records/${id}/${record.key}`),
            })}
          />
        </Space>
      </React.Fragment>
    </>
  );
};

export default PatientReportsListing;
