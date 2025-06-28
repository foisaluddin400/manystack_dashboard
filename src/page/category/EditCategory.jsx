import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAddCategoryMutation, useUpdateCategoryMutation } from "../redux/api/categoryApi";

const EditCategory = ({ editModal, setEditModal, selectedProduct }) => {
    console.log(selectedProduct)
    const id = selectedProduct?.key
    const [updateCategory] = useUpdateCategoryMutation()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        form.resetFields();
        setEditModal(false);
    };


    const handleSubmit = async (values) => {
        setLoading(true);
        const data = {
            categoryType: selectedProduct.categoryType,
            // categoryType: 'INTERVENTION',
            categoryName: values.name,
            price: values.price

        };

        try {

            const response = await updateCategory({data,id}).unwrap();
            message.success(response.message);

            form.resetFields();
            setEditModal(false);
        } catch (error) {
            console.log(error);
            message.error(error?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

        useEffect(() => {
            if (selectedProduct) {
    const rawPrice = selectedProduct?.price || "";
      const numericPrice = Number(rawPrice.replace(/[^0-9.]/g, ""));
    
                form.setFieldsValue({
                    name: selectedProduct?.name || "",
                    categoryType: selectedProduct?.categoryType || "",
                    price: isNaN(numericPrice) ? "" : numericPrice,
                   
                });
            }
        }, [selectedProduct, form]);
    return (
        <Modal
            centered
            open={editModal}
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
                        label="Category Type"
                        name="categoryType"
                        rules={[{ required: true, message: "Please select Categoey type" }]}
                    >
                        <Select disabled placeholder="Select Category type">
                            <Option value="INTERVENTION">Intervention</Option>
                            <Option value="EXPENSE">Expense</Option>
                        </Select>
                    </Form.Item>
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
                        name="price"
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

export default EditCategory;
