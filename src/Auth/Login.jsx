import { Checkbox, Form, Input, message, Spin } from "antd";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useLoginAdminMutation } from "../page/redux/api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../page/redux/features/auth/authSlice";
const Login = () => {
  const [loginAdmin] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = await loginAdmin(values).unwrap();
      setLoading(false);
      if (payload) {
        console.log(payload);
        dispatch(setToken(payload?.token));
        message.success(payload?.message);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      message.error(error?.data?.message || "Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className=" min-h-screen flex items-center justify-center">
        <div className="">
          <div className=" md:px-16 px-5 py-16  shadow border w-[600px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Login to Account
              </h2>
              <p className="pb-7">
                Please enter your email and password to continue
              </p>
            </div>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-4">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-700">Remember me</Checkbox>
                </Form.Item>
                <Link
                  to={"/forgetpassword"}
                  className="text-sm text-[#2F799E] hover:underline focus:outline-none"
                >
                  Forget password?
                </Link>
              </div>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full mt-8 py-2 bg-gradient-to-r from-[#017FF4] to-blue-300 text-white rounded"
                  // disabled={loading}
                >
                  {loading ? <Spin size="small" /> : "Submit"}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
