/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Link
} from 'react-router-dom';
import { Icon, Modal, message } from 'antd';
import myFetch from '../../../utils/myFetch';

const { confirm } = Modal;

class BoxListitem extends React.Component {
    constructor(props) {
        super(...props);
        this.deleteNote = this.deleteNote.bind(this);
    }

    // 删除草稿
    deleteNote() {
        const { noteid, freshList } = this.props;
        confirm({
            title: '确定删除这篇草稿？',
            onOk() {
                myFetch.GET('note/deletenote?noteid=' + noteid)
                    .then((response) => {
                        if (response.code === '0') {
                            message.success('删除成功');
                            freshList('note/notepublished');
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
        const { title, bookname, noteid } = this.props;
        return (
            <div className="publish-list">
                <div className="publish-info">
                    <div className="publish-top">
                        <h3>{title}</h3>
                        <p>{bookname}</p>
                    </div>
                </div>
                <div className="publish-action">
                    <Link to={'/edit/box/' + noteid}>
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

export default BoxListitem;
