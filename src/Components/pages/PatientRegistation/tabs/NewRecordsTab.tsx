import {
  Form,
  Col,
  Input,
  Row,
  DatePicker,
  Button,
  Switch,
  Select,
} from "antd";
import {
  useRecordsStore,
  RecordData,
} from "../../../../stores/PatientRecordStore";
import React from "react";
import { PatientType } from "../../../../enums/patientTypeEnum";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const formItemLabelStyle: React.CSSProperties = {
  padding: 0,
  fontWeight: 500,
  whiteSpace: "initial",
};

const { Option } = Select;

function NewRecords(initialFormData: RecordData) {
  const recordsStore = useRecordsStore();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialFormData) {
      form.setFieldsValue(initialFormData);
    }
  }, [initialFormData, form]);

  const handleSaveRecord = async () => {
    try {
      const values = await form.validateFields();
      // Call the addThunk method from the Zustand store to save the record
      await recordsStore.addThunk(values);
      form.resetFields();
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  return (
    <Col md={24}>
      <Row>
        <Col md={12}>
          <div>
            <Form name="PersonalInfomation" layout="vertical" form={form}>
              <h4>Treatment Infomation</h4>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Patient Type"
                    name="patientType"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Please select the patient type!",
                      },
                    ]}
                  >
                    <Select>
                      {Object.keys(PatientType).map((key) => (
                        <Option key={key} children={undefined}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Patient Classification"
                    name="patientClassification"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Please Enter patient Classification!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="BHT number"
                    name="bht"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      { required: false, message: "Please Enter BHT number!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Surgery"
                    name="surgery"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Please select the patient type!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Indication for the surgery"
                    name="indicationForTheSurgery"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Indication for the surgery!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Indication for Admission to the ICU"
                    name="indicationForAdmissionToIcu"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Indication for Admission to the ICU!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Tranexamic acid given or not"
                    name="tranexamicAcid"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op BP (mmHg)"
                    name="preOpBp"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-op BP (mmHg)!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Pre-Op HR bpm"
                    name="preOpHR_bpm"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op HR bpm",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Pre-Op RR Bpm"
                    name="PreOpRR_bpm"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op RR bpm",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              {/* Row 1 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op Sodium"
                    name="preOpNa"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op Sodium",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op Blood Urea (mg/dL)"
                    name="preOpBloodUrea_mg_dL"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op Blood Urea (mg/dL)",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 2 */}

              {/* Row 3 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op Serum Creatinine"
                    name="preOpSCcreatinine"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op Serum Creatinine",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op Hemoglobin (g/dL)"
                    name="preOpHB_g_dL"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op Hemoglobin",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 4 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op WBC (10^3)"
                    name="preOpWBC_103"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op WBC (10^3)",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op FBS (mg/dL)"
                    name="preOpFBS_mg_dL"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-Op FBS(mg/dL)",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 5 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Pre-op Neutrophil Count"
                    name="preOpNeutrophilCount"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Pre-op Neutrophil Count",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Blood Pressure"
                    name="postOpDay1BP"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Blood Pressure",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 6 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Heart Rate"
                    name="postOpDay1HR"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Heart Rate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Respiratory Rate"
                    name="postOpDay1RR"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Respiratory Rate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 7 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Blood Urea"
                    name="postOpDay1BloodUrea"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Heart Rate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Serum Sodium"
                    name="postOpDay1SerumNa"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Serem Sodium",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 8 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Serum Potassium"
                    name="postOpDay1SerumK"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Serem Potassium",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Serum Creatinine"
                    name="postOpDay1SerumCreatinine"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Serem Creatinine",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 9 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Hemoglobin"
                    name="postOpDay1HB"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Hemoglobin",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 WBC"
                    name="postOpDay1WBC"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 WBC",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 10 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 FBS"
                    name="postOpDay1FBS"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 FBS",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 1 Neutrophil Count"
                    name="postOpDay1NeutrophilCount_103_uL"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 1 Neutrophil Count",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              {/* Row 1 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Blood Pressure"
                    name="postOpD3BP"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Blood Pressure",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Heart Rate"
                    name="postOpD3HR"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Heart Rate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 2 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Respiratory Rate"
                    name="postOpD3RR"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Respiratory Rate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Blood Urea"
                    name="postOpD3BloodUrea"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Blood Urea",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 3 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Serum Sodium"
                    name="postOpD3SerumNa"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Serum Sodium",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Serum Potassium"
                    name="postOpD3SerumK"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Serem Potassium",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 4 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Serum Creatinine"
                    name="postOpD3SerumCreatinine"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Serum Creatinine",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Hemoglobin"
                    name="postOpD3HB"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Hemoglobin",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 5 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 WBC"
                    name="postOpD3WBC"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 WBC",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 FBS"
                    name="postOpD3FBS"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 FBS",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 6 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 3 Neutrophil Count"
                    name="postOpD3NeutrophilCount_103_uL"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 3 Neutrophil Count",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Blood Pressure"
                    name="postOpD5BP"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Blood Pressure",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 1 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Heart Rate"
                    name="postOpD5HR"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Heart Rate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Respiratory Rate"
                    name="postOpD5RR"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Respiratory Rate",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 2 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Blood Urea"
                    name="postOpD5BloodUrea"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Blood Urea",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Serum Sodium"
                    name="postOpD5SerumNa"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Serum Sodium",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 3 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Serum Potassium"
                    name="postOpD5SerumK"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Serum Potassium",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Serum Creatinine"
                    name="postOpD5SerumCreatinine"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Serum Creatinine",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 4 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Hemoglobin"
                    name="postOpD5HB"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 Hemoglobin",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 WBC"
                    name="postOpD5WBC"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 WBC",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 5 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 FBS"
                    name="postOpD5FBS"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Post-Op Day 5 FBS",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Post-Op Day 5 Neutrophil Count"
                    name="postOpD5Neutrophil"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 6 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Height (cm)"
                    name="height_cm"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Height (cm)",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Weight (kg)"
                    name="weight_kg"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter Weight (kg)",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 7 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="BMI"
                    name="bmi"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Enter BMI",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Date of Surgery"
                    name="dateofSurgery"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                    rules={[
                      {
                        required: false,
                        message: "Select Date of Surgery",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 8 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Hypertension"
                    name="hypertension"
                    valuePropName="checked"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="DLD"
                    name="dld"
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

              {/* Row 9 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="DM"
                    name="dm"
                    valuePropName="checked"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Thyroid"
                    name="thyroid"
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

              {/* Row 10 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Others"
                    name="others"
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
                    label="Ischemic Heart Diseases"
                    name="ischemicHeartDiseases"
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

              {/* Row 11 */}
              <Row>
                <Col md={12}>
                  <Form.Item
                    label="Other 1"
                    name="other1"
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
                    label="Other 2"
                    name="other2"
                    labelCol={{ style: formItemLabelStyle }}
                    wrapperCol={{ style: { width: "96%" } }}
                    labelAlign="left"
                    colon={false}
                  >
                    <Input />
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
              <Button size="middle" style={{ marginRight: 5 }}>
                Skip for Now
              </Button>
              <Button
                size="middle"
                style={{ marginRight: 5 }}
                type="primary"
                ghost
              >
                Previous
              </Button>
              <Button size="middle" type="primary" onClick={handleSaveRecord}>
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
  );
}

export default NewRecords;
