import {
  FileTextOutlined,
  StarOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";

interface ProfileSidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const ProfileSidebar = ({ activeMenu, setActiveMenu }: ProfileSidebarProps) => {
  const userLocal = localStorage.getItem("user");
  const user = userLocal ? JSON.parse(userLocal) : null;

  const menuItems = [
    { id: "profile", label: "Hồ sơ của tôi", icon: <FileTextOutlined /> },
    { id: "profile-edit", label: "Chỉnh sửa hồ sơ", icon: <EditOutlined /> },
    { id: "cv", label: "Việc làm đã ứng tuyển", icon: <StarOutlined /> },
    { id: "account", label: "Quản lý tài khoản", icon: <UserOutlined /> },
  ];


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
          {(user?.fullName?.[0] || "U").toUpperCase()}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-gray-900 truncate">
            {user?.fullName || "Tài khoản"}
          </h2>
          <p className="text-gray-500 text-sm truncate">
            {user?.email || "Cập nhật hồ sơ để nhận gợi ý tốt hơn"}
          </p>
        </div>
      </div>


      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition ${
              activeMenu === item.id
                ? "bg-purple-100 text-purple-700 shadow-sm"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
