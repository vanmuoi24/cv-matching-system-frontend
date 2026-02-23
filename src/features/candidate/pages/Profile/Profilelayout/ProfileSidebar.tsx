import {
  FileTextOutlined,
  StarOutlined,
  CarOutlined,
  BellOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";

interface ProfileSidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const ProfileSidebar = ({ activeMenu, setActiveMenu }: ProfileSidebarProps) => {
  const menuItems = [
    { id: "profile", label: "Hồ sơ của tôi", icon: <FileTextOutlined /> },
    { id: "cv", label: "Trạng trí CV", icon: <StarOutlined /> },
    { id: "jobs", label: "Quản lý việc làm", icon: <CarOutlined />, hasArrow: true },
    { id: "support", label: "Hỗ trợ và thông báo", icon: <BellOutlined />, hasArrow: true },
    { id: "account", label: "Quản lý tài khoản", icon: <UserOutlined /> },
  ];

  return (
    <div className="p-6 space-y-6 h-full">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Tên</h2>
        <p className="text-gray-500 mt-1">Nhân viên IT</p>
      </div>

      {/* Toggle Box */}
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
        <span className="text-gray-700 font-medium">
          Cho phép Nhà tuyển dụng tìm bạn
        </span>
        <Switch />
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition ${
              activeMenu === item.id
                ? "bg-purple-100 text-purple-700"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            {item.hasArrow && (
              <RightOutlined className="text-gray-400 text-xs" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
