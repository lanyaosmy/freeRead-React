import React from 'react';
import { List } from 'antd';
import ComListitem from './ComListitem';
import './index.scss';


class CommentItem extends React.Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const { commentlist, noteid, freshCommentList } = this.props;
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={commentlist}
                renderItem={item => <ComListitem {...item} noteid={noteid} freshCommentList={freshCommentList} />} />
        );
    }
}

export default CommentItem;
