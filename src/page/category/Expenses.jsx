import React from 'react';
import { Table } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGetCategoryQuery } from '../redux/api/categoryApi';

const Expenses = () => {
    const { data: categoryData, isLoading } = useGetCategoryQuery();

    // Only include categoryType === "EXPENSE"
    const filteredData = categoryData?.data?.filter(
        (item) => item.categoryType === "EXPENSE"
    ) || [];

    const dataSource = filteredData.map((item, index) => ({
        key: item._id,
        no: index + 1,
        name: item.categoryName,
        price: `$${item.price}`,
    }));

    console.log(dataSource)

    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        {
            title: "Name",
            key: "name",
            render: (_, record) => <span>{record.name}</span>,
        },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Action",
            key: "action",
            align: "end",
            render: (_, record) => (
                <div className="flex gap-2 justify-end">
                    <button className="text-[#017FF4]">
                        <FaEdit className="w-6 h-6" />
                    </button>
                    <button>
                        <FaTrash className="w-6 h-6 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                loading={isLoading}
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
            />
        </div>
    );
};

export default Expenses;
