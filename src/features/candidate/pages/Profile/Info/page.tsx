import {
  User,
  PenTool,
  Mail,
  Heart,
  Upload,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Code,
} from "lucide-react";
import InfoModal from "../Modal/InfoModal";
import { useRef, useState } from "react";
import instance from "C:/Study/Java/DACN-SmartCV/cv-matching-system-frontend/src/service/Axios/Axios.ts";

// Mock data based on User and CandidateProfile entities
const mockUserData = {
  fullName: "Duy Phát",
  email: "hatranduyphat2004@gmail.com",
  summary: "Chưa cập nhật tóm tắt",
  skills: "Chưa cập nhật kỹ năng",
  experienceYear: "Chưa cập nhật số năm kinh nghiệm",
  cvFileUrl: null,
};

const Info = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(
    mockUserData.cvFileUrl ? "CV đã tải lên" : null,
  );

  const handleUploadCV = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    // Validate type
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      alert("Vui lòng chọn file định dạng pdf, doc, hoặc docx");
      return;
    }

    // Validate size <= 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Kích thước file vượt quá 5MB");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      // Adjust endpoint as backend expects. Using a candidate profile CV endpoint.
      const res = await instance.post("/candidates/profile/cv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      // instance interceptor returns response.data; assume it contains file url
      const uploadedUrl = res?.data?.cvFileUrl ?? res?.cvFileUrl ?? null;
      setUploadedFileName(file.name);
      if (uploadedUrl) {
        // optionally update local mock or state
        // mockUserData.cvFileUrl = uploadedUrl; // don't mutate const in real app
        alert("Tải lên thành công");
      } else {
        alert("Tải lên hoàn tất");
      }
    } catch (err: any) {
      console.error("Upload error", err);
      alert("Có lỗi xảy ra khi tải lên CV");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 800);
    }
  };
  return (
    <div className="">
      <div className="flex justify-between gap-6">
        <div className="space-y-6 flex-2">
          <h2 className="text-xl font-bold text-gray-800">Hồ sơ của tôi</h2>

          {/* Box thông tin cá nhân */}
          <div className="bg-white rounded-xl shadow-sm p-6 relative border border-gray-100">
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                <User size={40} className="text-gray-300" />
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow border">
                  <PenTool size={12} />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-semibold">
                    Trạng thái tìm việc của bạn?
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{mockUserData.fullName}</h3>
                <p
                  onClick={handleOpen}
                  className="text-blue-500 text-sm cursor-pointer hover:underline"
                >
                  {mockUserData.summary}
                </p>
              </div>

              <div className="flex-1 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> <span>{mockUserData.email}</span>
                </div>
                <InfoRow
                  handleOnClick={handleOpen}
                  icon={<Code size={16} />}
                  label={
                    mockUserData.skills !== "Chưa cập nhật kỹ năng"
                      ? mockUserData.skills
                      : "Thêm kỹ năng"
                  }
                />
                <InfoRow
                  handleOnClick={handleOpen}
                  icon={<Briefcase size={16} />}
                  label={
                    mockUserData.experienceYear !==
                    "Chưa cập nhật số năm kinh nghiệm"
                      ? `${mockUserData.experienceYear} năm kinh nghiệm`
                      : "Thêm kinh nghiệm"
                  }
                />
              </div>
            </div>
          </div>

          {/* Box CV */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 cursor-pointer">
            <h3 className="font-bold mb-4">CV của tôi</h3>
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 flex flex-col items-center justify-center bg-purple-50/30">
              <button
                className={`bg-purple-100 text-purple-700 px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-200 transition  cursor-pointer ${
                  uploading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={handleUploadCV}
                disabled={uploading}
              >
                <Upload size={18} /> Tải lên CV có sẵn
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <p className="mt-3 text-xs text-gray-500">
                Hỗ trợ định dạng: doc, docx, pdf, tối đa 5MB
              </p>
              {uploading ? (
                <div className="w-full mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {uploadProgress}%
                  </p>
                </div>
              ) : (
                uploadedFileName && (
                  <p className="mt-3 text-sm text-gray-600">
                    Đã tải lên: {uploadedFileName}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4  flex-1">
          <h2 className="text-xl font-bold text-gray-800">
            Việc làm gợi ý cho bạn
          </h2>

          <JobCard
            title="Full-Stack Developer"
            company="Công Ty TNHH Mobile Oasis"
            salary="13 - 20 triệu"
            location="Bình Dương, TP.HCM"
            daysLeft={25}
          />
          <JobCard
            title="Fresher Developer"
            company="Công Ty TNHH Car Things"
            salary="2 - 3 triệu"
            location="TP.HCM"
            daysLeft={44}
          />
        </div>
      </div>
      <InfoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Info;

const InfoRow = ({ icon, label, handleOnClick }: any) => (
  <div
    onClick={handleOnClick}
    className="flex items-center gap-2 text-blue-500 cursor-pointer hover:underline"
  >
    {icon} <span>{label}</span>
  </div>
);

const JobCard = ({ title, company, salary, location, daysLeft }: any) => (
  <div className="bg-white rounded-xl shadow-sm p-4 border border-transparent hover:border-purple-300 transition relative">
    <div className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-red-500">
      <Heart size={20} />
    </div>
    <h4 className="font-bold text-gray-800 pr-6">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{company}</p>
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2 text-sm text-orange-500 font-medium">
        <DollarSign size={14} /> {salary}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <MapPin size={14} /> {location}
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end text-xs text-gray-400">
      <Clock size={12} className="mr-1" /> Còn {daysLeft} ngày
    </div>
  </div>
);
