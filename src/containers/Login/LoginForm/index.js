/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Form, Icon, Input, Button, message
} from 'antd';
import { JSEncrypt } from 'jsencrypt';
import { connect } from 'react-redux';
import myFetch from '../../../utils/myFetch';
import { fetchPublicKey, getUserinfo } from '../../../actions';
import './index.scss';

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(...props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { getPublicKey } = this.props;
        getPublicKey();
    }

    handleSubmit(e) {
        e.preventDefault();
        const { form, publicKey, setUserinfo } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const { email, pwd } = values;
                let encrypt = new JSEncrypt();
                if (publicKey != null) {
                    // 设置公钥
                    encrypt.setPublicKey(publicKey);
                    // 加密
                    let pemail = encrypt.encrypt(email);
                    let ppwd = encrypt.encrypt(pwd);
                    myFetch.POST('user/login', { email: pemail, password: ppwd })
                        .then((response) => {
                            if (response.code === '0') {
                                message.success('登录成功');
                                setUserinfo(response.data);
                            } else {
                                message.error(response.msg);
                            }
                        });
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props);
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱不合法!'
                        }, { required: true, message: '请输入账号邮箱!' }]
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名(邮箱)" autoComplete="off" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('pwd', {
                        rules: [{
                            min: 6, message: '至少六位密码!'
                        }, { required: true, message: '请输入密码!' }]
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">忘记密码？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button long-button">
                        登录
                    </Button>
                        没有账号？
                    {' '}
                    <Link to="register">现在就注册!</Link>
                </Form.Item>
            </Form>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

function mapStateToProps(state) {
    const {
        publicKey
    } = state.mainReducer;
    return {
        publicKey
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPublicKey: () => dispatch(fetchPublicKey()),
        setUserinfo: (info) => dispatch(getUserinfo(info))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
