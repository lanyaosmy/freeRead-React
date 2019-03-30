import React from 'react';
import { Comment, Icon, Input, Button, message } from 'antd';
import myFetch from '../../../utils/myFetch';
import HeadImage from '../../../common/HeadImage';

const { TextArea } = Input;

class ComListitem extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            isOpen: false,
            comment: ''
        };
        this.changeReply = this.changeReply.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    changeReply() {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    handleInput(e) {
        this.setState({
            comment: e.target.value
        });
    }

    submitComment() {
        const { noteid, senderid, freshCommentList } = this.props;
        const { comment } = this.state;
        if (comment.length === 0) {
            message.error('评论内容不能为空！');
            return;
        }
        let data = {
            noteId: noteid,
            receiverId: senderid,
            commentContent: comment
        };
        myFetch.POST('comment/addcomment', data)
            .then((response) => {
                if (response.code === '0') {
                    freshCommentList();
                    message.success('评论成功');
                } else {
                    message.error(response.msg);
                }
            });
    }

    render() {
        const { commentcontent, commenttime, sendername, headimage,
            userintro, receivername } = this.props;
        const { isOpen } = this.state;
        return (
            <div className="com-container">
                <Comment
                    actions={[<span className="comment-reply" onClick={this.changeReply}>
                        <Icon type="message" />
                    回复
                    </span>, <span className="comment-reply">
                        {'回复 ' + receivername}
                    </span>]}
                    author={<a>{sendername}</a>}
                    datetime={commenttime}
                    avatar={(
                        <HeadImage username={sendername}
                            size={48}
                            imgUrl={headimage}
                            userintro={userintro} />
                    )}
                    content={commentcontent} />
                <div className={isOpen ? 'com-reply' : 'com-reply com-hidereply'}>
                    <TextArea
                        autosize={{ minRows: 1 }}
                        placeholder="请输入评论"
                        onChange={this.handleInput} />
                    <Button icon="message" onClick={this.submitComment}>回复</Button>
                </div>
            </div>
        );
    }
}

export default ComListitem;
