import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Divider, Tag, Typography, Empty, Skeleton } from 'antd';
import {
    GlobalOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    SendOutlined,
    CalendarOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import Container from '../../../../../shared/components/Container';
import { GetCompanyById } from '../../../../../service/Api/Company/Company';
import type { ICompany } from '../../../../../types/TypeCompany';
import { formatSalary } from '../../../../../shared/utils/formatSalary';

const { Title, Paragraph, Text } = Typography;

const CompanyDetail: React.FC = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const [company, setCompany] = useState<ICompany | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = async () => {
            if (!companyId) return;
            setLoading(true);
            try {
                const res = await GetCompanyById(Number(companyId));
                if (res.code === 1000 && res.result) {
                    setCompany(res.result);
                }
            } catch (error) {
                console.error('Error fetching company details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, [companyId]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-50/50 min-h-screen py-10">
                <Container>
                    <Skeleton active avatar paragraph={{ rows: 10 }} />
                </Container>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Empty description="Không tìm thấy thông tin công ty" />
            </div>
        );
    }

    const jobList = company.jobList || [];

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20 mt-5">
            <Container>
                {/* --- HEADER --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 relative">
                    <div className="h-48 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-500">
                         {/* Optional cover pattern */}
                         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-size-[24px_24px]"></div>
                    </div>
                    <div className="px-8 pb-8 pt-0 relative">
                        <div className="flex flex-col md:flex-row gap-6 -mt-12 items-end md:items-center">
                            <div className="p-2 bg-white rounded-2xl shadow-xl shrink-0">
                                <Avatar 
                                    shape="square" 
                                    size={120} 
                                    src={company.logoUrl}
                                    className="rounded-xl border border-gray-50 bg-gray-50"
                                >
                                    {!company.logoUrl && company.name?.charAt(0)}
                                </Avatar>
                            </div>
                            <div className="flex-1 mt-4 md:mt-10">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                                    <div>
                                        <Title level={1} className="mb-1! text-gray-900! drop-shadow-sm font-black">
                                            {company.name}
                                        </Title>
                                        <div className="flex flex-wrap gap-4 text-gray-500 mt-2">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <GlobalOutlined className="text-purple-500" />
                                                <a href={company.website} target="_blank" rel="noreferrer" className="hover:text-purple-700 transition-colors">
                                                    {company.website?.replace(/^https?:\/\//, '')}
                                                </a>
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <EnvironmentOutlined className="text-purple-500" />
                                                Hồ Chí Minh, Việt Nam
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <TeamOutlined className="text-purple-500" />
                                                50-100 nhân viên
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button 
                                            icon={<ShareAltOutlined />} 
                                            className="rounded-full border-gray-200 hover:border-purple-500 hover:text-purple-700 hover:bg-purple-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- LEFT: COMPANY INFO --- */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <Title level={4} className="mb-6! flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
                                Giới thiệu công ty
                            </Title>
                            <div 
                                className="text-gray-600 leading-relaxed prose prose-purple max-w-none text-[15px]"
                                dangerouslySetInnerHTML={{ __html: company.description || 'Đang cập nhật thông tin...' }}
                            />
                        </div>

                        {/* Why Join Us */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <Title level={4} className="mb-6! flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
                                Tại sao nên gia nhập?
                            </Title>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: 'Môi trường hiện đại', icon: '💻', desc: 'Làm việc trong không gian mở, đầy đủ tiện nghi.' },
                                    { title: 'Phúc lợi hấp dẫn', icon: '🎁', desc: 'Bảo hiểm cao cấp, thưởng lễ tết và du lịch hàng năm.' },
                                    { title: 'Cơ hội thăng tiến', icon: '📈', desc: 'Lộ trình phát triển sự nghiệp rõ ràng, đào tạo bài bản.' },
                                    { title: 'Văn hóa năng động', icon: '⚽', desc: 'Team building, sự kiện gắn kết diễn ra thường xuyên.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-5 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-purple-100 transition-all group">
                                        <div className="text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                                        <div className="font-bold text-gray-800 mb-1">{item.title}</div>
                                        <div className="text-sm text-gray-500 leading-relaxed">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: RECRUITING --- */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Jobs List */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <Title level={4} className="mb-0!">Vị trí đang tuyển</Title>
                                <Tag color="purple" className="rounded-full px-3">{jobList.length}</Tag>
                            </div>

                            {jobList.length > 0 ? (
                                <div className="space-y-4 max-h-130 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
                                    {jobList.map((job) => (
                                        <div 
                                            key={job.id} 
                                            onClick={() => navigate(`/ca/job/${job.id}`)}
                                            className="group p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer relative overflow-hidden"
                                        >
                                            <div className="absolute right-0 top-0 h-full w-1 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <h5 className="font-bold text-gray-800 group-hover:text-purple-700 transition line-clamp-1 mb-2">
                                                {job.title}
                                            </h5>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded">
                                                        {formatSalary(job.minSalary, job.maxSalary)}
                                                    </span>
                                                    <span className="text-gray-400">
                                                        {job.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <CalendarOutlined />
                                                        {new Date(job.createAt).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1 uppercase tracking-tighter">
                                                        {job.jobType}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 text-center">
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có tin tuyển dụng nào" />
                                </div>
                            )}

                            <Divider className="my-6" />
                            
                            <Button 
                                block 
                                size="large" 
                                className="rounded-xl border-purple-200 text-purple-700 font-semibold hover:bg-purple-50 h-12"
                            >
                                Xem tất cả việc làm
                            </Button>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CompanyDetail;
