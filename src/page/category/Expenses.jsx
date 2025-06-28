import React, { useState } from 'react';
import { message, Table } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDeleteCategoryMutation, useGetCategoryQuery } from '../redux/api/categoryApi';
import EditCategory from './EditCategory';

const Expenses = () => {
     const [editModal, setEditModal] = useState(false);
    const { data: categoryData, isLoading } = useGetCategoryQuery();
const[deleteCategory] = useDeleteCategoryMutation()
    // Only include categoryType === "EXPENSE"
    const filteredData = categoryData?.data?.filter(
        (item) => item.categoryType === "EXPENSE"
    ) || [];

    const dataSource = filteredData.map((item, index) => ({
        key: item._id,
        no: index + 1,
        categoryType: item?.categoryType,
        name: item.categoryName,
        price: `$${item.price}`,
    }));

    console.log(dataSource)
       const [selectedProduct, setSelectedProduct] = useState(null);
    const handleEdit = (record) => {
        console.log(record)
        setSelectedProduct(record);
        setEditModal(true);
        // Edit logic goes here
    };
 const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteCategory(id).unwrap();
      message.success(res?.message );
    } catch (err) {
      message.error(err?.data?.message );
    }
  };
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
                    <button onClick={() => handleEdit(record)} className="text-[#017FF4]">
                        <FaEdit className="w-6 h-6" />
                    </button>
                    <button onClick={() => handleDeleteFaq(record?.key)}>
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
            <EditCategory editModal={editModal} setEditModal={setEditModal} selectedProduct={selectedProduct}></EditCategory>
        </div>
    );
};

export default Expenses;
