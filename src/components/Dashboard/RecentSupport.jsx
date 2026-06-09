import React from 'react';
import { Table } from 'antd';


import dayjs from 'dayjs';
import Navigate from '../../page/Navigate';
import { useGetSupportDataQuery } from '../../page/redux/api/categoryApi';
import { Link } from 'react-router-dom';

const RecentSupport = () => {
    const { data: supportResponse, isLoading, isError } = useGetSupportDataQuery();

    const supports = supportResponse?.supports || [];

    // Sort by newest first and take only latest 5
    const recentSupports = [...supports]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

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
            width: 250,
            render: (text) => (
                <div className="font-medium text-gray-800">{text}</div>
            ),
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            ellipsis: true,
            width: 400,
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
            width: 180,
            render: (date) => (
                <span className="text-gray-600">
                    {dayjs(date).format('DD MMM YYYY, HH:mm')}
                </span>
            ),
        },
    ];

    if (isError) {
        return <div className="p-6 text-red-500">Failed to load support data</div>;
    }

    return (
        <div className="">
       <div className='flex justify-between'>
          <h3 className="text-xl font-semibold text-gray-800 pb-3 ">Recent Support</h3>
          <Link to={'/dashboard/UserManagement'}><button>View All</button></Link>
       </div>

            <div className=" overflow-hidden">
                <Table
                    dataSource={recentSupports}
                    columns={columns}
                    rowKey="_id"
                    loading={isLoading}
                    scroll={{ x: "max-content" }}
                    pagination={false}  
                />
            </div>
        </div>
    );
};

export default RecentSupport;