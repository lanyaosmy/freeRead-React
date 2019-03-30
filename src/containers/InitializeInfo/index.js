/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Form, Icon, Input, Button, Upload, message
} from 'antd';
import myFetch from '../../utils/myFetch';
import './index.scss';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('只能上传JPG类型图片！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('文件大小必须小于2MB!');
    }
    return isJPG && isLt2M;
}

class InfoForm extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            imageUrl: '',
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const { username, userintro } = values;
                myFetch.POST('user/updateuser', { userName: username, userIntro: userintro })
                    .then((response) => {
                        if (response.code !== '0') {
                            window.location.href = '/#/hot';
                        } else {
                            message.error(response.msg);
                        }
                    });
            }
        });
    }

    handleChange (info) {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false
            }));
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div className="first-container">
                <div className="first-panel">
                    <h3>请填入基本信息</h3>
                    <Form onSubmit={this.handleSubmit} className="first-form">
                        <Form.Item label="昵称">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入昵称!' }]
                            })(
                                <Input prefix={<Icon type="heart" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="快来起一个霸气的昵称~" />
                            )}
                        </Form.Item>
                        <Form.Item label="个人简介">
                            {getFieldDecorator('userintro', {
                                rules: [{ required: true, message: '请输入个人简介!' }]
                            })(
                                <Input.TextArea type="text" placeholder="是一个怎样的小可爱呢？" />
                            )}
                        </Form.Item>
                        <Form.Item label="头像(.jpg文件,小于2MB)">
                            <Upload
                                name="headimage"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="http://localhost:9090/user/upload"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}>
                                {imageUrl ? <img src={imageUrl} alt="avatar" className="upload-image" /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button long-button">
                                开始探索吧~
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
const InitializeInfo = Form.create({ name: 'initialize_info' })(InfoForm);
export default InitializeInfo;
