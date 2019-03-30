/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    Link
} from 'react-router-dom';
import { Icon, Modal, message } from 'antd';
import myFetch from '../../../utils/myFetch';

const { confirm } = Modal;

class CollectListitem extends React.Component {
    constructor(props) {
        super(...props);
        this.deleteCollect = this.deleteCollect.bind(this);
    }

    // 取消收藏笔记
    deleteCollect() {
        const { noteid, freshList, currentPage } = this.props;
        confirm({
            title: '确定取消收藏这篇笔记？',
            onOk() {
                myFetch.GET('note/deletecollect?noteid=' + noteid)
                    .then((response) => {
                        if (response.code === '0') {
                            message.success('删除成功');
                            freshList('note/usercollect?page=' + currentPage);
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
                    <div className="line" onClick={this.deleteCollect}>
                        <Icon type="delete" />
                        <span>取消收藏</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CollectListitem;
