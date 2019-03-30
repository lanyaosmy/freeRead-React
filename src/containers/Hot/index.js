import React from 'react';
import {
    List, Spin, message
} from 'antd';

import { connect } from 'react-redux';
import { fetchHot, fetchAuthorLatest, clearHot } from '../../actions';
import NoteListitem from '../../components/NoteListitem';
import SideBar from '../../components/Sidebar';
import './index.scss';

class Hot extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            page: 1
        };
        this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
    }

    componentDidMount() {
        const { getHot, getAuthorLatest } = this.props;
        const { page } = this.state;
        getHot(page);
        getAuthorLatest();
    }

    componentWillReceiveProps(nextProps) {
        const { errorMsg } = nextProps;
        if (errorMsg && errorMsg.fetchHot) {
            message.error('请求失败:' + errorMsg.fetchHot);
        }
    }

    componentWillUnmount() {
        const { clear } = this.props;
        clear();
    }

    handleInfiniteOnLoad() {
        const { getHot, hotHasMore } = this.props;
        const { page } = this.state;
        if (hotHasMore) {
            this.setState({
                page: page + 1
            });
            getHot(page + 1);
        } else {
            message.warning('没有更多啦~');
        }
    }

    render() {
        const { hotNoteList, authorLatest, uploadData, hotHasMore } = this.props;
        return (
            <div className="hf-container">
                <div className="hf-left">
                    <List
                        itemLayout="vertical"
                        size="large"
                        loading={uploadData}
                        dataSource={hotNoteList}
                        renderItem={item => <NoteListitem {...item} />}>
                        {uploadData && hotHasMore && (
                            <div className="loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                    <div className="hf-loadmore" onClick={this.handleInfiniteOnLoad}>
                        <span>加载更多...</span>
                    </div>
                </div>
                <SideBar authorlatest={authorLatest} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        hotNoteList,
        hotHasMore,
        uploadData,
        success,
        errorMsg,
        authorLatest
    } = state.mainReducer;
    return {
        hotNoteList,
        hotHasMore,
        uploadData,
        success,
        errorMsg,
        authorLatest
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getHot: (page) => dispatch(fetchHot(page)),
        getAuthorLatest: () => dispatch(fetchAuthorLatest()),
        clear: () => dispatch(clearHot())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Hot);
