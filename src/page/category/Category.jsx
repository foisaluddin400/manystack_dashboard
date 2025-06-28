import React, { useState } from 'react'
import Intervention from './Intervention';
import Expenses from './Expenses';
import Navigate from '../Navigate';
import AddCategory from './AddCategory';

const Category = () => {
    const [activeTab, setActiveTab] = useState("list");
    const [openAddModal, setOpenAddModal] = useState(false);
    
    return (
        <div className='h-screen'>
            <div className="flex justify-between">
                <Navigate title={"Category"} />
                <button onClick={() => setOpenAddModal(true)} className="bg-gradient-to-r from-[#017FF4] to-blue-300 px-5 py-2 text-white rounded">Create Category</button>
            </div>

            <div className="flex gap-4 mt-6  ">
                <button
                    onClick={() => setActiveTab("list")}
                    className={`${activeTab === "list"
                        ? " border-b-2  border-b-[#017FF4] text-[#017FF4] border-[#205D39] rounded-t"
                        : "bg-transparent"
                        } lg:px-7 py-1 text-lg`}
                >
                    Intervention
                </button>
                <button
                    onClick={() => setActiveTab("calendar")}
                    className={`${activeTab === "calendar"
                        ? " border-b-2  border-b-[#017FF4] text-[#017FF4] border-[#205D39] rounded-t"
                        : "bg-transparent"
                        } lg:px-7 py-1 text-lg`}
                >
                    Expenses
                </button>
            </div>


            <div className="mt-4">
                {activeTab === "list" && (
                    <>
                        {/* Pagination Codntrols */}

                        <Intervention></Intervention>
                    </>
                )}

                {activeTab === "calendar" && (
                    <div className="">
                        {/* Calendar View */}
                        <Expenses></Expenses>
                    </div>
                )}
            </div>

            <AddCategory setOpenAddModal={setOpenAddModal}
                openAddModal={openAddModal}></AddCategory>


        </div>
    )
}

export default Category