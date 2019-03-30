import React from 'react';
import './index.scss';
import {
    Icon, message
} from 'antd';
import {
    Link
} from 'react-router-dom';
import myFetch from '../../utils/myFetch';
import Tagitem from './Tagitem';
import HeadImage from '../../common/HeadImage';

class NoteListitem extends React.Component {
    constructor(props) {
        super(...props);
        this.collectNote = this.collectNote.bind(this);
    }

    collectNote() {
        const { noteid } = this.props;
        myFetch.GET('note/collect?noteid=' + noteid)
            .then((response) => {
                if (response.code === '0') {
                    message.success('收藏成功');
                } else {
                    message.error('收藏失败!' + response.msg);
                }
            });
    }

    render() {
        const { headimage, userintro, username, title,
            content, taglist, publishtime, noteid, commentCount } = this.props;
        return (
            <div className="list-container">
                <div className="list-headimage">
                    <HeadImage username={username}
                        size={64}
                        imgUrl={headimage}
                        userintro={userintro} />
                </div>
                <div className="list-panel">
                    <Link to={'/detail/' + noteid}>
                        <div className="panel-top">
                            <h3 className="note-title">{title}</h3>
                            <div style={{ display: 'flex' }}>
                                {taglist && taglist.length > 0
                                    ? taglist.map((item, i) => <Tagitem tag={item} key={i} />)
                                    : null}
                            </div>
                        </div>
                        <div className="panel-middle">
                            <div className="note-content" dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </Link>
                    <div className="panel-bottom">
                        <div className="note-operate" onClick={this.collectNote}>
                            <Icon type="star" className="collect-star" />
                            <span>收藏笔记</span>
                        </div>
                        <div className="note-operate">
                            <Icon type="message" theme="filled" className="comment-star" />
                            <span>
                                {commentCount}
                                条评论
                            </span>
                        </div>
                        <div className="note-operate">
                            {publishtime}
                        </div>
                    </div>
                    <div className="triangle" />
                </div>
            </div>
        );
    }
}

export default NoteListitem;
