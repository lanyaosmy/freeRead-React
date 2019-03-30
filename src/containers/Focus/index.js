import React from 'react';
import {
    List, Spin, message
} from 'antd';
import { connect } from 'react-redux';
import { fetchLatest, fetchAuthorLatest, clearLatest } from '../../actions';
import NoteListitem from '../../components/NoteListitem';
import SideBar from '../../components/Sidebar';
import './index.scss';

class Focus extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            page: 1
        };
        this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
    }

    handleInfiniteOnLoad() {
        const { getLatest, latestHasMore } = this.props;
        const { page } = this.state;
        if (latestHasMore) {
            this.setState({
                page: page + 1
            });
            getLatest(page + 1);
        } else {
            message.warning('没有更多啦~');
        }
    }

    componentDidMount() {
        const { getLatest, getAuthorLatest } = this.props;
        const { page } = this.state;
        getLatest(page);
        getAuthorLatest();
    }

    componentWillReceiveProps(nextProps) {
        const { errorMsg } = nextProps;
        if (errorMsg && errorMsg.fetchLatest) {
            message.error('请求失败:' + errorMsg.fetchLatest);
        }
    }

    componentWillUnmount() {
        const { clear } = this.props;
        clear();
    }

    render() {
        const { latestNoteList, authorLatest, uploadData, latestHasMore } = this.props;
        return (
            <div className="hf-container">
                <div className="hf-left">
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={latestNoteList}
                        loading={uploadData}
                        renderItem={item => <NoteListitem {...item} />}>
                        {uploadData && latestHasMore && (
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
        latestNoteList,
        latestHasMore,
        uploadData,
        success,
        errorMsg,
        authorLatest
    } = state.mainReducer;
    return {
        latestNoteList,
        latestHasMore,
        uploadData,
        success,
        errorMsg,
        authorLatest
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLatest: (page) => dispatch(fetchLatest(page)),
        getAuthorLatest: () => dispatch(fetchAuthorLatest()),
        clear: () => dispatch(clearLatest())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Focus);
