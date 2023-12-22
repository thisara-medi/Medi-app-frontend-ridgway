import React, { useEffect, useState } from "react";
import {
  Form,
  Col,
  Input,
  Row,
  DatePicker,
  Button,
  Card,
  Space,
  Select,
  notification,
  Radio,
  Switch,
} from "antd";
import { Patient, usePatientsStore } from "../../../../stores/PatientStore";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const formItemLabelStyle: React.CSSProperties = {
  padding: 0,
  fontWeight: 500,
  whiteSpace: "initial",
};

function BasicDetailsTab() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { getByIdThunk, updateThunk } = usePatientsStore();
  const [, setPatient] = useState<Partial<Patient>>({});
  const navigate = useNavigate();

  useEffect(() => {
    let getData = async () => {
      try {
        const apiResponse = await getByIdThunk(Number(id));
        setPatient(apiResponse);
        form.setFieldsValue({
          firstName: apiResponse?.firstName,
          lastName: apiResponse?.lastName,
          DateOfBirth: moment(apiResponse?.dateOfBirth),
          gender: apiResponse?.gender,
          nic: apiResponse?.nic,
          contactNumber: apiResponse?.contactNumber,
          address: apiResponse?.address,
          emergencyContactNo: apiResponse?.emergencyContactNo,
          bloodGroup: apiResponse?.bloodGroup,
          insuranceInfomation: apiResponse?.insuranceInfomation,
          medicalHistory: apiResponse?.medicalHistory,
          allergic: apiResponse?.allergic,
          isActive: apiResponse?.isActive,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  

  const onFinish = async (values: any) => {
    await updateThunk({
      Id: Number(id),
      firstName: values?.firstName,
      LastName: values?.lastName,
      DateOfBirth: values?.DateOfBirth,
      Gender: values?.gender,
      nic: values?.nic,
      ContactNumber: values?.contactNumber,
      Address: values?.address,
      EmergencyContactNo: values?.emergencyContactNo,
      BloodGroup: values?.bloodGroup,
      insuranceInfomation: values?.insuranceInfomation,
      MedicalHistory: values?.medicalHistory,
      Allergic: values?.allergic,
      isActive: values?.isActive,
    });
    navigate("/patientManagement");
    notification.success({
      message: "Record Changed successfully",
      description: "The Record has been successfully changed.",
    });
  };

  return (
    <Col md={24}>
      <Row>
        <Col md={12}>
          <div>
            <Form
              name="PersonalInfomation"
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <Card bordered={false} style={{ marginBottom: 20 }}>
                <h4>Personal Infomation</h4>
                <Row>
                  <Col md={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Input placeholder="Please enter patient's first name" />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Input placeholder="Please enter patient's last name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Item
                      label="Date of Birth"
                      name="DateOfBirth"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Please enter patient's DoB"
                        inputReadOnly={false}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                      rules={[
                        {
                          required: false,
                          message: "Please select the patient's gender.",
                        },
                      ]}
                    >
                      <Radio.Group
                        onChange={(e) =>
                          form.setFieldsValue({ gender: e.target.value })
                        }
                      >
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Item
                      label="NIC(National Identity Card)"
                      name="nic"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                      rules={[
                        {
                          required: false,
                          message: "Please enter NIC.",
                        },
                        {
                          pattern: /^\d{12}$|^\d{9}[VXvx]$/,
                          message:
                            "NIC must be 12 digits or 9 digits with 'V' or 'X'.",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter patient's NIC" />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label="Active Patient"
                      name="isActive"
                      valuePropName="checked"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card bordered={false} style={{ marginBottom: 20 }}>
                <h4>Contact Infomation</h4>
                <Row>
                  <Col md={12}>
                    <Form.Item
                      label="Contact Number"
                      name="contactNumber"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                      rules={[
                        {
                          required: false,
                          message: "Please enter a contact number.",
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message: "Contact number must be 10 digits.",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter patient's contact number" />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label="Address"
                      name="address"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Input placeholder="Please enter patient's address" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Item
                      label="Emergency Contact Number"
                      name="emergencyContactNo"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                      rules={[
                        {
                          required: false,
                          message: "Please enter a contact number.",
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message: "Contact number must be 10 digits.",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter patient's emergency contact number" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card bordered={false} style={{ marginBottom: 20 }}>
                <h4>Medical Infomation</h4>
                <Row>
                  <Col md={12}>
                    <Form.Item
                      label="Blood Group"
                      name="bloodGroup"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Select placeholder="please enter patient's blood group">
                        <Option key={"O-"} value="O-">
                          O-
                        </Option>
                        <Option key={"O+"} value="O+">
                          O+
                        </Option>
                        <Option key={"A-"} value="A-">
                          A-
                        </Option>
                        <Option key={"A+"} value="A+">
                          A+
                        </Option>
                        <Option key={"B-"} value="B-">
                          O-
                        </Option>
                        <Option key={"B+"} value="B+">
                          B+
                        </Option>
                        <Option key={"AB-"} value="AB-">
                          AB-
                        </Option>
                        <Option key={"AB+"} value="AB+">
                          AB+
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label="Insurance Infomation"
                      name="insuranceInfomation"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "96%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Input placeholder="Please enter patient's insurance information" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col md={24}>
                    <Form.Item
                      label="Medical History"
                      name="medicalHistory"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "98%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Please enter patient's medical history"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col md={24}>
                    <Form.Item
                      label="Allergic"
                      name="allergic"
                      labelCol={{ style: formItemLabelStyle }}
                      wrapperCol={{ style: { width: "98%" } }}
                      labelAlign="left"
                      colon={false}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Please enter patient's allergies (if any)"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Button
                  size="middle"
                  style={{ marginRight: 5 }}
                  type="primary"
                  htmlType="submit"
                >
                  Edit Data
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col md={12}>
          <Row>
            {" "}
            {/* Add a Row here for the right side content */}
            <Col md={24}>
              <Card 
                bordered={false}
                style={{ marginLeft: 20, textAlign: "center" }}
                hidden={true}
              >
                <Space direction="vertical" style={{ textAlign: "center" }}>
                  <h3>Profile Photo</h3>
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "grey",
                      borderRadius: 50,
                      textAlign: "center",
                    }}
                  ></div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default BasicDetailsTab;
