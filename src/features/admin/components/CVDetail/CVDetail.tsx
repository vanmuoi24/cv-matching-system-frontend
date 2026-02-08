import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Space, Spin, message } from 'antd';
import { LeftOutlined, RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const CVDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState(true);

    // Get PDF URL from navigation state or use mock
    const pdfUrl = location.state?.pdfUrl || "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    function onDocumentLoadError(error: Error) {
        setLoading(false);
        message.error('Failed to load PDF: ' + error.message);
    }

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);

    return (
        <div className="p-6">
            <div className="mb-4">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </div>

            <Card title={`CV Detail (ID: ${id})`} className="shadow-md">
                <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-50 rounded p-4">
                    {!loading && (
                        <Space className="mb-4">
                            <Button
                                disabled={pageNumber <= 1}
                                onClick={previousPage}
                                icon={<LeftOutlined />}
                            >
                                Previous
                            </Button>
                            <span>
                                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                            </span>
                            <Button
                                disabled={pageNumber >= (numPages || -1)}
                                onClick={nextPage}
                                icon={<RightOutlined />}
                            >
                                Next
                            </Button>
                        </Space>
                    )}

                    <div className="border border-gray-200 shadow-lg">
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={<Spin size="large" tip="Loading PDF..." />}
                        >
                            <Page
                                pageNumber={pageNumber}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                scale={1.2}
                            />
                        </Document>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CVDetail;
