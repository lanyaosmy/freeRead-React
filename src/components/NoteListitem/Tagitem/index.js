/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './index.scss';

const Tagitem = (props) => (
    <div className="tag-item">
        {props.tag}
    </div>
);

export default Tagitem;
