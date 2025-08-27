import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { createUserApi } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password } = values;

        const res = await createUserApi(name, email, password);

        if (res) {
            notification.success({
                message: "CREATE USER",
                description: "Success"
            });
            navigate("/login");
        } else {
            notification.error({
                message: "CREATE USER",
                description: "error"
            });
        }
    };

    return (
        <Row justify="center" style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}>
                    <legend>Đăng Ký Tài Khoản</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="name"
                            name="name"
                            rules={[{
                                required: true,
                                message: 'Please input your name!',
                            }, ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please input your email!',
                            }, ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your password!',
                            }, ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            <Divider />
                            <Link to="/login">
                                <ArrowLeftOutlined /> Quay lại đăng nhập
                            </Link>
                        </Form.Item>
                    </Form>
                </fieldset>
            </Col>
        </Row>
    );
};

export default RegisterPage;