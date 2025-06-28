import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Navigate from "../Navigate";
import AddSubscription from "./AddSubscription";
import EditSubscription from "./EditSubscription";
import { useDeleteSubscriptionMutation, useGetSubscriptionQuery } from "../redux/api/categoryApi";
import { message } from "antd";

const Subscription = () => {
  const { data: subscriptionData, isLoading } = useGetSubscriptionQuery();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteSub] = useDeleteSubscriptionMutation()
  const handleEdit = (record) => {
    console.log(record)
    setSelectedProduct(record);
    setEditModal(true);
    // Edit logic goes here
  };
  const subscriptions = subscriptionData?.subscriptions || [];

  const handleDeleteFaq = async (id) => {
    console.log(id)
        try {
            const res = await deleteSub(id).unwrap();
            message.success(res?.message);
        } catch (err) {
            message.error(err?.data?.message);
        }
    };
  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <Navigate title={"Subscriptions"} />
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-gradient-to-r from-[#017FF4] to-blue-300 px-5 py-2 text-white rounded"
        >
          Create Subscription
        </button>
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          subscriptions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white shadow rounded-md p-6 "
            >
              {/* Title */}
               <div className="   flex justify-end gap-3 text-sm text-black">
                <button
                onClick={() => handleDeleteFaq(sub?._id)}
                  aria-label="Delete"
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleEdit(sub)}

                  aria-label="Edit"
                  className="text-[#017FF4] hover:text-blue-700"
                  title="Edit"
                >
                  <FaEdit />
                </button>
              </div>
              <h2 className="font-semibold text-lg">{sub.name}</h2>

              {/* Icons: Delete and Edit */}
             

              {/* Price and Validity */}
              <div className="mt-4 flex justify-between font-semibold text-gray-700">
                <span>Price :</span>
                <span className="text-[#017FF4]">${sub.price}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-700">
                <span>Validity :</span>
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
          ))
        )}
      </div>

      {/* Modals */}
      <AddSubscription
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
      <EditSubscription editModal={editModal} setEditModal={setEditModal} selectedProduct={selectedProduct} />
    </div>
  );
};

export default Subscription;
