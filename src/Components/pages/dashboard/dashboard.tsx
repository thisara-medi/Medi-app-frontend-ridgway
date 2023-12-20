import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import ReportSummeryCard from "../../custom-components/ReportSummeryCard";
import { useDashboardStore } from "../../../stores/DashBoardStore"; // Update with the correct path

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [totalPatients, setTotalPatients] = useState(0);
  const [newPatientsToday, setnewPatientsToday] = useState(0);
  const [newPatientsThisWeek, setnewPatientsThisWeek] = useState(0);
  const [activePatients, setactivePatients] = useState(0);

  const { fetchData, isLoading } = useDashboardStore();

  useEffect(() => {
    getDashboardStats();
  }, []);

  const getDashboardStats = async () => {
    try {
      const statsRes = await fetchData();

      console.log("stats api works.....................");
      console.log(statsRes[0].totalPatients);
      setTotalPatients(statsRes[0].totalPatients);
      setnewPatientsToday(statsRes[0].newPatientsToday);
      setnewPatientsThisWeek(statsRes[0].newPatientsThisWeek);
      setactivePatients(statsRes[0].activePatients);
    } catch (error) {
      console.error("Error login:", error);
    }
  };

  return (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "black" }}>Dashboard</h3>
      <div>
        <Row style={{ marginBottom: 15 }}>
          <Col md={6} style={{ padding: 10 }}>
            <ReportSummeryCard
              name="Patients Total"
              value={String(totalPatients)}
              increment="+2.5%"
            />

            <div style={{ marginTop: 15 }}>
              <ReportSummeryCard
                name="New This Week"
                value={String(newPatientsThisWeek)}
                increment={`${(
                  (newPatientsThisWeek / totalPatients) *
                  100
                ).toFixed(2)}%`}
              />
            </div>
          </Col>

          <Col md={6} style={{ padding: 10 }}>
            <ReportSummeryCard
              name="New Patients Today"
              value={String(newPatientsToday)}
              increment={`${((newPatientsToday / totalPatients) * 100).toFixed(
                2
              )}%`}
            />

            <div style={{ marginTop: 15 }}>
              <ReportSummeryCard
                name="Active Patients"
                value={String(activePatients)}
                increment={`${((activePatients / totalPatients) * 100).toFixed(
                  2
                )}%`}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
