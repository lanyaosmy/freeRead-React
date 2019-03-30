/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Button, Avatar } from 'antd';

const UserListitem = (props) => {
    const { userintro, username, headimage, userid, unfollowUser } = props;
    return (
        <div className="user-list">
            <div className="user-left">
                <Avatar
                    size={48}
                    style={{ cursor: 'pointer' }}
                    src={headimage} />
                <div className="user-info">
                    <h3 className="user-username">{username}</h3>
                    <p className="user-userintro">{userintro}</p>
                </div>
            </div>
            <Button icon="delete" onClick={() => { unfollowUser(userid); }}>取消关注</Button>
        </div>
    );
};

export default UserListitem;
