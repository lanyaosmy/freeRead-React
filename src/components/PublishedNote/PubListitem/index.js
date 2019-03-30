/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Link
} from 'react-router-dom';
import { Icon, Modal, message } from 'antd';
import myFetch from '../../../utils/myFetch';

const { confirm } = Modal;

class PubListitem extends React.Component {
    constructor(props) {
        super(...props);
        this.deleteNote = this.deleteNote.bind(this);
    }

    // 删除笔记
    deleteNote() {
        const { noteid, freshList, currentPage } = this.props;
        confirm({
            title: '确定删除这篇笔记？',
            onOk() {
                myFetch.GET('note/deletenote?noteid=' + noteid)
                    .then((response) => {
                        if (response.code === '0') {
                            message.success('删除成功');
                            freshList('note/published?page=' + currentPage);
                        } else {
                            message.error(response.msg);
                        }
                    });
            },
            onCancel() {

            }
        });
    }

    render() {
        const { title, bookname, publishtime, visitnum, noteid } = this.props;
        return (
            <div className="publish-list">

                <div className="publish-info">
                    <Link to={'/detail/' + noteid}>
                        <div className="publish-top">
                            <h3>{title}</h3>
                            <p>{bookname}</p>
                        </div>
                        <div className="publish-bottom">
                            <div className="item">
                                <Icon type="schedule" className="logo blue" />
                                {' '}
                            发表时间:
                                {publishtime}
                            </div>
                            <div className="item">
                                <Icon type="heart" className="logo red" />
                                {' '}
                            访问量:
                                {visitnum}
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="publish-action">
                    <Link to={'/edit/publish/' + noteid}>
                        <div className="line">
                            <Icon type="edit" />
                            <span>编辑</span>
                        </div>
                    </Link>
                    <div className="line" onClick={this.deleteNote}>
                        <Icon type="delete" />
                        <span>删除</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default PubListitem;
