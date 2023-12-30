import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import _ from "lodash";
import {
  Patient,
  usePatientsStore,
  usePatientStoreSearch,
} from "../../../../stores/PatientStore";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

type ListingPropTypes = {
  headerComponent?: React.ReactNode;
  searchParam: string;
  searchIndex: number;
};

const columns = [
  {
    title: "",
    dataIndex: "edit",
  },
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
console.log(actionButtonsArr)

const patientManagementListing = (props: ListingPropTypes) => {
  const { patients, getThunk } = usePatientsStore();
  const { getAllPatientsBySearchThunk } =
    usePatientStoreSearch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const tempData: any = [];
  console.log(patients);

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
              status: patient.isActive ? (
                <label
                  style={{
                    color: "#08BC54",
                    backgroundColor: "#bbebcb",
                    borderRadius: 20,
                    padding: "4px 8px",
                  }}
                >
                  Active
                </label>
              ) : (
                <label
                  style={{
                    color: "#FF7715",
                    backgroundColor: "#fbd7b7",
                    borderRadius: 20,
                    padding: "4px 8px",
                  }}
                >
                  Inactive
                </label>
              ),
              edit: (
                <Button
                  size="small"
                  onClick={() => navigate(`/patient-profile/${patient.id}`)}
                >
                  <EditOutlined />
                </Button>
              ),
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

  // Change thissssssssssssssssssssss
  useEffect(() => {
    let getData = async () => {
      try {
        // const apiResponseSearch = await getAllPatientsBySearchThunk(
        //   props.searchParam,
        //   props.searchIndex
        // );
        // console.log("propssss");
        // console.log(props.searchParam);
        // console.log(props.searchIndex);
        // console.log(apiResponseSearch);
        const apiResponseSearch =
          props.searchParam !== ""
            ? await await getAllPatientsBySearchThunk(
                props.searchParam,
                props.searchIndex
              )
            : await getThunk();

        apiResponseSearch.forEach((patient: Patient) => {
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
              status: patient.isActive ? (
                <label
                  style={{
                    color: "#08BC54",
                    backgroundColor: "#bbebcb",
                    borderRadius: 20,
                    padding: "4px 8px",
                  }}
                >
                  Active
                </label>
              ) : (
                <label
                  style={{
                    color: "#FF7715",
                    backgroundColor: "#fbd7b7",
                    borderRadius: 20,
                    padding: "4px 8px",
                  }}
                >
                  Inactive
                </label>
              ),
              edit: (
                <Button
                  size="small"
                  onClick={() => navigate(`/patient-profile/${patient.id}`)}
                >
                  <EditOutlined />
                </Button>
              ),
            });
          }
        });

        setData(tempData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [props.searchParam, props.searchIndex]);

  return (
    <>
      <React.Fragment>
        {props.headerComponent && props.headerComponent}

        <Space direction="vertical" style={{ width: "100%", padding: "10px" }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            // onRow={(record: any) => ({
            //   onClick: () => navigate(`/patient-profile/${record.key}`),
            // })}
          />
        </Space>
      </React.Fragment>
    </>
  );
};

export default patientManagementListing;
