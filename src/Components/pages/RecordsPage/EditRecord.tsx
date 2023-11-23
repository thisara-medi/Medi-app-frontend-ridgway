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

const { Option } = Select;

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

  useEffect(() => {
    let getData = async () => {
      try {
        const apiResponse = await getRecordByRecordIdThunk(
          Number(patientId),
          Number(recordId)
        );
        setRecord(apiResponse);
        console.log(apiResponse);
        console.log("fkdsjfkjdfkjdf");
        console.log(apiResponse?.tranexamicAcidGivenOrNot);
        console.log(apiResponse?.hypertension);

        form.setFieldsValue({
          patientProfileID: apiResponse?.patientProfileID,
          bhtNumber: apiResponse?.bhtNumber,
          patientCategories: apiResponse?.patientCategories,
          reasonId: apiResponse?.reasonId,
          patientTypeID: apiResponse?.patientTypeID.toString(),
          age: apiResponse?.age,
          name: apiResponse?.name,
          weight: apiResponse?.weight,
          height: apiResponse?.height,
          surgery: apiResponse?.surgery,
          indicationForTheSurgery: apiResponse?.indicationForTheSurgery,
          indicationForAdmissionToTheICU:
            apiResponse?.indicationForAdmissionToTheICU,
          tranexamicAcidGivenOrNot: apiResponse?.tranexamicAcidGivenOrNot,
          preOpBP_mmHg: apiResponse?.preOpBP_mmHg,
          preOpHR_bpm: apiResponse?.preOpHR_bpm,
          preOpRR_bpm: apiResponse?.preOpRR_bpm,
          preOpBloodUrea_mg_dL: apiResponse?.preOpBloodUrea_mg_dL,
          preOpNa: apiResponse?.preOpNa,
          preOpK: apiResponse?.preOpK,
          preOpSCcreatinine: apiResponse?.preOpSCcreatinine,
          preOpHB_g_dL: apiResponse?.preOpHB_g_dL,
          preOpWBC_103: apiResponse?.preOpWBC_103,
          preOpFBS_mg_dL: apiResponse?.preOpFBS_mg_dL,
          preOpNeutrophilCount: apiResponse?.preOpNeutrophilCount,
          postOpDay1BP: apiResponse?.postOpDay1BP,
          postOpDay1HR: apiResponse?.postOpDay1HR,
          postOpDay1RR: apiResponse?.postOpDay1RR,
          postOpDay1BloodUrea: apiResponse?.postOpDay1BloodUrea,
          postOpDay1SerumNa: apiResponse?.postOpDay1SerumNa,
          postOpDay1SerumK: apiResponse?.postOpDay1SerumK,
          postOpDay1SerumCreatinine: apiResponse?.postOpDay1SerumCreatinine,
          postOpDay1HB: apiResponse?.postOpDay1HB,
          postOpDay1WBC: apiResponse?.postOpDay1WBC,
          postOpDay1FBS_mg_dL: apiResponse?.postOpDay1FBS_mg_dL,
          postOpDay1NeutrophilCount_103_uL:
            apiResponse?.postOpDay1NeutrophilCount_103_uL,
          postOpDay1Neutrophil: apiResponse?.postOpDay1Neutrophil,
          postOpD3BP: apiResponse?.postOpD3BP,
          postOpD3HR: apiResponse?.postOpD3HR,
          postOpD3RR: apiResponse?.postOpD3RR,
          postOpD3BloodUrea: apiResponse?.postOpD3BloodUrea,
          postOpD3SerumNa: apiResponse?.postOpD3SerumNa,
          postOpD3SerumK: apiResponse?.postOpD3SerumK,
          postOpD3SerumCreatinine: apiResponse?.postOpD3SerumCreatinine,
          postOpD3HB: apiResponse?.postOpD3HB,
          postOpD3WBC: apiResponse?.postOpD3WBC,
          postOpD3FBS: apiResponse?.postOpD3FBS,
          postOpD3NeutrophilCount_103_uL:
            apiResponse?.postOpD3NeutrophilCount_103_uL,
          postOpD5BP: apiResponse?.postOpD5BP,
          postOpD5HR: apiResponse?.postOpD5HR,
          postOpD5RR: apiResponse?.postOpD5RR,
          postOpD5BloodUrea: apiResponse?.postOpD5BloodUrea,
          postOpD5SerumNa: apiResponse?.postOpD5SerumNa,
          postOpD5SerumK: apiResponse?.postOpD5SerumK,
          postOpD5SerumCreatinine: apiResponse?.postOpD5SerumCreatinine,
          postOpD5HB: apiResponse?.postOpD5HB,
          postOpD5WBC: apiResponse?.postOpD5WBC,
          postOpD5FBS: apiResponse?.postOpD5FBS,
          postOpD5Neutrophil: apiResponse?.postOpD5Neutrophil,
          height_cm: apiResponse?.height_cm,
          weight_kg: apiResponse?.weight_kg,
          bmi: apiResponse?.bmi,
          dateofSurgery: apiResponse?.dateofSurgery,
          hypertension: apiResponse?.hypertension,
          dld: apiResponse?.dld,
          dm: apiResponse?.dm,
          thyroid: apiResponse?.thyroid,
          others: apiResponse?.others,
          ischemicHeartDiseases: apiResponse?.ischemicHeartDiseases,
          other1: apiResponse?.other1,
          other2: apiResponse?.other2,
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
    try {
      const values = await form.validateFields();
      // Call the updateThunk method from the Zustand store to update the record
      values.patientProfileID = patientId;
      values.patientMedicalRecordID = Number(recordId);
      values.patientTypeID = Number(values.patientTypeID);
      await recordsStore.updateThunk(values);
      navigate(-1);
      notification.success({
        message: "Record updated successfully",
        description: "The Record has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating record:", error);
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
                        label="Patient Type"
                        name="patientTypeID"
                        labelCol={{ style: formItemLabelStyle }}
                        wrapperCol={{ style: { width: "96%" } }}
                        labelAlign="left"
                        colon={false}
                      >
                        <Select placeholder="please enter patient type">
                          <Option key={"Public"} value="0">
                            Public
                          </Option>
                          <Option key={"Private"} value="1">
                            Private
                          </Option>
                          <Option key={"Nawaloka"} value="2">
                            Navaloka
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
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
                        name="bhtNumber"
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
                        name="preOpRR_bpm"
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
