import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAddSubscriptionMutation } from "../redux/api/categoryApi";

const AddSubscription = ({ openAddModal, setOpenAddModal }) => {
const [addSubscription] = useAddSubscriptionMutation()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        form.resetFields();
        setOpenAddModal(false);
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
   
               const response = await addSubscription(data).unwrap();
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
                <h2 className="text-center font-semibold text-xl mb-4">Add Subscription</h2>

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
                            label="Price"
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

                            {/* this is feature field */}
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

export default AddSubscription;
