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
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../../../lib/FirebaseService";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const formItemLabelStyle: React.CSSProperties = {
  padding: 0,
  fontWeight: 500,
  whiteSpace: "initial",
};

const { Option } = Select;
const { TextArea } = Input;

function NewRecord(initialFormData: RecordData) {
  const recordsStore = useRecordsStore();
  const [form] = Form.useForm();
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  React.useEffect(() => {
    if (initialFormData) {
      form.setFieldsValue(initialFormData);
    }
  }, [initialFormData, form]);

  const handleSaveRecord = async () => {
    if (file != null) {
      const storageRef = ref(storage, `/files/${file.name}`)

      uploadBytes(storageRef, file).then((snapshot) => {

        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          try {
            const values = await form.validateFields();
            values.patientProfileID = Number(patientId);
            values.fiepath = downloadURL;

            // values.patientTypeID = 1;
            console.log(values);
            await recordsStore.addThunk(values);
            navigate(-1);
            notification.success({
              message: "Record Added successfully",
              description: "The Record has been successfully added.",
            });
            form.resetFields();
          } catch (error) {
            console.error("Error saving record:", error);
            alert("Error: failed to add the record");
          }
        });
      }).catch((error) => {
        console.error('Error uploading file:', error.message);
      });
    }
  };

  return (
    <div style={{ padding: 15 }}>
      <h3>New Record</h3>
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
                      >
                        <Input />
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
                        <Input />
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
                      <input type="file" onChange={(e) => {
                        if (e.target.files != null) {
                          setFile(e.target.files[0]);
                        }
                      }} />
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
                  {/* <Button size="middle" style={{ marginRight: 5 }}>
                    Skip for Now
                  </Button>
                  <Button
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
                    onClick={handleSaveRecord}
                  >
                    Add Record
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

export default NewRecord;
