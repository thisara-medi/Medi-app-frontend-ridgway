import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import _ from "lodash";
import {
  RecordData,
  useRecordsStore,
} from "../../../../../../stores/PatientRecordStore";
import { useNavigate, useParams } from "react-router-dom";

type ListingPropTypes = {
  headerComponent?: React.ReactNode;
};

const columns = [
  {
    title: "Patient Type",
    dataIndex: "patientType",
  },
  {
    title: "BHT number ",
    dataIndex: "bhtNumber",
  },
  {
    title: "Reason",
    dataIndex: "reasonId",
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
    title: "Indication for Admission to ICU",
    dataIndex: "IndicationForAdmissionToTheICU",
  },
  {
    title: "Tranexamic Acid Given",
    dataIndex: "TranexamicAcidGivenOrNot",
  },
  {
    title: "Pre-opBP_mmHg",
    dataIndex: "Pre_opBP_mmHg",
  },
  {
    title: "Pre-opHR_bpm",
    dataIndex: "Pre_opHR_bpm",
  },
  {
    title: "Pre-opRR_bpm",
    dataIndex: "Pre_opRR_bpm",
  },
  {
    title: "Pre-opBloodUrea_mg_dL",
    dataIndex: "Pre_opBloodUrea_mg_dL",
  },
  {
    title: "Pre-opNa",
    dataIndex: "Pre_opNa",
  },
  {
    title: "Pre-opK",
    dataIndex: "Pre_opK",
  },
  {
    title: "Pre-opSCcreatinine",
    dataIndex: "Pre_opSCcreatinine",
  },
  {
    title: "Pre-opHB_g_dL",
    dataIndex: "Pre_opHB_g_dL",
  },
];

function patientType(typeId: any) {
  switch (typeId) {
    case 0:
      return "Public";
    case 1:
      return "Private";
    case 2:
      return "Navaloka";
  }
}

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
              patientType: patientType(record.patientTypeID),
              bhtNumber: record.bhtNumber,
              reasonId: record.reasonId,
              surgery: record.surgery,
              indicationForTheSurgery: record.indicationForTheSurgery, //TODO : replace this
              IndicationForAdmissionToTheICU:
                record.indicationForAdmissionToTheICU,
              TranexamicAcidGivenOrNot: record.tranexamicAcidGivenOrNot
                ? "Yes"
                : "No",
              Pre_opBP_mmHg: record.preOpBP_mmHg,
              Pre_opHR_bpm: record.preOpHR_bpm,
              Pre_opRR_bpm: record.preOpRR_bpm,
              Pre_opBloodUrea_mg_dL: record.preOpBloodUrea_mg_dL,
              Pre_opNa: record.preOpNa,
              Pre_opK: record.preOpK,
              Pre_opSCcreatinine: record.preOpSCcreatinine,
              Pre_opHB_g_dL: record.preOpHB_g_dL,
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
