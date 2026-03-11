import React, { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  EditOutlined,
  UploadOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";
import { message } from "antd";
import HistoryJob from "./Historyjob";

interface ProfileMainProps {
  activeMenu: string;
}

const ProfileMain = ({ activeMenu }: ProfileMainProps) => {
  const [cvFile, setCvFile] = useState<File | null>(null);

  const userLocal = localStorage.getItem("user");
  const user = userLocal ? JSON.parse(userLocal) : null;

  // ================== HANDLE FILE ==================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      message.error("Chỉ hỗ trợ file PDF, DOC, DOCX");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error("File tối đa 5MB");
      return;
    }

    setCvFile(file);
    message.success("Tải file thành công");
  };

  // ================== SUBMIT CV ==================
  const handleSubmitCV = () => {
    if (!cvFile) {
      message.warning("Vui lòng chọn file CV");
      return;
    }

    const formData = new FormData();
    formData.append("file", cvFile);

    // 👉 Sau này bạn tự call API ở đây
    // axios.post("/api/upload-cv", formData)

    console.log("File sẵn sàng gửi:", cvFile);
    message.success("Sẵn sàng gửi lên server");
  };

  // ================== RENDER CONTENT ==================
  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <div className="space-y-6">
            {/* Hồ sơ của tôi */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-6">Hồ sơ của tôi</h2>
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserOutlined className="text-4xl text-gray-400" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full cursor-pointer">
                    <ThunderboltFilled />
                    <span>Trạng thái tìm việc của bạn?</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      Tên : {user?.fullName || "Chưa có tên"}
                    </h3>
                    <p className="text-blue-600">
                      {user?.address || "Chưa có địa chỉ hiện tại"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <MailOutlined />
                      <span>{user?.email || "Chưa có email"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneOutlined />
                      <span>{user?.phone || "Chưa có số điện thoại"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserOutlined />
                      <span>{user?.gender || "Chưa có giới tính"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarOutlined />
                      <span>{user?.dateOfBirth || "Chưa có ngày sinh"}</span>
                    </div>
                  </div>
                </div>

                <EditOutlined className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            {/* ================= CV CỦA TÔI ================= */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">CV của tôi</h2>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {!cvFile ? (
                  <>
                    <label className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg flex items-center gap-2 mx-auto cursor-pointer w-fit">
                      <UploadOutlined />
                      Tải lên CV có sẵn
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>

                    <p className="text-gray-400 text-sm mt-3">
                      Hỗ trợ định dạng: doc, docx, pdf, tối đa 5MB
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-green-600 font-medium">
                      📄 {cvFile.name}
                    </p>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleSubmitCV}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                      >
                        Lưu CV
                      </button>

                      <button
                        onClick={() => setCvFile(null)}
                        className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                )}
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
                  <p className="text-gray-500">
                    Mức lương mong muốn (triệu/tháng)
                  </p>
                  <p className="font-semibold">5 triệu - 7 triệu</p>
                </div>
                <div>
                  <p className="text-gray-500">Ngành nghề</p>
                  <p>
                    Hành chính - Thư ký, An ninh - Bảo vệ, Kiến trúc - Thiết kế
                    nội thất
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Hình thức làm việc</p>
                  <p className="text-blue-600">Thêm hình thức làm việc</p>
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
            <HistoryJob />
          </div>
        );

      case "jobs":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Quản lý việc làm</h2>
            <p className="text-gray-600">
              Nội dung này sẽ được cập nhật sau
            </p>
          </div>
        );

      case "support":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Hỗ trợ và thông báo
            </h2>
            <p className="text-gray-600">
              Nội dung này sẽ được cập nhật sau
            </p>
          </div>
        );

      case "account":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Quản lý tài khoản
            </h2>
            <p className="text-gray-600">
              Nội dung này sẽ được cập nhật sau
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default ProfileMain;