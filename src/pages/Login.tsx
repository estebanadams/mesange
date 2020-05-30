import React from "react";
import { message, PageHeader, Form, Input, Button, Checkbox, Col } from "antd";
import { signin } from "../services/firebase";
import { string } from "prop-types";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const error = (code: string, text: string) => {
  message.error(`Error ${code} : ${text}`);
};

const onFinish = (values: any) => {
  console.log("Success:", values);
  signin(values.username, values.password)
    .then(user => {
      console.log("Succeed", user);
      message.success("User succefully Log in");
    })
    .catch(err => {
      error(err.code, err.message);
    });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  return (
    <Col span={24}>
      <PageHeader title="MESANGE" subTitle="Log In" />
      <Form
        {...layout}
        className="form"
        size="middle"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default Login;
