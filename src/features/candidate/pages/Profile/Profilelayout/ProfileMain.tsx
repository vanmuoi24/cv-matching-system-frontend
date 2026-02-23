import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  EditOutlined,
  UploadOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";

interface ProfileMainProps {
  activeMenu: string;
}

const ProfileMain = ({ activeMenu }: ProfileMainProps) => {
  // Content cho mỗi menu
  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <div className="space-y-6">
            {/* Hồ sơ của tôi */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-6">Hồ sơ của tôi</h2>
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative">
                  <UserOutlined className="text-4xl text-gray-400" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full cursor-pointer">
                    <ThunderboltFilled />
                    <span>Trạng thái tìm việc của bạn?</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Tên</h3>
                    <p className="text-blue-600 cursor-pointer">Thêm địa chỉ hiện tại</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <MailOutlined />
                      <span>domuoigghh@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                      <PhoneOutlined />
                      <span>Thêm số điện thoại</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                      <UserOutlined />
                      <span>Thêm giới tính</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                      <CalendarOutlined />
                      <span>Thêm ngày sinh</span>
                    </div>
                  </div>
                </div>
                <EditOutlined className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            {/* CV của tôi */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">CV của tôi</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <button className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg flex items-center gap-2 mx-auto">
                  <UploadOutlined />
                  Tải lên CV có sẵn
                </button>
                <p className="text-gray-400 text-sm mt-3">Hỗ trợ định dạng: doc, docx, pdf, tối đa 5MB</p>
              </div>
            </div>

            {/* Tiêu chí tìm việc */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tiêu chí tìm việc</h2>
                <EditOutlined className="text-gray-400 cursor-pointer" />
              </div>
              <div className="grid grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="text-gray-500">Vị trí công việc</p>
                  <p className="font-semibold">Nhân viên IT</p>
                </div>
                <div>
                  <p className="text-gray-500">Mức lương mong muốn (triệu/tháng)</p>
                  <p className="font-semibold">5 triệu - 7 triệu</p>
                </div>
                <div>
                  <p className="text-gray-500">Ngành nghề</p>
                  <p>Hành chính - Thư ký, An ninh - Bảo vệ, Kiến trúc - Thiết kế nội thất</p>
                </div>
                <div>
                  <p className="text-gray-500">Hình thức làm việc</p>
                  <p className="text-blue-600 cursor-pointer">Thêm hình thức làm việc</p>
                </div>
                <div>
                  <p className="text-gray-500">Địa điểm tìm việc</p>
                  <p>TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "cv":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Trạng trí CV</h2>
            <p className="text-gray-600">Nội dung này sẽ được cập nhật sau</p>
          </div>
        );
      case "jobs":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Quản lý việc làm</h2>
            <p className="text-gray-600">Nội dung này sẽ được cập nhật sau</p>
          </div>
        );
      case "support":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Hỗ trợ và thông báo</h2>
            <p className="text-gray-600">Nội dung này sẽ được cập nhật sau</p>
          </div>
        );
      case "account":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Quản lý tài khoản</h2>
            <p className="text-gray-600">Nội dung này sẽ được cập nhật sau</p>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default ProfileMain;
