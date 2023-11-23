import { Card} from "antd";

type reportCardProps = {
  name: string;
  value: string;
  increment: string;
};

function ReportSummeryCard({ name, value, increment }: reportCardProps) {
  return (
    <Card bodyStyle={{ padding: 20 }}>
      <h3 style={{ margin: 0 }}>{name}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 25, fontWeight: "bold", margin: 0 }}>{value}</p>
        <p
          style={{
            fontSize: 15,
            margin: 0,
            backgroundColor: "#c2ecea",
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          {increment}
        </p>
      </div>
    </Card>
  );
}

export default ReportSummeryCard;
