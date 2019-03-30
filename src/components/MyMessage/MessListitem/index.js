/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Link
} from 'react-router-dom';
import xss from 'xss';
import { Input, Icon, Button, message } from 'antd';
import myFetch from '../../../utils/myFetch';
import HeadImage from '../../../common/HeadImage';

class MessListitem extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            isOpen: false,
            reply: ''
        };
        this.changeReply = this.changeReply.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    changeReply() {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    // 设置评论内容
    handleInput(e) {
        this.setState({
            reply: e.target.value
        });
    }

    // 提交评论
    submitComment() {
        const { reply } = this.state;
        if (reply.length === 0) {
            message.error('回复内容不能为空！');
            return;
        }
        const { senderid, noteid } = this.props;

        let data = {
            noteId: noteid,
            receiverId: senderid,
            commentContent: xss(reply)
        };
        myFetch.POST('comment/addcomment', data)
            .then((response) => {
                if (response.code === '0') {
                    message.success('回复成功！');
                } else {
                    message.error(response.msg);
                }
            });
    }

    render() {
        const { username, title, commenttime,
            commentcontent, headimage, userintro, noteid } = this.props;
        const { isOpen, reply } = this.state;
        return (
            <div className="mess-list">
                <HeadImage size={48} username={username} imgUrl={headimage} userintro={userintro} />
                <div className="mess-right">
                    <div className="mess-top">
                        <div>
                            <span className="mess-from">
                                {username}
                            </span>
                            {' '}
                            评论了
                            {' '}
                            <Link to={'/detail/' + noteid}><span className="mess-title">{title}</span></Link>
                        </div>
                        <div className="mess-time">{commenttime}</div>
                    </div>
                    <div className="mess-bottom" onClick={this.changeReply}>
                        <p>{commentcontent}</p>
                    </div>
                    <div className={isOpen ? 'mess-reply' : 'mess-reply hidereply'}>
                        <Input
                            prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            placeholder="请输入评论"
                            value={reply}
                            onChange={this.handleInput} />
                        <Button icon="message" onClick={this.submitComment}>回复</Button>
                    </div>
                </div>

            </div>
        );
    }
}

export default MessListitem;
