import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button } from "antd";
import PmsLogo from "../assets/logo-temp.png";
import { useAuthStore } from "../stores/AuthStore";

function LoginPage() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [form] = Form.useForm();

  const handleSaveRecord = async () => {
    try {
      const values = await form.validateFields();
      const res = await authStore.authenticateUser(values);

      if (res.token) {
        const loggedUser = res.token;
        console.log("success");
        authStore.addUser({
          username: loggedUser.username,
          token: loggedUser.token,
        });
        
        localStorage.setItem("token", res.token?.token);
        authStore.setAuthentication(true);
        navigate("/");
      } else {
        alert("failed to login");
        console.log("login failed");
      }
      form.resetFields();
    } catch (error) {
      console.error("Error login:", error);
      alert("Error: failed to login");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card bordered={false} style={{ textAlign: "center" }}>
        <img
          src={PmsLogo}
          alt="React Icon"
          style={{ width: "300px", padding: 12 }}
        />
        <p style={{ padding: 15, fontWeight: "bold" }}>Login Account</p>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{ textAlign: "center" }}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 200 }}
              onClick={handleSaveRecord}
            >
              LOG IN
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
