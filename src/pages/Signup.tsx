import React from "react";
import { message, PageHeader, Form, Input, Button, Checkbox, Col } from "antd";
import { signup, db } from "../services/firebase";
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
  signup(values.email, values.password)
    .then(response => {
      const { user } = response;
      console.log("Succeed", user);
      if (user) {
        message.success("User succefully created");
        const req = db
          .ref("users/" + user.uid)
          .set({
            usermame: values.username,
            email: user.email,
            uid: user.uid
          })
          .then(res => console.log("res", res))
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      error(err.code, err.message);
    });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Signup = () => {
  return (
    <Col span={24}>
      <PageHeader title="MESANGE" subTitle="Sign Up" />
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
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!"
            }
          ]}
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

export default Signup;
