import React, { useState } from 'react'
import Navigate from '../Navigate';
import { Table } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddAdmin from './AddAdmin';

const Admin = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const dataSource = [
        {
            key: "1",
            no: "1",
            name: "John Doe",
            price: "$3234",
            phone: "+1 9876543210",
            email: "johndoe@example.com",
            location: "New York, USA",
            type : 'Admin'
        },
        {
            key: "2",
            no: "2",
            name: "Jane Smith",
            price: "$3234",
            phone: "+44 1234567890",
            email: "janesmith@example.com",
            location: "London, UK",
            type : 'Admin'
        },
        {
            key: "3",
            no: "3",
            name: "Ali Khan",
            price: "$3234",
            phone: "+92 3345678901",
            email: "alikhan@example.com",
            location: "Karachi, Pakistan",
            type : 'Admin'
        },
        {
            key: "4",
            no: "4",
            name: "Emily Davis",
            price: "$3234",
            phone: "+33 6789012345",
            email: "emilydavis@example.com",
            location: "Paris, France",
            type : 'Admin'
        },

    ];

    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        {
            title: "Name",
            key: "name",
            render: (_, record) => (


                <span>{record.name}</span>

            ),
        },
        { title: "Email", dataIndex: "email", key: "email" },
         { title: "Type", dataIndex: "type", key: "type" },

        {
            title: "Action",
            key: "action",
            align: "end",
            render: (_, record) => {
                return (
                    <div className="flex gap-2 justify-end">

                        <button

                            className=" "
                        >
                            <FaTrash className="w-6 h-6 text-red-500" />

                        </button>
                    </div>
                );
            },
        },
    ];
    return (
        <div className='h-screen'>
            <div className="flex justify-between">
                <Navigate title={"Admin"} />
                <button onClick={() => setOpenAddModal(true)} className="bg-gradient-to-r from-[#017FF4] to-blue-300 px-5 py-2 text-white rounded">Create Admin</button>
            </div>
            <div className='mt-5'>
                <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
            />
            </div>
            <AddAdmin setOpenAddModal={setOpenAddModal}
                openAddModal={openAddModal}></AddAdmin>
        </div>
    )
}

export default Admin