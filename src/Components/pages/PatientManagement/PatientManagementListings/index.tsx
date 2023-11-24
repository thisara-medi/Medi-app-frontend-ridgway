import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import _ from "lodash";
import { Patient, usePatientsStore } from "../../../../stores/PatientStore";
import { useNavigate } from "react-router-dom";

type ListingPropTypes = {
  headerComponent?: React.ReactNode;
};

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
  },
  {
    title: "Date of Birth ",
    dataIndex: "dateOfBirth",
  },
  {
    title: "Sex",
    dataIndex: "sex",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "National Identity Card",
    dataIndex: "nic",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const actionButtonsArr = [
  <label
    style={{
      color: "#08BC54",
      backgroundColor: "#bbebcb",
      borderRadius: 20,
      padding: "4px 8px",
    }}
  >
    Active
  </label>,
  <label
    style={{
      color: "#FF7715",
      backgroundColor: "#fbd7b7",
      borderRadius: 20,
      padding: "4px 8px",
    }}
  >
    Inactive
  </label>,
];

const patientManagementListing = (props: ListingPropTypes) => {
  const { getThunk } = usePatientsStore();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const tempData: any = [];

  useEffect(() => {
    let getData = async () => {
      try {
        const apiResponse = await getThunk();

        apiResponse.forEach((patient: Patient) => {
          const existingIndex = tempData.findIndex(
            (existingPatient: Patient) => existingPatient.id === patient.id
          );
          if (existingIndex === -1) {
            //tempData.push(patient);
            const datetimeString = patient.dateOfBirth;
            const formattedDate = new Date(datetimeString)
              .toISOString()
              .split("T")[0];

            tempData.push({
              key: patient.id,
              fullName: `${patient.firstName} ${patient.lastName}`,
              dateOfBirth: formattedDate,
              sex: patient.gender,
              address: patient.address,
              nic: patient.nic,
              contactNumber: patient.contactNumber,
              status: _.sample(actionButtonsArr),
            });
          }
        });

        // const newData: any = [];
        // tempData.forEach((patient: any) => {
        //   const datetimeString = patient.dateOfBirth;
        //   const formattedDate = new Date(datetimeString)
        //     .toISOString()
        //     .split("T")[0];

        //   newData.push({
        //     key: patient.id,
        //     fullName: `${patient.firstName} ${patient.lastName}`,
        //     dateOfBirth: formattedDate,
        //     sex: patient.gender,
        //     address: patient.address,
        //     nic: patient.nic,
        //     contactNumber: patient.contactNumber,
        //     status: _.sample(actionButtonsArr),
        //   });
        // });

        setData(tempData);
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
            onRow={(record: any) => ({
              onClick: () => navigate(`/patient-profile/${record.key}`),
            })}
          />
        </Space>
      </React.Fragment>
    </>
  );
};

export default patientManagementListing;
