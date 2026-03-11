import React, { useState } from "react";
import { Heart, MapPin, DollarSign, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

type Status = "pending" | "interview" | "rejected";

type Job = {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  status?: Status;
};

const fakeAppliedJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Công Ty ABC Tech",
    salary: "15 - 20 triệu",
    location: "TP.HCM",
    status: "pending",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Công Ty XYZ Software",
    salary: "18 - 25 triệu",
    location: "Hà Nội",
    status: "interview",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Startup Tech",
    salary: "12 - 18 triệu",
    location: "Đà Nẵng",
    status: "rejected",
  },
];

const fakeSuggestedJobs: Job[] = [
  {
    id: 4,
    title: "Nhân Viên Bảo Trì Điện",
    company: "Công Ty Sơn Kim",
    salary: "9 - 15 triệu",
    location: "TP.HCM",
  },
  {
    id: 5,
    title: "Nhân Viên Kỹ Thuật Bảo Trì",
    company: "Công Ty Biển Phương",
    salary: "9 - 15 triệu",
    location: "TP.HCM",
  },
];

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-700",
  interview: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabel = {
  pending: "Đang chờ",
  interview: "Phỏng vấn",
  rejected: "Từ chối",
};

const HistoryJob = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredJobs =
    statusFilter === "all"
      ? fakeAppliedJobs
      : fakeAppliedJobs.filter((job) => job.status === statusFilter);

  return (
    <div className=" min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Việc làm đã ứng tuyển
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-medium">Bộ lọc:</span>
            <select
              className="border rounded-xl px-4 py-2 bg-white shadow-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="pending">Đang chờ</option>
              <option value="interview">Phỏng vấn</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>
        </div>

        {/* Applied Jobs */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-600">
              Không có công việc phù hợp
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-sm p-6 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {job.company}
                    </p>
                  </div>

                  {job.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[job.status]}`}
                    >
                      {statusLabel[job.status]}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    <span className="text-blue-600 font-medium">
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Suggested Jobs */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Việc làm gợi ý
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {fakeSuggestedJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {job.company}
                    </p>
                  </div>

                  <Heart className="text-gray-400 hover:text-red-500 cursor-pointer transition" />
                </div>

                <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    <span className="text-blue-600 font-medium">
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryJob;