import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileDoneOutlined,
  DashboardOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import PmsLogo from "../assets/logo-temp.png";
import { Outlet, useNavigate } from "react-router-dom";
import UserProfile from "./custom-components/UserProfile";

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="demo-logo-vertical" />
        <a href="/">
          <img
            src={PmsLogo}
            alt="React Icon"
            style={{ width: "90%", padding: 12 }}
          />
        </a>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/"),
            },
            {
              key: "2",
              icon: <UserAddOutlined />,
              label: "Register New Patient",
              onClick: () => navigate("/patient-registration"),
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "Patient Management",
              onClick: () => navigate("/PatientManagement"),
            },
            {
              key: "4",
              icon: <FileDoneOutlined/>,
              label: "Patient Reports",
              onClick: () => navigate("/patient-reports"),
            },
            // {
            //   key: "4",
            //   icon: <SettingOutlined />,
            //   label: "Settings",
            //   onClick: () => navigate("/settings"), // TODO: Once settings page is ready, route will work
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <UserProfile />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
