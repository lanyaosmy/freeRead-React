/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Link
} from 'react-router-dom';
import './index.scss';
import {
    Avatar
} from 'antd';


const SideListItem = (props) => (
    <div className="hf-right-listitem">
        <Avatar
            size={48}
            src={props.headimage} />
        <div className="content">
            <span className="intro">发表了新笔记</span>
            <Link to={'/detail/' + props.noteid}><span className="title">{props.title}</span></Link>
        </div>
    </div>
);

export default SideListItem;
