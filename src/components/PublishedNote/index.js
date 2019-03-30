import React from 'react';
import { List, message } from 'antd';
import myFetch from '../../utils/myFetch';
import PubListitem from './PubListitem';
import BoxListitem from './BoxListitem';
import CollectListitem from './CollectListitem';
import './index.scss';

class PublishedNote extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            listData: [],
            totalPage: 1,
            currentPage: 1,
            loading: false
        };
        this.map = {
            published: 'note/published',
            collect: 'note/usercollect'
        };
        this.renderType = this.renderType.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.getList = this.getList.bind(this);
    }

    renderType(item) {
        const { type } = this.props;
        const { currentPage } = this.state;
        switch (type) {
        case 'published':
            return <PubListitem {...item} currentPage={currentPage} freshList={this.getList} />;
        case 'box':
            return <BoxListitem {...item} freshList={this.getList} />;
        case 'collect':
            return <CollectListitem {...item} currentPage={currentPage} freshList={this.getList} />;
        default:
            return null;
        }
    }

    getList(url) {
        this.setState({
            loading: true
        });
        myFetch.GET(url)
            .then((response) => {
                if (response.code === '0') {
                    this.setState({
                        listData: response.data.notelist,
                        totalPage: response.data.totalpage
                    });
                } else {
                    message.error(response.msg);
                }
                this.setState({
                    loading: false
                });
            });
    }

    componentDidMount() {
        const { type } = this.props;
        let initmap = {
            published: 'note/published?page=1',
            box: 'note/notpublished',
            collect: 'note/usercollect?page=1'
        };
        this.getList(initmap[type]);
    }

    pageChange(page) {
        const { type } = this.props;
        this.setState({
            currentPage: page
        });
        this.getList(this.map[type] + '?page=' + page);
    }

    render() {
        const { listData, totalPage, loading } = this.state;
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: this.pageChange,
                    total: totalPage,
                    pageSize: 10
                }}
                loading={loading}
                dataSource={listData}
                renderItem={this.renderType} />
        );
    }
}

export default PublishedNote;
