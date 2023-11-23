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
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const formItemLabelStyle: React.CSSProperties = {
  padding: 0,
  fontWeight: 500,
  whiteSpace: "initial",
};

const { Option } = Select;

function NewRecord(initialFormData: RecordData) {
  const recordsStore = useRecordsStore();
  const [form] = Form.useForm();
  const { patientId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (initialFormData) {
      form.setFieldsValue(initialFormData);
    }
  }, [initialFormData, form]);

  const handleSaveRecord = async () => {
    try {
      const values = await form.validateFields();
      values.patientProfileID = Number(patientId);
      values.patientTypeID = Number(values.patientTypeID);
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
                    {/* <Col md={12}>
                      <Form.Item
                        label="Patient Classification"
                        name="patientClassification"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Input />
                      </Form.Item>
                    </Col> */}
                  </Row>
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
                        label="Surgery"
                        name="surgery"
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
                        label="Indication for the surgery"
                        name="indicationForTheSurgery"
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
                        label="Indication for Admission to the ICU"
                        name="indicationForAdmissionToTheICU"
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
                        label="Tranexamic acid given or not"
                        name="tranexamicAcidGivenOrNot"
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
                        label="Pre-op BP (mmHg)"
                        name="preOpBP_mmHg"
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
                        label="Pre-Op HR bpm"
                        name="preOpHR_bpm"
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
                        label="Pre-Op RR Bpm"
                        name="PreOpRR_bpm"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
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
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <Form.Item
                        label="Pre-op FBS (mg/dL)"
                        name="postOpDay1FBS_mg_dL"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
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
                        name="postOpDay1FBS_mg_dL"
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
                        label="Post-Op Day 1 Neutrophil Count"
                        name="postOpDay1Neutrophil"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
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
