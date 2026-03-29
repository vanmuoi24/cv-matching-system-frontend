import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Card, Typography, Divider } from "antd";
import { UploadOutlined, SaveOutlined, UserOutlined, SnippetsOutlined, CodeOutlined, RocketOutlined } from "@ant-design/icons";
import type { UploadFile } from 'antd/es/upload/interface';
import { CreateCandidateProfile, UpdateCandidateProfile } from "../../../../../service/Api/CandidateProfile/CandidateProfileAPI";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface CandidateProfileEditProps {
    onCancel?: () => void;
    onSuccess?: () => void;
}

const CandidateProfileEdit: React.FC<CandidateProfileEditProps> = ({ onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    
    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;
    const profile = user?.profile;

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                summary: profile.summary,
                skills: profile.skills,
                experienceYear: profile.experienceYear,
                cvText: profile.cvText
            });
            if (profile.cvFileUrl) {
                setFileList([{
                    uid: '-1',
                    name: 'Current_CV.pdf',
                    status: 'done',
                    url: profile.cvFileUrl,
                }]);
            }
        }
    }, [profile, form]);

    const onFinish = async (values: { summary?: string; skills: string; experienceYear?: string; cvText?: string }) => {
        setLoading(true);
        try {
            if (profile) {
                // Update
                const formData = new FormData();
                formData.append("summary", values.summary || "");
                formData.append("skills", values.skills || "");
                formData.append("experienceYear", values.experienceYear || "");
                formData.append("cvText", values.cvText || "");
                
                if (fileList.length > 0) {
                    const fileToUpload = fileList[0].originFileObj || (fileList[0] as unknown);
                    if (fileToUpload instanceof File || fileToUpload instanceof Blob) {
                        formData.append("cvFile", fileToUpload as File);
                    }
                }

                const res = await UpdateCandidateProfile(user.id, formData);
                if (res.code === 1000) {
                    message.success("Cập nhật hồ sơ thành công!");
                    // Update local storage
                    const newUser = { ...user, profile: res.result };
                    localStorage.setItem("user", JSON.stringify(newUser));
                    if (onSuccess) onSuccess();
                }
            } else {
                // Create
                const formData = new FormData();
                formData.append("userId", user.id.toString());
                formData.append("summary", values.summary || "");
                formData.append("skills", values.skills || "");
                formData.append("experienceYear", values.experienceYear || "");
                formData.append("cvText", values.cvText || "");
                
                if (fileList.length > 0) {
                    const fileToUpload = fileList[0].originFileObj || (fileList[0] as unknown);
                    if (fileToUpload instanceof File || fileToUpload instanceof Blob) {
                        formData.append("cvFile", fileToUpload as File);
                    }
                }

                const res = await CreateCandidateProfile(formData);
                if (res.code === 1000) {
                    message.success("Tạo hồ sơ thành công!");
                    const newUser = { ...user, profile: res.result };
                    localStorage.setItem("user", JSON.stringify(newUser));
                    if (onSuccess) onSuccess();
                }
            }
        } catch (error) {
            console.error(error);
            message.error("Có lỗi xảy ra khi lưu hồ sơ!");
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCVNow = async () => {
        if (!fileList.length || !user?.id) {
            message.warning("Vui lòng chọn file CV trước khi lưu");
            return;
        }
        const fileToUpload = fileList[0].originFileObj || (fileList[0] as unknown);
        if (!(fileToUpload instanceof File || fileToUpload instanceof Blob)) {
            message.info("File CV không có sự thay đổi");
            return;
        }

        const values = form.getFieldsValue();
        if (!profile && (!values.skills || values.skills.trim() === "")) {
            message.error("Vui lòng nhập 'Kỹ năng chuyên môn' trước khi lưu tài liệu lần đầu tiên!");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("cvFile", fileToUpload as File);
            
            formData.append("summary", values.summary || "");
            formData.append("skills", values.skills || "");
            formData.append("experienceYear", values.experienceYear || "");
            formData.append("cvText", values.cvText || "");

            if (profile) {
                const res = await UpdateCandidateProfile(user.id, formData);
                if (res.code === 1000) {
                    message.success("Đã lưu trực tiếp file CV thành công!");
                    const newUser = { ...user, profile: res.result };
                    localStorage.setItem("user", JSON.stringify(newUser));
                    if (onSuccess) onSuccess();
                }
            } else {
                formData.append("userId", user.id.toString());
                const res = await CreateCandidateProfile(formData);
                if (res.code === 1000) {
                    message.success("Đã tạo hồ sơ chứa CV thành công!");
                    const newUser = { ...user, profile: res.result };
                    localStorage.setItem("user", JSON.stringify(newUser));
                    if (onSuccess) onSuccess();
                }
            }
        } catch (error) {
            console.error(error);
            message.error("Lỗi khi tải lên file CV!");
        } finally {
            setLoading(false);
        }
    };

    const uploadProps = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: (file: File) => {
            setFileList([file as unknown as UploadFile]);
            return false;
        },
        fileList,
    };

    return (
        <div className="max-w-4xl mx-auto py-4">
            <Card className="rounded-2xl shadow-md border-none overflow-hidden">
                <div className="bg-linear-to-r from-purple-600 to-indigo-600 p-6 -m-6 mb-8">
                    <Title level={3} className="text-white! mb-0! flex items-center gap-3">
                        <UserOutlined /> Cập nhật Hồ sơ ứng tuyển
                    </Title>
                    <Text className="text-purple-100 opacity-80">Thông tin này sẽ được nhà tuyển dụng nhìn thấy khi bạn ứng tuyển</Text>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="mt-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Item
                            label={<span className="font-bold text-gray-700 flex items-center gap-2"><SnippetsOutlined className="text-purple-500" /> Tóm tắt bản thân</span>}
                            name="summary"
                            className="md:col-span-2"
                        >
                            <TextArea 
                                rows={4} 
                                placeholder="Hãy viết một đoạn ngắn giới thiệu về thế mạnh và mục tiêu nghề nghiệp của bạn..." 
                                className="rounded-xl border-gray-100 hover:border-purple-300 focus:border-purple-500 focus:shadow-none transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-bold text-gray-700 flex items-center gap-2"><CodeOutlined className="text-purple-500" /> Kỹ năng chuyên môn</span>}
                            name="skills"
                            rules={[{ required: true, message: "Vui lòng nhập kỹ năng của bạn" }]}
                        >
                            <Input 
                                placeholder="Ví dụ: Java, React, SQL, Problem Solving..." 
                                className="h-12 rounded-xl border-gray-100 hover:border-purple-300 focus:border-purple-500 focus:shadow-none transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-bold text-gray-700 flex items-center gap-2"><RocketOutlined className="text-purple-500" /> Số năm kinh nghiệm</span>}
                            name="experienceYear"
                        >
                            <Input 
                                placeholder="Ví dụ: 2 năm, 3-5 năm, Intern..." 
                                className="h-12 rounded-xl border-gray-100 hover:border-purple-300 focus:border-purple-500 focus:shadow-none transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-bold text-gray-700">Nội dung CV (Văn bản)</span>}
                            name="cvText"
                            className="md:col-span-2"
                        >
                            <TextArea 
                                rows={6} 
                                placeholder="Dán nội dung từ CV của bạn vào đây để hệ thống AI phân tích tốt hơn..." 
                                className="rounded-xl border-gray-100 hover:border-purple-300 focus:border-purple-500 focus:shadow-none transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-bold text-gray-700">Tải lên file CV (PDF/DOC)</span>}
                            className="md:col-span-2"
                        >
                            <div className="p-6 border-2 border-dashed border-purple-100 rounded-2xl bg-purple-50/30">
                                <div className="flex flex-wrap items-center gap-4">
                                    <Upload {...uploadProps} maxCount={1}>
                                        <Button icon={<UploadOutlined />} className="rounded-lg h-10 border-purple-200 text-purple-700 hover:bg-purple-100">Chọn file CV mới</Button>
                                    </Upload>
                                    
                                    <Button 
                                        type="primary" 
                                        className="h-10 bg-indigo-600 rounded-lg shadow-sm"
                                        loading={loading}
                                        onClick={handleUploadCVNow}
                                        icon={<SaveOutlined />}
                                    >
                                        Xác nhận Lưu CV này
                                    </Button>
                                    
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    Dung lượng tối đa 5MB. Định dạng hỗ trợ: PDF, DOC, DOCX.
                                </div>
                                {profile?.cvFileUrl && (
                                    <div className="mt-4 pt-4 border-t border-purple-100">
                                        <Text className="text-gray-500 text-sm mb-2 block">CV hiện tại của bạn:</Text>
                                        <Button 
                                            type="link" 
                                            href={profile.cvFileUrl} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            icon={<SaveOutlined />}
                                            className="px-0 font-medium text-purple-600 hover:text-purple-800"
                                        >
                                            Xem / Tải về CV đã lưu
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Form.Item>
                    </div>

                    <Divider className="my-8" />

                    <div className="flex justify-end gap-4">
                        <Button 
                            size="large" 
                            className="rounded-xl px-10 h-12 font-medium border-gray-200"
                            onClick={onCancel}
                        >
                            Hủy bỏ
                        </Button>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            icon={<SaveOutlined />} 
                            loading={loading}
                            className="bg-purple-600 rounded-xl px-12 h-12 font-bold shadow-lg shadow-purple-100 border-none"
                        >
                            Lưu thông tin
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CandidateProfileEdit;
