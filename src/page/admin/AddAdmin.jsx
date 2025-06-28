import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin, Button } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import { useMakeAdminMutation } from "../redux/api/userApi";

const AddAdmin = ({ openAddModal, setOpenAddModal }) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
const [makeAdmin] = useMakeAdminMutation()
    const handleCancel = () => {
        form.resetFields();
        setOpenAddModal(false);
    };


   const handleSubmit = async (values) => {
           setLoading(true);
           const data = {
               name: values.name,
               // categoryType: 'INTERVENTION',
               email: values.email,
               password: values.password,
               userType: 'admin'
           };
   
           try {
   
               const response = await makeAdmin(data).unwrap();
               message.success(response.message);
   
               form.resetFields();
               setOpenAddModal(false);
           } catch (error) {
               console.log(error);
               message.error(error?.data?.message || "Something went wrong!");
           } finally {
               setLoading(false);
           }
       };

    return (
        <Modal
            centered
            open={openAddModal}
            onCancel={handleCancel}
            footer={null}
            width={500}
        >
            <div className="mb-6 mt-2">
                <h2 className="text-center font-semibold text-xl mb-4">Add New Admin</h2>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="px-2"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Please input name!" },
                        ]}
                    >
                        <Input placeholder="Enter auction item name" style={{ borderRadius: "0px", padding: "6px 8px" }} />
                    </Form.Item>

                 
                        <Form.Item
                            label="email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input Email!" },
                            ]}
                        >
                            <Input type="email" placeholder="Enter Email" style={{ borderRadius: "0px", padding: "6px 8px" }} />
                        </Form.Item>
                 

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please Password" },
                            ]}
                        >
                            <Input.Password type="password" placeholder ="Enter Password" style={{ borderRadius: "0px", padding: "6px 8px" }} />
                        </Form.Item>
                




                    {/* Save Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-2 bg-gradient-to-r from-[#017FF4] to-blue-300 text-white rounded-md"
                    >
                        {loading ? <Spin size="small" /> : "Add"}
                    </button>
                </Form>
            </div>
        </Modal>
    );
};

export default AddAdmin;
