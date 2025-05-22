import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Navigate from "../Navigate";
import AddSubscription from "./AddSubscription";
import EditSubscription from "./EditSubscription";

const Subscription = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
     const handleEdit = (record) => {
    // setSelectedCategory(record);
    setEditModal(true);
  };
  const subscriptions = [
    {
      id: 1,
      title: "Free subscription",
      price: "30$",
      validity: "Monthly",
      features: [
        "up to 50+ appointment",
        "Unlimited video cal",
        "Unlimited Audio call",
      ],
    },
    {
      id: 2,
      title: "Premium subscription",
      price: "30$",
      validity: "Monthly",
      features: [
        "up to 50+ appointment",
        "Unlimited video cal",
        "Unlimited Audio call",
      ],
    },
  ];

  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <Navigate title={"Subscriptions"} />
        <button  onClick={() => setOpenAddModal(true)} className="bg-gradient-to-r from-[#017FF4] to-blue-300 px-5 py-2 text-white rounded">Create Subscription</button>
      </div>
      <div className="flex gap-5 ">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white shadow-lg rounded-md p-6 w-[320px] relative"
          >
            {/* Title */}
            <h2 className="font-semibold text-lg">{sub.title}</h2>

            {/* Icons: Delete and Edit */}
            <div className="absolute top-4 right-4 flex gap-3 text-sm text-gray-600">
              <button
                aria-label="Delete"
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <FaTrash />
              </button>
              <button
              onClick={() => handleEdit(true)}
                aria-label="Edit"
                className="text-[#017FF4] hover:text-blue-700"
                title="Edit"
              >
                <FaEdit />
              </button>
            </div>

            {/* Price and Validity */}
            <div className="mt-4 flex justify-between font-semibold text-gray-700">
              <span>Price</span>
              <span className="text-[#017FF4]">{sub.price}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-700">
              <span>Validity</span>
              <span className="text-[#017FF4]">{sub.validity}</span>
            </div>

            {/* Feature List */}
            <div className="mt-4 font-semibold text-gray-700">Feature list :</div>
            <ul className="mt-2 space-y-1 text-gray-600 list-disc list-inside">
              {sub.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <AddSubscription  setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}></AddSubscription>
        <EditSubscription editModal={editModal}
        setEditModal={setEditModal}></EditSubscription>
    </div>
  );
};

export default Subscription;
