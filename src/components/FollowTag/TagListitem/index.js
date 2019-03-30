/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Icon, Button } from 'antd';

const TagListitem = (props) => {
    const { tagname, unfollowtag, tagid } = props;
    return (
        <div className="tag-list">
            <div className="tag-info">
                <Icon type="tag" className="tag-icon" />
                {tagname}
            </div>
            <Button size="small" icon="delete" onClick={() => { unfollowtag(tagid); }}>删除</Button>
        </div>
    );
};

export default TagListitem;
