import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin, Button } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";

const EditSubscription = ({ editModal, setEditModal }) => {

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
                            name="number"
                            rules={[
                                { required: true, message: "Please input number!" },
                            ]}
                        >
                            <Input type="number" placeholder="Enter number" style={{ borderRadius: "0px", padding: "6px 8px" }} />
                        </Form.Item>
                        <Form.Item
                            label="Validity"
                            name="Validity"
                            rules={[
                                { required: true, message: "Please input auction item name!" },
                            ]}
                        >
                            <Input placeholder="Enter auction item name" style={{ borderRadius: "0px", padding: "6px 8px" }} />
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
