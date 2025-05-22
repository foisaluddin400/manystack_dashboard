import { Input, message } from 'antd';
import React, { useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { FiPhone } from 'react-icons/fi';
import { GoArrowLeft } from 'react-icons/go';
import { Link } from 'react-router-dom';

import Navigate from '../Navigate';

const FAQ = () => {

    
    const [formData, setFormData] = useState({
        callToUs: ["", ""],
        writeToUs: ["", ""]
    });

    // Handle Input Change
    const handleChange = (e, index, type) => {
        const updatedData = { ...formData };
        updatedData[type][index] = e.target.value;
        setFormData(updatedData);
    };

    // Handle Form Submission
    const handleSubmit = async () => {
        // try {
        //     const response = await contact(formData).unwrap();
        //     message.success(response.message || "Contact details updated successfully!");
        // } catch (error) {
        //     console.error("Error updating contact:", error);
        //     message.error(error?.data?.message || "Failed to update contact details!");
        // }
    };

    return (
        <div className='bg-white p-5 rounded-md'>
            <div className="flex justify-between">
                <Navigate title={"Contact Us"} />
                
            </div>

     
           <div className=' max-w-5xl mx-auto mt-20'>
                <div className='grid grid-cols-2 gap-20'>
                <div className='space-y-5'>
                    <p className='flex items-center gap-2 text-xl'><CiMail size={22} /> Write To Us</p>
                    <Input
                        placeholder='example@gmail.com'
                        value={formData.writeToUs[0]}
                        onChange={(e) => handleChange(e, 0, "writeToUs")}
                    />
                    <Input
                        placeholder='example@gmail.com'
                        value={formData.writeToUs[1]}
                        onChange={(e) => handleChange(e, 1, "writeToUs")}
                    />
                </div>
                <div>
                    <h1 className='text-xl  pb-5'>All Write</h1>
              
                        <p className='bg-gray-100 p-1 px-4'>dfg</p>
          
                   
                </div>
                </div>
            </div>
          

            {/* Save Button */}
            <div className='flex items-center justify-center mt-[45vh]'>
                <button
                    className='bg-black text-white px-10 py-3'
                    onClick={handleSubmit}
             
                >
                Save
                </button>
            </div>
        </div>
    );
};

export default FAQ;