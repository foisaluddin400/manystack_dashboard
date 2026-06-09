import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import Navigate from '../Navigate';
import { useGetSupportDataQuery } from '../redux/api/categoryApi';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const Support = () => {
    const { data: supportResponse, isLoading, isError } = useGetSupportDataQuery();

    const supports = supportResponse?.supports || [];

    // Table Columns
    const columns = [
        {
            title: 'Ticket ID',
            dataIndex: '_id',
            key: '_id',
            width: 120,
            render: (id) => (
                <span className="font-mono text-xs text-gray-500">
                    {id?.slice(-8)}
                </span>
            ),
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            width: 220,
            render: (text) => (
                <div className="font-medium text-gray-800">{text}</div>
            ),
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            ellipsis: true,
            width: 350,
            render: (text) => (
                <div className="text-gray-600 line-clamp-2">{text}</div>
            ),
        },
        {
            title: 'User ID',
            dataIndex: 'user',
            key: 'user',
            width: 140,
            render: (userId) => (
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {userId?.slice(-8)}
                </span>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 160,
            render: (date) => (
                <span className="text-gray-600">
                    {dayjs(date).format('DD MMM YYYY, HH:mm')}
                </span>
            ),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        // {
        //     title: 'Actions',
        //     key: 'actions',
        //     width: 120,
        //     render: (_, record) => (
        //         <Space>
        //             <Button 
        //                 type="primary" 
        //                 icon={<EyeOutlined />}
        //                 size="small"
        //                 onClick={() => handleView(record)}
        //             >
        //                 View
        //             </Button>
        //             <Button 
        //                 danger 
        //                 icon={<DeleteOutlined />}
        //                 size="small"
        //                 onClick={() => handleDelete(record._id)}
        //             />
        //         </Space>
        //     ),
        // },
    ];

    const handleView = (record) => {
        // You can open a modal or navigate to detail page
        alert(`Viewing Support Ticket: ${record.subject}\n\n${record.message}`);
        console.log("Selected Support:", record);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this support ticket?")) {
            console.log("Delete Support ID:", id);
            // Call delete mutation here if you have one
        }
    };

    if (isError) {
        return <div className="p-6 text-red-500">Failed to load support data</div>;
    }

    return (
        <div className="">
            <div className="mb-6">
                <Navigate title="User Managements" />
            </div>

            <div className="bg-white  overflow-hidden">
                <Table
                    dataSource={supports}
                    columns={columns}
                    rowKey="_id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} tickets`,
                    }}
                    loading={isLoading}
                    scroll={{ x: "max-content" }}
                />
            </div>
        </div>
    );
};

export default Support;