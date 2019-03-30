import React from 'react';
import { Button, Input, message } from 'antd';
import xss from 'xss';
import myFetch from '../../utils/myFetch';
import HeadImage from '../../common/HeadImage';
import CommentItem from '../../components/CommentItem';
import './index.scss';

const { TextArea } = Input;
class NoteDetail extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            note: {
                headimage: '',
                idea: '',
                userintro: '',
                publishtime: '',
                noteid: 1,
                title: '',
                bookname: '草房子',
                userid: 1,
                content: '',
                username: ''
            },
            comment: [],
            notecomment: ''
        };
        this.noteCommentInput = this.noteCommentInput.bind(this);
        this.followAuthor = this.followAuthor.bind(this);
        this.collectNote = this.collectNote.bind(this);
        this.submitNoteComment = this.submitNoteComment.bind(this);
        this.freshCommentList = this.freshCommentList.bind(this);
    }

    componentDidMount() {
        const { match } = this.props;
        myFetch.GET('note/shownote/' + match.params.noteid)
            .then((response) => {
                if (response.code === '0') {
                    let { note } = response.data;
                    this.setState({
                        note
                    });
                } else {
                    message.error(response.msg);
                }
            });
        this.freshCommentList();
    }

    // 获取或刷新评论列表
    freshCommentList() {
        const { match } = this.props;
        myFetch.GET('comment/notecomment?noteid=' + match.params.noteid)
            .then((response) => {
                if (response.code === '0') {
                    let { commentlist } = response.data;
                    this.setState({
                        comment: commentlist
                    });
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 输入评论股内容
    noteCommentInput(e) {
        this.setState({
            notecomment: e.target.value
        });
    }

    // 提交评论
    submitNoteComment() {
        const { note, notecomment } = this.state;
        const { noteid, userid } = note;
        if (notecomment.length === 0) {
            message.error('评论内容不能为空！');
            return;
        }
        let data = {
            noteId: noteid,
            receiverId: userid,
            commentContent: xss(notecomment)
        };
        myFetch.POST('comment/addcomment', data)
            .then((response) => {
                if (response.code === '0') {
                    this.freshCommentList();
                    message.success('评论成功');
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 关注作者
    followAuthor() {
        const { note } = this.state;
        const { userid } = note;
        myFetch.GET('user/followauthor?followid=' + userid)
            .then((response) => {
                if (response.code === '0') {
                    message.success('关注作者成功');
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 收藏笔记
    collectNote() {
        const { note } = this.state;
        const { noteid } = note;
        myFetch.GET('note/collect?noteid=' + noteid)
            .then((response) => {
                if (response.code === '0') {
                    message.success('收藏笔记成功');
                } else {
                    message.error(response.msg);
                }
            });
    }

    render() {
        const { note, comment } = this.state;
        const { title, username, userintro, content, idea, noteid, headimage } = note;
        return (
            <div className="detail-container">
                <h2>{title}</h2>
                <div className="detail-author">
                    <div className="detail-top">
                        <HeadImage username={username}
                            size={64}
                            imgUrl={headimage}
                            userintro={userintro} />
                        <div className="detail-info">
                            <h3 className="detail-username">{username}</h3>
                            <p className="detail-userintro">{userintro}</p>
                        </div>
                    </div>
                    <div className="detail-action">
                        <Button icon="heart"
                            type="primary"
                            style={{ marginRight: '10px' }}
                            onClick={this.followAuthor}>
                            关注TA
                        </Button>
                        <Button icon="star"
                            type="primary"
                            onClick={this.collectNote}>
                            收藏笔记
                        </Button>
                    </div>
                </div>

                <h3 className="detail-title">摘录内容</h3>
                <div className="detail-content" dangerouslySetInnerHTML={{ __html: content }} />
                <h3 className="detail-title">我的心得</h3>
                <div className="detail-content" dangerouslySetInnerHTML={{ __html: idea }} />
                <h3 className="detail-title">评论区</h3>
                <div className="detail-reply">
                    <TextArea
                        placeholder="请输入评论"
                        autosize={{ minRows: 1 }}
                        onChange={this.noteCommentInput} />
                    <Button icon="message" type="primary" onClick={this.submitNoteComment}>发表</Button>
                </div>
                <CommentItem commentlist={comment}
                    noteid={noteid}
                    freshCommentList={this.freshCommentList} />
            </div>
        );
    }
}

export default NoteDetail;
