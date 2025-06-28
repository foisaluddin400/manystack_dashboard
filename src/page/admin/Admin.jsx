import React, { useState } from 'react';
import Navigate from '../Navigate';
import { message, Table } from 'antd';
import { FaTrash } from 'react-icons/fa';
import AddAdmin from './AddAdmin';
import { useDeleteAdminMutation, useGetAdminQuery } from '../redux/api/userApi';

const Admin = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: adminData, isLoading } = useGetAdminQuery();
  console.log(adminData);
  const [deleteAdmin] = useDeleteAdminMutation()
   const handleDeleteFaq = async (id) => {
        try {
            const res = await deleteAdmin(id).unwrap();
            message.success(res?.message);
        } catch (err) {
            message.error(err?.data?.message);
        }
    };
  // Dynamic dataSource from API
  const dataSource = adminData?.data?.map((admin, index) => ({
    key: admin._id,
    no: index + 1,
    name: admin.name,
    email: admin.email,
    type: admin.role === "SUPERADMIN" ? "Super Admin" : admin.role,
  })) || [];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "name",
      render: (_, record) => <span>{record.name}</span>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <button onClick={() => handleDeleteFaq(record?.key)} className="">
            <FaTrash className="w-6 h-6 text-red-500" />
          </button>
        </div>
      ),
    },
  ];


  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <Navigate title={"Admin"} />
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-gradient-to-r from-[#017FF4] to-blue-300 px-5 py-2 text-white rounded"
        >
          Create Admin
        </button>
      </div>

      <div className="mt-5">
        <Table
          loading={isLoading}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </div>

      <AddAdmin
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
    </div>
  );
};

export default Admin;
