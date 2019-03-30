import React from 'react';
import './index.scss';
import {
    Menu, Icon
} from 'antd';
import {
    Link
} from 'react-router-dom';

const HeadDropdown = () => (
    <Menu>
        <Menu.Item key="0" style={{ display: 'flex', alignItems: 'center' }}>
            <Icon type="user" />
            <Link to="/personal">个人中心</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" style={{ display: 'flex', alignItems: 'center' }}>
            <Icon type="edit" />
            <Link to="/edit">创建笔记</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" style={{ display: 'flex', alignItems: 'center' }}>
            <Icon type="poweroff" />
            <a href="http://www.taobao.com/">退出</a>
        </Menu.Item>
    </Menu>
);


export default HeadDropdown;
