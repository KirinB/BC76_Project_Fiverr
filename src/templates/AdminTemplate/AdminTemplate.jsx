import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Icons from "../../components/icon";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { pathDefault } from "../../common/path";
const { Header, Sider, Content } = Layout;
import "./AdminTemplate.scss";

const AdminTemplate = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    //Kiem tra nguoi dung co dang nhap chua
    const dataString = localStorage.getItem("userInfo");
    if (!dataString) {
      //neu chua dang nhap thi chuyen huong ve trang login
      window.location.href = pathDefault.signIn;
    } else {
      const data = JSON.parse(dataString);
      if (data.user.role !== "ADMIN") {
        window.location.href = pathDefault.homePage;
      }
    }
  }, []);
  return (
    <Layout className="min-h-screen">
      <Sider
        width={250}
        className="bg-slate-800 slider-content"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical h-20 flex items-center justify-center">
          <Icons.logo fill="white" />
        </div>
        <Menu
          mode="inline"
          items={[
            {
              key: "1",
              label: (
                <NavLink
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md inline-block ${
                      isActive || location.pathname == "/admin"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                  to={pathDefault.managerUser}
                >
                  <UserOutlined />
                  <span>Danh sách người dùng</span>
                </NavLink>
              ),
            },
            {
              key: "2",
              label: (
                <NavLink
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md inline-block ${
                      isActive ? "item-active" : ""
                    }`;
                  }}
                  to={pathDefault.managerJob}
                >
                  <VideoCameraOutlined />
                  <span>Danh sách công việc</span>
                </NavLink>
              ),
            },
            {
              key: "3",
              label: (
                <NavLink
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md inline-block ${
                      isActive ? "item-active" : ""
                    }`;
                  }}
                  to={pathDefault.managerComment}
                >
                  <UploadOutlined />
                  <span>Danh sách bình luận</span>
                </NavLink>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
