/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Form, Icon, Input, Button, Row, Col, message
} from 'antd';
import { connect } from 'react-redux';
import { JSEncrypt } from 'jsencrypt';
import myFetch from '../../../utils/myFetch';
import './index.scss';

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            isSendMail: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);
        this.registerMail = this.registerMail.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { form, publicKey } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                let encrypt = new JSEncrypt();
                if (publicKey != null) {
                    const { email, pwd, validatecode } = values;
                    // 设置公钥
                    encrypt.setPublicKey(publicKey);
                    // 加密
                    let pemail = encrypt.encrypt(email);
                    let ppwd = encrypt.encrypt(pwd);
                    myFetch.POST('user/registermail', { email: pemail, password: ppwd, code: validatecode })
                        .then((response) => {
                            if (response.code === '0') {
                                message.success('注册成功！');
                                window.location.href = '/#/firstinfo';
                            } else {
                                message.error(response.msg);
                            }
                        });
                }
            }
        });
    }

    // 比较两次输入的密码是否相同
    compareToFirstPassword (rule, value, callback) {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword(rule, value, callback) {
        const { form } = this.props;
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    // 发送验证码
    registerMail() {
        this.setState({
            isSendMail: true
        });
        const { form, publicKey } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                let encrypt = new JSEncrypt();
                if (publicKey != null) {
                    const { email } = values;
                    // 设置公钥
                    encrypt.setPublicKey(publicKey);
                    // 加密
                    let pemail = encrypt.encrypt(email);
                    myFetch.POST('user/registermail', { email: pemail })
                        .then((response) => {
                            if (response.code !== '0') {
                                message.error(response.msg);
                                this.setState({
                                    isSendMail: false
                                });
                            }
                        });
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isSendMail } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱不合法!'
                        }, {
                            required: true, message: '请输入账号邮箱!!'
                        }]
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请填写可用的邮箱" autoComplete="off" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!'
                        }, {
                            min: 6, message: '至少六位密码!'
                        }, {
                            validator: this.validateToNextPassword
                        }]
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码!'
                        }, {
                            validator: this.compareToFirstPassword
                        }]
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请重复输入密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Row gutter={8}>
                        <Col span={15}>
                            {getFieldDecorator('validatecode', {
                                rules: [{ required: true, message: '请输入验证码!' },
                                    {
                                        len: 4, message: '请输入4位验证码！'
                                    }, {
                                        type: 'number', message: '请输入数字验证码！'
                                    }]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="验证码" />
                            )}
                        </Col>
                        <Col span={6}>
                            <Button type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                disabled={isSendMail}
                                onClick={this.registerMail}>
                                {isSendMail ? '已发送' : '发送验证码'}
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                        htmlType="submit"
                        className="login-form-button long-button">
                        注册
                    </Button>
                已有账号？
                    {' '}
                    <Link to="login">去登录!</Link>
                </Form.Item>
            </Form>
        );
    }
}

const RegisterForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

function mapStateToProps(state) {
    const {
        publicKey
    } = state.mainReducer;
    return {
        publicKey
    };
}

export default connect(mapStateToProps, null)(RegisterForm);
