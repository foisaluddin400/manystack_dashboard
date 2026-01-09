import React from "react";
import { Input, message, Modal, Table } from "antd";
import { useState } from "react";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import Navigate from "../Navigate";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import {
  useBlockUserMutation,
  useGetAllUserQuery,
  useUnblockUserMutation,
} from "../redux/api/userApi";
import { imageUrl } from "../redux/api/baseApi";
const UserManagement = () => {
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const { data: userData } = useGetAllUserQuery();
  const [selectedUser, setSelectedUser] = useState(null);

  // Table data from API
  const dataSource =
    userData?.data?.map((user, index) => ({
      key: user._id,
      no: index + 1,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.contact,
      profilePicture:
        user.profilePicture ||
        `https://avatar.iran.liara.run/public/${index + 1}`,
      gender: user.gender,
      address: user.address,
      nSiren: user.nSiren,
      isBlocked: user.isBlocked,
    })) || [];

  const handleBlockToggle = async (id, isBlocked) => {
    try {
      const res = isBlocked
        ? await unblockUser(id).unwrap()
        : await blockUser(id).unwrap();

      message.success(
        res?.message || (isBlocked ? "User unblocked!" : "User blocked!")
      );
    } catch (err) {
      message.error(err?.data?.message || "Action failed!");
    }
  };

  // const dataSource = [
  //     {
  //         key: "1",
  //         no: "1",
  //         name: "John Doe",

  //         phone: "+1 9876543210",
  //         email: "johndoe@example.com",
  //         location: "New York, USA",
  //     },
  //     {
  //         key: "2",
  //         no: "2",
  //         name: "Jane Smith",
  //         date: "10/04/2025",
  //         phone: "+44 1234567890",
  //         email: "janesmith@example.com",
  //         location: "London, UK",
  //     },
  //     {
  //         key: "3",
  //         no: "3",
  //         name: "Ali Khan",

  //         phone: "+92 3345678901",
  //         email: "alikhan@example.com",
  //         location: "Karachi, Pakistan",
  //     },
  //     {
  //         key: "4",
  //         no: "4",
  //         name: "Emily Davis",

  //         phone: "+33 6789012345",
  //         email: "emilydavis@example.com",
  //         location: "Paris, France",
  //     },

  // ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.profilePicture}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleBlockToggle(record.key, record.isBlocked)}
            title={record.isBlocked ? "Unblock User" : "Block User"}
          >
            <MdBlockFlipped
              className={`w-8 h-8 ${
                record.isBlocked ? "text-red-500" : "text-green-600"
              }`}
            />
          </button>
          <button
            onClick={() => {
              setSelectedUser(record);
              setIsModalOpen2(true);
            }}
            title="View Details"
          >
            <FaRegEye className="w-8 h-8 text-[#017FF4]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <Navigate title={"User Managements"} />
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />

      <Modal
        open={isModalOpen2}
        centered
        onCancel={() => setIsModalOpen2(false)}
        footer={null}
        width={450}
      >
        {selectedUser && (
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Header with image and role */}
            <div className="bg-blue-100 py-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={
                    `${imageUrl}/${selectedUser.profilePicture}` ||
                    "https://avatar.iran.liara.run/public/24"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mt-2">
                {selectedUser.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {selectedUser.role || "Technicians"}
              </p>
            </div>

            {/* User Details */}
            <div className="px-6 py-4 space-y-3 text-sm">
              <div>
                <p className="text-gray-600 font-semibold">Name</p>
                <p>{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Email</p>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Contact No</p>
                <p>{selectedUser.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Siren no</p>
                <p>{selectedUser.nSiren}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Gender</p>
                <p>{selectedUser.gender}</p>
              </div>
              {selectedUser.address && (
                <div>
                  <p className="text-gray-600 font-semibold">Address</p>
                  <p>
                    {selectedUser.address.streetNo}{" "}
                    {selectedUser.address.streetName},
                    {selectedUser.address.postalCode}{" "}
                    {selectedUser.address.city}, {selectedUser.address.country}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
