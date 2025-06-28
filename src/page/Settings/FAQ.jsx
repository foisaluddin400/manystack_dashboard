import { Button, Form, Input, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { FiPhone } from 'react-icons/fi';
import { GoArrowLeft } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { PlusOutlined, MinusCircleOutlined, } from "@ant-design/icons";
import Navigate from '../Navigate';
import { useAddContactMutation, useGetContactQuery } from '../redux/api/categoryApi';

const FAQ = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { data: contactData } = useGetContactQuery()
    const contact = contactData?.data || [];
    const [addContact] = useAddContactMutation()
    useEffect(() => {
        form.setFieldsValue({ cooking: [""], ingredients: [""], nutrition: [""] });
    }, [form]);
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
    const handleSubmit = async (values) => {
        setLoading(true);
        const data = {
            email: values.ingredients
        };

        try {

            const response = await addContact(data).unwrap();
            message.success(response.message);

            form.resetFields();
            
        } catch (error) {
            console.log(error);
            message.error(error?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
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
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            className="px-2"
                        >
                            <Form.List name="ingredients" >
                                {(fields, { add, remove }) => (
                                    <>
                                        <div className="pb-2">Add Contact</div>
                                        {fields.map((field) => (
                                            <div key={field.key} className="grid grid-cols-12 mb-2">
                                                <Form.Item
                                                    className="col-span-11"
                                                    {...field}
                                                    name={[field.name]}
                                                    rules={[{ required: true, message: "Required" }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                {fields.length > 1 && (
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(field.name)}
                                                        className="ml-5 text-red-500"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}
                                            >
                                                Add Ingredient
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <div className='flex items-center justify-center'>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 mt-2 bg-gradient-to-r from-[#017FF4] to-blue-300 text-white rounded-md"
                                >
                                    {loading ? <Spin size="small" /> : "Add"}
                                </button>
                            </div>
                        </Form>
                    </div>
                    <ul className="mt-2 space-y-1 text-gray-600 list-disc list-inside">
                        <h1 className='text-xl  pb-5'>All Write</h1>
                        {contact?.email?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>


            {/* Save Button */}

        </div>
    );
};

export default FAQ;