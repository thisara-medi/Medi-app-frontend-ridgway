import {
  Select,
  Form,
  Col,
  Input,
  Row,
  Upload,
  DatePicker,
  Button,
  Radio,
  Switch,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { usePatientsStore } from "../../../../stores/PatientStore";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const { Option } = Select;
const formItemLabelStyle: React.CSSProperties = {
  padding: 0,
  fontWeight: 500,
  whiteSpace: "initial",
};

function PatientDetails() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { addThunk } = usePatientsStore();

  const onFinish = async (values: any) => {
    try {
      let addedPatient = await addThunk({
        FirstName: values?.FirstName,
        LastName: values?.LastName,
        DateOfBirth: values?.DateOfBirth,
        Gender: values?.Gender,
        ContactNumber: values?.ContactNumber,
        Address: values?.address,
        EmergencyContactNo: values?.EmergencyContactNo,
        BloodGroup: values?.BloodGroup,
        insuranceInfomation: values?.insuranceInfomation,
        MedicalHistory: values?.MedicalHistory,
        isActive: values?.isActive
      });
      console.log("addedpatient");
      console.log(addedPatient);

      if (addedPatient.hasOwnProperty("id")) {
        navigate(`/patient-profile/${Number(addedPatient.id)}/new-record`);
        notification.success({
          message: "Registration Successful",
          description: "The patient has been successfully registered.",
        });
      } else {
        notification.error({
          message: "Registration Failed",
          description:
            "There was an error during registration. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);

      notification.error({
        message: "Registration Failed",
        description:
          "There was an error during registration. Please try again.",
      });
    }
  };

  const discardClick = () => {
    navigate("/");
  };

  return (
    <Col md={24}>
      <Row>
        <Col md={12}>
          <Form
            name="PersonalInfomation"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              Gender: 'Male', // Set the default value for the Gender field
            }}
          >
            <div>
              <h4>Personal Infomation</h4>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="First Name"
                    name="FirstName"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter First name!",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter patient's first name" />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Last Name"
                    name="LastName"
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
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Gender"
                    name="Gender"
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
                        form.setFieldsValue({ Gender: e.target.value })
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
                    label="Active Patient"
                    name="isActive"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <h4>Contact Infomation</h4>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label=" Guardian Contact Number"
                    name="ContactNumber"
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
                    name="EmergencyContactNo"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Please enter a emergency contact number.",
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
              <h4>Medical Infomation</h4>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Blood Group"
                    name="BloodGroup"
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
                    name="MedicalHistory"
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
                  onClick={discardClick}
                >
                  Discard
                </Button>
                {/* <Button
                  size="middle"
                  style={{ marginRight: 5 }}
                  type="primary"
                  ghost
                >
                  Add Treatment
                </Button> */}
                <Button size="middle" type="primary" htmlType="submit">
                  Register Patient
                </Button>
              </div>
            </div>
          </Form>
        </Col>
        <Col md={12}>
          <Row>
            {" "}
            {/* Add a Row here for the right side content */}
            <Col md={24}>
              <Form name="UploadImage" layout="vertical" hidden={true}
              >
                <Form.Item
                  label="Profile Picture"
                  name="dragger"
                  valuePropName="fileList"
                  labelCol={{
                    style: {
                      padding: 0,
                      fontWeight: 500,
                      whiteSpace: "initial",
                      marginLeft: 20,
                    },
                  }}
                  wrapperCol={{ style: { width: "80%", marginLeft: 20 } }}
                  labelAlign="left"
                  colon={false}
                >
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag image to this area to upload
                    </p>
                    <p className="ant-upload-hint">Support for a jpg, png.</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default PatientDetails;
