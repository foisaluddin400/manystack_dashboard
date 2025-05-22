import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin, Button } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";

const AddCategory = ({ openAddModal, setOpenAddModal }) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        form.resetFields();
        setOpenAddModal(false);
    };


    const handleSubmit = async (values) => {
        console.log(values)
        // const formData = new FormData();

        // formData.append("url", values?.url);


        // fileList.forEach((file) => {
        //   formData.append("image", file.originFileObj);
        // });
        // setLoading(true);

        // try {
        //   const res= await adds(formData).unwrap();

        //   setLoading(false);
        //   message.success(res?.message);
        //   setOpenAddModal(false);
        //   setLoading(false);
        //   form.resetFields();
        // } catch (error) {
        //   message.error(` ${error?.data?.message}`);
        //   setLoading(false);
        // }
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
                <h2 className="text-center font-semibold text-xl mb-4">Add New Category</h2>

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
                            { required: true, message: "Please input auction item name!" },
                        ]}
                    >
                        <Input placeholder="Enter auction item name" style={{ borderRadius: "0px", padding: "6px 8px" }} />
                    </Form.Item>

                 
                        <Form.Item
                            label="Price"
                            name="number"
                            rules={[
                                { required: true, message: "Please input number!" },
                            ]}
                        >
                            <Input type="number" placeholder="Enter number" style={{ borderRadius: "0px", padding: "6px 8px" }} />
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

export default AddCategory;
