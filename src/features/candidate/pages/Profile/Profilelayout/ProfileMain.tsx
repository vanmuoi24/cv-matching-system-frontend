import React, { useState } from "react";
import { message } from "antd";
import HistoryJob from "./HistoryJob";
import ChangePassword from "./ChangePassword";
import { UpdateUser } from "../../../../../service/Api/User/UserAPI";
import { UpdateCandidateProfile, CreateCandidateProfile } from "../../../../../service/Api/CandidateProfile/CandidateProfileAPI";
import { 
  SaveOutlined, 
  CloseOutlined, 
  UserOutlined, 
  MailOutlined, 
  ThunderboltFilled, 
  UploadOutlined, 
  SnippetsOutlined, 
  CodeOutlined, 
  RocketOutlined, 
  EditOutlined, 
  FileTextOutlined,
  CalendarOutlined,
  PhoneOutlined,
  EyeOutlined
} from "@ant-design/icons";

interface ProfileMainProps {
  activeMenu: string;
}

const ProfileMain = ({ activeMenu }: ProfileMainProps) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const userLocal = localStorage.getItem("user");
  const user = userLocal ? JSON.parse(userLocal) : null;
  const profile = user?.profile;

  // ================== HANDLE UPDATE PROFILE ==================
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      // 1. Update User info (fullName)
      const userData = {
        fullName: formData.get("fullName"),
        email: user.email // keep same
      };
      await UpdateUser(user.id, userData);

      // 2. Update Candidate Profile details
      const profileData = {
        summary: formData.get("summary"),
        skills: formData.get("skills"),
        experienceYear: formData.get("experienceYear"),
        cvText: formData.get("cvText")
      };

      if (profile) {
        await UpdateCandidateProfile(user.id, profileData);
      } else {
        const createFormData = new FormData();
        createFormData.append("userId", user.id.toString());
        createFormData.append("summary", profileData.summary?.toString() || "");
        createFormData.append("skills", profileData.skills?.toString() || "");
        createFormData.append("experienceYear", profileData.experienceYear?.toString() || "");
        createFormData.append("cvText", profileData.cvText?.toString() || "");
        if (cvFile) {
          createFormData.append("cvFile", cvFile);
        }
        await CreateCandidateProfile(createFormData);
      }

      // Update local storage - in real app would get fresh data from server
      const updatedUser = { 
        ...user, 
        fullName: userData.fullName,
        profile: { 
          ...user.profile, 
          ...profileData,
          cvFileUrl: cvFile ? URL.createObjectURL(cvFile) : user.profile?.cvFileUrl 
        } 
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      message.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      message.error("Có lỗi xảy ra khi cập nhật hồ sơ!");
    } finally {
      setLoading(false);
    }
  };

  // ================== HANDLE FILE ==================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
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

  // ================== RENDER CONTENT ==================
  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Header / Info Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex gap-8">
                  <div className="relative">
                    <div className="w-32 h-32 bg-purple-50 rounded-4xl flex items-center justify-center border-4 border-white shadow-sm overflow-hidden group">
                      <UserOutlined className="text-4xl text-purple-300 transition-all duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="space-y-4 py-2">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                      <ThunderboltFilled className="text-purple-500 animate-pulse" />
                      <span>Trạng thái tìm việc</span>
                    </div>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-black uppercase tracking-widest text-purple-400 ml-1">Họ và tên</label>
                          <input 
                            name="fullName"
                            defaultValue={user?.fullName}
                            className="w-full text-2xl font-black text-[#2f0d7b] bg-gray-50/50 border-gray-100 rounded-xl px-4 py-2 outline-none focus:border-purple-300 transition-all"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-3xl font-black text-[#2f0d7b] mb-1">
                          {user?.fullName || "Chưa có tên"}
                        </h1>
                        <p className="text-purple-400 font-bold flex items-center gap-2 leading-none">
                          <MailOutlined className="mt-0.5" />
                          {user?.email || "Chưa có email"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {!isEditing ? (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-white px-8 py-3.5 rounded-2xl border border-gray-100 text-[#2f0d7b] font-black text-[13px] uppercase tracking-widest shadow-sm transition-all hover:bg-gray-50 hover:border-purple-200 active:scale-95 flex items-center gap-3 cursor-pointer group"
                  >
                    <EditOutlined className="text-purple-400 group-hover:rotate-12 transition-transform" />
                    Chỉnh sửa hồ sơ
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-50/50 px-8 py-3.5 rounded-2xl text-gray-400 font-black text-[13px] uppercase tracking-widest transition-all hover:bg-gray-100 active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <CloseOutlined />
                      Hủy bỏ
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="bg-[#2f0d7b] px-10 py-3.5 rounded-2xl text-white font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-[#4fccff]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 disabled:opacity-50 border-none relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                      <SaveOutlined className="text-[#4fccff]" />
                      {loading ? 'Đang lưu...' : 'Lưu hồ sơ'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Content Section */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${isEditing ? 'opacity-100' : 'opacity-100'}`}>
              <div className="md:col-span-2 space-y-6">
                {/* Summary Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <SnippetsOutlined className="text-purple-600" />
                    </div>
                    <h2 className="text-lg font-black text-[#2f0d7b] uppercase tracking-wide">Tóm tắt bản thân</h2>
                  </div>
                  {isEditing ? (
                    <textarea 
                      name="summary"
                      defaultValue={profile?.summary}
                      rows={4}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-6 outline-none focus:border-purple-300 focus:bg-white transition-all font-medium text-gray-700 leading-relaxed"
                      placeholder="Chia sẻ một chút về thế mạnh của bạn..."
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {profile?.summary || "Bạn chưa bổ sung thông tin tóm tắt."}
                    </p>
                  )}
                </div>

                {/* Skills Section - NOW LARGER AND IN MAIN COLUMN */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <CodeOutlined className="text-xl text-purple-600" />
                    </div>
                    <h2 className="text-xl font-black text-[#2f0d7b] uppercase tracking-wide">Kỹ năng chuyên môn</h2>
                  </div>
                  {isEditing ? (
                    <input 
                      name="skills"
                      defaultValue={profile?.skills}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-6 py-4 outline-none focus:border-purple-300 transition-all font-bold text-[#2f0d7b] text-lg"
                      placeholder="Ví dụ: Java, React, SQL, Project Management..."
                    />
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {profile?.skills?.split(",").map((skill: any, idx: number) => (
                        <span key={idx} className="bg-purple-50 text-purple-700 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider border-2 border-purple-100/50 hover:bg-purple-100 hover:border-purple-200 transition-all cursor-pointer">
                          {skill.trim()}
                        </span>
                      )) || <span className="text-gray-400 font-medium italic">Chưa cập nhật kỹ năng</span>}
                    </div>
                  )}
                </div>

                {/* Experience Section - NOW LARGER AND IN MAIN COLUMN */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group transition-all duration-300 hover:shadow-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:bg-purple-100"></div>
                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <RocketOutlined className="text-xl text-purple-600" />
                    </div>
                    <h2 className="text-xl font-black text-[#2f0d7b] uppercase tracking-wide">Kinh nghiệm làm việc</h2>
                  </div>
                  <div className="relative z-10">
                    {isEditing ? (
                      <div className="flex items-center gap-4">
                        <input 
                          name="experienceYear"
                          defaultValue={profile?.experienceYear}
                          className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-6 py-4 outline-none focus:border-purple-300 transition-all font-black text-[#2f0d7b] text-2xl"
                          placeholder="Vd: 2 năm, Fresher..."
                        />
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-[#2f0d7b] tracking-tighter">
                          {profile?.experienceYear?.split(" ")[0] || "---"}
                        </span>
                        <span className="text-xl font-bold text-gray-400 uppercase tracking-widest italic">
                          {profile?.experienceYear?.split(" ").slice(1).join(" ") || ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CV Content Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <FileTextOutlined className="text-purple-600" />
                    </div>
                    <h2 className="text-lg font-black text-[#2f0d7b] uppercase tracking-wide">Nội dung CV</h2>
                  </div>
                  {isEditing ? (
                    <textarea 
                      name="cvText"
                      defaultValue={profile?.cvText}
                      rows={10}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-6 outline-none focus:border-purple-300 focus:bg-white transition-all font-medium text-gray-700 leading-relaxed"
                      placeholder="Dán nội dung từ CV văn bản của bạn vào đây..."
                    />
                  ) : (
                    <div className="text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                      {profile?.cvText || "Hệ thống sẽ hiển thị nội dung CV của bạn tại đây."}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* CV File Upload Section - NOW ONLY FILE ON THE RIGHT */}
                <div className="bg-[#2f0d7b] rounded-3xl p-8 shadow-xl shadow-purple-100 relative overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-600/30 transition-all duration-500"></div>
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <UploadOutlined className="text-[#4fccff]" />
                    </div>
                    <h2 className="text-lg font-black text-white uppercase tracking-wide">Tệp CV</h2>
                  </div>

                  {!cvFile && !profile?.cvFileUrl ? (
                    <div className="relative z-10">
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:bg-white/5 transition-all text-center">
                        <UploadOutlined className="text-3xl text-white/50 mb-3" />
                        <span className="text-white text-sm font-black uppercase tracking-wider">Tải lên CV</span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                      </label>
                    </div>
                  ) : (
                    <div className="relative z-10 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#4fccff]/20 rounded-lg flex items-center justify-center">
                          <FileTextOutlined className="text-[#4fccff]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-black truncate">{cvFile?.name || "Candidate_CV.pdf"}</p>
                          <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Đã tải lên</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {(cvFile || profile?.cvFileUrl) && (
                          <button 
                            type="button"
                            onClick={() => window.open(cvFile ? URL.createObjectURL(cvFile) : profile?.cvFileUrl, "_blank")}
                            className="bg-[#4fccff] py-3 rounded-xl text-center text-[#2f0d7b] text-[11px] font-black uppercase tracking-widest cursor-pointer hover:bg-[#3db8e6] transition-all flex items-center justify-center gap-2"
                          >
                            <EyeOutlined />
                            Xem CV
                          </button>
                        )}
                        <label className="bg-white/10 py-3 rounded-xl text-center text-white text-[11px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                          Thay đổi
                          <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        );

      case "cv":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <HistoryJob />
          </div>
        );

      case "profile-edit":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-md">
             <div className="bg-purple-50 text-purple-700 px-6 py-3 rounded-2xl font-bold text-center mb-4">
                Mục này đã được gộp vào hồ sơ cá nhân của bạn
             </div>
             <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-[#2f0d7b] text-white py-3 rounded-2xl font-black uppercase tracking-widest"
             >
                Chuyển qua hồ sơ
             </button>
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
            <ChangePassword />
          </div>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default ProfileMain;