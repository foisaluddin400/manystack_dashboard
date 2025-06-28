import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import { useUpdateSubscriptionMutation } from "../redux/api/categoryApi";

const EditSubscription = ({ editModal, setEditModal, selectedProduct }) => {
    console.log(selectedProduct?._id)
    const id = selectedProduct?._id
    const [updateSubs] = useUpdateSubscriptionMutation()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const handleCancel = () => {
        form.resetFields();

        setEditModal(false);
    };

    useEffect(() => {
        form.setFieldsValue({ cooking: [""], ingredients: [""], nutrition: [""] });
    }, [form]);

    const handleSubmit = async (values) => {

        setLoading(true);
        const data = {
            validity: values.validity,
            name: values.name,
            price: values.price,
            features: values.ingredients
        };

        try {

            const response = await updateSubs({data,id}).unwrap();
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


            form.setFieldsValue({
                name: selectedProduct?.name || "",
                validity: selectedProduct?.validity || "",
                price: selectedProduct?.price || "",
                ingredients: selectedProduct?.features || [],
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
                <h2 className="text-center font-semibold text-xl mb-4">Edit Subscription</h2>

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

                    <div className="grid grid-cols-2 gap-3">
                        <Form.Item
                            label="Namber"
                            name="price"
                            rules={[
                                { required: true, message: "Please input number!" },
                            ]}
                        >
                            <Input type="number" placeholder="Enter number" style={{ borderRadius: "0px", padding: "6px 8px" }} />
                        </Form.Item>
                        <Form.Item
                            label="Validity"
                            name="validity"
                            rules={[{ required: true, message: "Please select validity" }]}
                        >
                            <Select placeholder="Select validity">
                                <Option value="Yearly">Yearly</Option>
                                <Option value="Monthly">Monthly</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.List name="ingredients" >
                        {(fields, { add, remove }) => (
                            <>
                                <div className="pb-2">Add Feature</div>
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

export default EditSubscription;
