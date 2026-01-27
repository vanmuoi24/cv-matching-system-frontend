import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileTextOutlined,
  SolutionOutlined,
  RobotOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Dropdown,
  Space,
  Avatar,
  Button,
  Breadcrumb,
  Input,
  Badge,
} from "antd";

const { Sider, Content, Header } = Layout;

/* Map title theo route */
const pageTitleMap = {
  "/admin": "Dashboard",
  "/admin/users": "Quản lý người dùng",
  "/admin/cv": "Quản lý CV",
  "/admin/jobs": "Tin tuyển dụng",
  "/admin/ai": "AI lọc CV",
  "/admin/statistics": "Thống kê",
  "/admin/settings": "Cài đặt",
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const currentTitle =
    pageTitleMap[location.pathname as keyof typeof pageTitleMap] || "Admin Panel";

  const menuItems = [
    {
      key: "/admin",
      icon: <AppstoreOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Quản lý người dùng</Link>,
    },
    {
      key: "/admin/jobs",
      icon: <SolutionOutlined />,
      label: <Link to="/admin/jobs">Tin tuyển dụng</Link>,
    },
    {
      key: "/admin/ai",
      icon: <RobotOutlined />,
      label: <Link to="/admin/ai">AI lọc CV</Link>,
    },
      {
      key: "/admin/company",
      icon: <ShopOutlined />,
      label: <Link to="/admin/company">Quản lí công ty</Link>,
    },
    {
      key: "/admin/statistics",
      icon: <BarChartOutlined />,
      label: <Link to="/admin/statistics">Thống kê</Link>,
    },
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      label: <Link to="/admin/settings">Cài đặt</Link>,
    },
  ];

  const dropdownItems = [
    {
      key: "home",
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "logout",
      label: (
        <span
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        theme="light"
        width={230}
        style={{
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          🚀 {collapsed ? "ADM" : "ADMIN PANEL"}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        {/* HEADER */}
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {/* LEFT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />

            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {currentTitle}
              </div>
              <Breadcrumb style={{ fontSize: 12 }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {currentTitle}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              style={{
                width: 220,
                borderRadius: 20,
              }}
            />

            <Badge count={3}>
              <BellOutlined
                style={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
              />
            </Badge>

            <Dropdown
              menu={{ items: dropdownItems }}
              trigger={["click"]}
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar
                  style={{ backgroundColor: "#1677ff" }}
                >
                  A
                </Avatar>
                <span style={{ fontWeight: 500 }}>
                  Admin
                </span>
              </Space>
            </Dropdown>
          </div>
        </Header>

        {/* CONTENT */}
        <Content
          style={{
            padding: 20,
            background: "#f5f6fa",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
