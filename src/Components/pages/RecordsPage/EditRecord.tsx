import {
  Form,
  Col,
  Input,
  Row,
  DatePicker,
  Button,
  Switch,
  Select,
  Card,
  notification,
} from "antd";

import {
  useRecordsStore,
  RecordData,
} from "../../../stores/PatientRecordStore";
import React, { useEffect, useState } from "react";
import { PatientType } from "../../../enums/patientTypeEnum";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { storage } from "../../../lib/FirebaseService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const { Option } = Select;
const { TextArea } = Input;

const formItemLabelStyle: React.CSSProperties = {
  padding: 0,
  fontWeight: 500,
  whiteSpace: "initial",
};

function EditRecord(initialFormData: RecordData) {
  const recordsStore = useRecordsStore();
  const [form] = Form.useForm();
  const { patientId, recordId } = useParams();
  const { getRecordByRecordIdThunk } = useRecordsStore();
  const [record, setRecord] = useState<Partial<RecordData>>({});
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    let getData = async () => {
      try {
        const apiResponse = await getRecordByRecordIdThunk(
          Number(patientId),
          Number(recordId)
        );
        setRecord(apiResponse);
        console.log(apiResponse);

        form.setFieldsValue({
          BHTNumber: apiResponse?.bhtNumber,
          wardNumber: apiResponse?.wardNumber,
          patientCategories: apiResponse?.patientCategories,
          background: apiResponse?.background,
          diagnosis: apiResponse?.diagnosis,
          investigations: apiResponse?.investigations,
          treatments: apiResponse?.treatments,
          dailyStatus: apiResponse?.dailyStatus,
          plan: apiResponse?.plan,
          specialRemarks: apiResponse?.specialRemarks,
          // patientCategories: apiResponse?.patientCategories,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  console.log("patientId: " + patientId);
  console.log("recordId: " + recordId);

  React.useEffect(() => {
    if (initialFormData) {
      form.setFieldsValue(initialFormData);
    }
  }, [initialFormData, form]);

  const handleUpdateRecord = async () => {
    if (file != null) {
      const storageRef = ref(storage, `/files/${file.name}`);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            try {
              const values = await form.validateFields();
              // Call the updateThunk method from the Zustand store to update the record
              values.patientProfileID = patientId;
              values.patientMedicalRecordID = Number(recordId);
              values.patientTypeID = Number(values.patientTypeID);
              if(file){
              values.Fiepath = downloadURL;
              }
              else
              {
                values.Fiepath= record.fiepath
              }
              values.createdDate = new Date().toISOString();
              await recordsStore.updateThunk(values);
              navigate("/");
              notification.success({
                message: "Record updated successfully",
                description: "The Record has been successfully updated.",
              });
            } catch (error) {
              console.error("Error updating record:", error);
            }
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error.message);
        });
        
    }
    else {
      try {
        const values = await form.validateFields();
        // Call the updateThunk method from the Zustand store to update the record
        values.patientProfileID = patientId;
        values.patientMedicalRecordID = Number(recordId);
        values.Fiepath= record.fiepath
        await recordsStore.updateThunk(values);
        navigate("/");
        notification.success({
          message: "Record updated successfully",
          description: "The Record has been successfully updated.",
        });
      } catch (error) {
        console.error("Error updating record:", error);
      }
    }
  };

  return (
    <div style={{ padding: 15 }}>
      <h3>Edit Record</h3>
      <Card bordered={false}>
        <Col md={24}>
          <Row>
            <Col md={12}>
              <div>
                <Form name="PersonalInfomation" layout="vertical" form={form}>
                  <h4>Treatment Infomation</h4>
                  <Row>
                    <Col md={12}>
                      <Form.Item
                        label="BHT number"
                        name="BHTNumber"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                        rules={[
                          {
                            required: true,
                            message: "Please Enter BHT",
                          },
                        ]}
                      >
                        <Input disabled={true} />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label="Ward Number"
                        name="wardNumber"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                         <Input disabled={true} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Item
                        label="Background"
                        name="background"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label="Diagnosis"
                        name="diagnosis"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Item
                        label="Investigations"
                        name="investigations"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label="Treatments"
                        name="treatments"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Item
                        label="Daily Status"
                        name="dailyStatus"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label="Plan"
                        name="plan"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24}>
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files != null) {
                            setFile(e.target.files[0]);
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24}>
                      <Form.Item
                        label="Special Remarks"
                        name="specialRemarks"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <TextArea rows={4} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  {/* <Button
                    size="middle"
                    style={{ marginRight: 5 }}
                    type="primary"
                    ghost
                  >
                    Previous
                  </Button> */}
                  <Button
                    size="middle"
                    type="primary"
                    onClick={handleUpdateRecord}
                  >
                    Update Record
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={24}></Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Card>
    </div>
  );
}

export default EditRecord;
