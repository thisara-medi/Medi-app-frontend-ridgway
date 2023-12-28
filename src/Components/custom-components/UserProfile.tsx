import { Avatar, Col, Row, Typography, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";

const UserProfile = () => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const { user } = useAuthStore();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
    authStore.setAuthentication(false);
  }
  const items: MenuProps["items"] = [
    {
      label: <a onClick={logout}>Log Out</a>,
      key: "0",
    },
  ];
  return (
    <Row
      style={{
        marginInlineEnd: "40px",
        alignItems: "center",
      }}
    >
      <Col style={{ marginTop: "5px" }}>
        {/* <BellOutlined
          style={{
            fontSize: "24px",
            marginInlineEnd: "20px",
          }}
        /> */}
      </Col>
      <Col style={{ marginTop: "0px" }}>
        <Avatar
          size={"large"}
          src={undefined}
          icon={<UserOutlined />}
          style={{ fontSize: "20px" }}
        />
      </Col>
      <Col
        style={{
          marginInlineStart: "20px",
          columnGap: 0,
          marginTop: "5px",
        }}
      >
        <Row style={{ marginTop: "0px", gap: 0 }}>
          <Text style={{ fontSize: "16px" }} strong>
            {user.username}
          </Text>
        </Row>
        <Row style={{ paddingTop: "-10px" }}>
          <Text
            style={{ fontSize: "14px", paddingTop: "opx" }}
            type="secondary"
          >
            Admin
          </Text>
        </Row>
      </Col>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Col style={{ marginLeft: "10px", cursor: "pointer" }}>
          <DownOutlined
            style={{
              fontSize: 12,
            }}
          />
        </Col>
      </Dropdown>
    </Row>
  );
};

export default UserProfile;
