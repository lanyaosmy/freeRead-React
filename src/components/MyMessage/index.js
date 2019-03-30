import React from 'react';
import { List, message } from 'antd';
import myFetch from '../../utils/myFetch';
import MessListitem from './MessListitem';
import './index.scss';

class MyMessage extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            messagelist: [],
            loading: false
        };
        this.getMessageList = this.getMessageList.bind(this);
    }

    componentDidMount() {
        this.getMessageList();
    }

    // 获取消息列表
    getMessageList() {
        let that = this;
        this.setState({
            loading: true
        });
        myFetch.GET('comment/mycomment')
            .then((response) => {
                if (response.code === '0') {
                    let { commentlist } = response.data;
                    that.setState({
                        messagelist: commentlist
                    });
                } else {
                    message.error(response.msg);
                }
                that.setState({
                    loading: false
                });
            });
    }

    render() {
        const { messagelist, loading } = this.state;
        return (
            <div className="mess-container">
                <List
                    itemLayout="vertical"
                    dataSource={messagelist}
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5
                    }}
                    loading={loading}
                    renderItem={item => (
                        <MessListitem {...item} />
                    )} />
            </div>
        );
    }
}

export default MyMessage;
