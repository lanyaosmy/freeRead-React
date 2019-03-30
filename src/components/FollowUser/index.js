import React from 'react';
import { List, message } from 'antd';
import myFetch from '../../utils/myFetch';
import UserListitem from './UserListitem';
import './index.scss';

class FollowUser extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            userlist: [],
            loading: false
        };
        this.getUserlist = this.getUserlist.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
    }

    componentDidMount() {
        this.getUserlist();
    }

    getUserlist() {
        this.setState({
            loading: true
        });
        let that = this;
        myFetch.GET('user/getfollowuserlist')
            .then((response) => {
                if (response.code === '0') {
                    let { userlist } = response.data;
                    that.setState({
                        userlist
                    });
                } else {
                    message.error(response.msg);
                }
                this.setState({
                    loading: false
                });
            });
    }

    unfollowUser(followid) {
        myFetch.GET('user/unfollowauthor?followid=' + followid)
            .then((response) => {
                if (response.code === '0') {
                    message.success('取消关注成功！');
                    this.getUserlist();
                } else {
                    message.error(response.msg);
                }
            }).catch((err) => {
                message.error('请求错误：' + err);
            });
    }

    render() {
        const { userlist, loading } = this.state;
        return (
            <div className="fu-container">
                <List
                    itemLayout="vertical"
                    dataSource={userlist}
                    pagination={{
                        pageSize: 10
                    }}
                    loading={loading}
                    renderItem={item => (
                        <UserListitem {...item} unfollowUser={this.unfollowUser} />
                    )} />
            </div>
        );
    }
}

export default FollowUser;
