import React, { useState } from 'react'
import Navigate from '../Navigate';
import { Table } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Expenses = () => {
    const [isModalOpen2, setIsModalOpen2] = useState(false);
      const dataSource = [
            {
                key: "1",
                no: "1",
                name: "John Doe",
                price: "$3234",
                phone: "+1 9876543210",
                email: "johndoe@example.com",
                location: "New York, USA",
            },
            {
                key: "2",
                no: "2",
                name: "Jane Smith",
                 price: "$3234",
                phone: "+44 1234567890",
                email: "janesmith@example.com",
                location: "London, UK",
            },
            {
                key: "3",
                no: "3",
                name: "Ali Khan",
                price: "$3234",
                phone: "+92 3345678901",
                email: "alikhan@example.com",
                location: "Karachi, Pakistan",
            },
            {
                key: "4",
                no: "4",
                name: "Emily Davis",
                 price: "$3234",
                phone: "+33 6789012345",
                email: "emilydavis@example.com",
                location: "Paris, France",
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
            { title: "Price", dataIndex: "price", key: "price" },
           
            {
                title: "Action",
                key: "action",
                    align: "end",
                render: (_, record) => {
                    return (
                        <div className="flex gap-2 justify-end">
                            <button
                               
                                className="text-[#017FF4] "
                            >
                                <FaEdit className="w-6 h-6 " />
                            </button>
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
    <div>
         
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
            />
    </div>
  )
}

export default Expenses