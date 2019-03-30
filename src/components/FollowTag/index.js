import React from 'react';
import { List, Select, message, Button } from 'antd';
import myFetch from '../../utils/myFetch';
import TagListitem from './TagListitem';
import './index.scss';

const { Option } = Select;


class FollowTag extends React.Component {
    constructor(props) {
        super(...props);
        this.state = {
            userlist: [],
            taglist: [],
            selectedTag: [],
            userLoading: false,
            tagLoading: false
        };
        this.getUserlist = this.getUserlist.bind(this);
        this.followtag = this.followtag.bind(this);
        this.unfollowtag = this.unfollowtag.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.getTaglist = this.getTaglist.bind(this);
    }

    componentDidMount() {
        this.getUserlist();
        this.getTaglist();
    }

    getTaglist() {
        this.setState({
            tagLoading: true
        });
        let that = this;
        myFetch.GET('tag/usernotfollow')
            .then((response) => {
                if (response.code === '0') {
                    let { taglist } = response.data;
                    that.setState({
                        taglist
                    });
                } else {
                    message.error(response.msg);
                }
                this.setState({
                    tagLoading: false
                });
            });
    }

    // 获取用户关注的标签列表
    getUserlist() {
        this.setState({
            userLoading: true
        });
        let that = this;
        myFetch.GET('tag/userlist')
            .then((response) => {
                if (response.code === '0') {
                    let { taglist } = response.data;
                    that.setState({
                        userlist: taglist
                    });
                } else {
                    message.error(response.msg);
                }
                this.setState({
                    userLoading: false
                });
            });
    }

    // 选择标签
    handleTagChange(value) {
        this.setState({
            selectedTag: value
        });
    }

    // 关注标签
    followtag() {
        const { selectedTag } = this.state;
        if (selectedTag.length === 0) {
            message.error('请至少选择一个标签！');
            return;
        }
        let data = {
            taglist: selectedTag
        };
        myFetch.POST('tag/follow', data)
            .then((response) => {
                if (response.code !== '0') {
                    message.error(response.msg);
                }
                message.success('关注成功！');
                this.getUserlist();
            });
    }

    // 取消关注标签
    unfollowtag(tagid) {
        myFetch.GET('tag/unfollow?tagid=' + tagid)
            .then((response) => {
                if (response.code !== '0') {
                    message.error(response.msg);
                }
                message.success('删除成功！');
                this.getUserlist();
            });
    }

    render() {
        const { taglist, userlist, tagLoading, userLoading } = this.state;
        return (
            <div className="tag-container">
                <div className="tag-search">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="请选择标签"
                        loading={tagLoading}
                        onFocus={this.getTaglist}
                        onChange={this.handleTagChange}>
                        {taglist.length > 0
                            ? taglist.map((item) => (
                                <Option value={item.tagid + ''} key={item.tagid}>
                                    {item.tagname}
                                </Option>
                            ))
                            : null}
                    </Select>
                    <Button type="primary" onClick={this.followtag}>关注标签</Button>
                </div>
                <List
                    itemLayout="vertical"
                    dataSource={userlist}
                    loading={userLoading}
                    renderItem={item => (
                        <TagListitem {...item} unfollowtag={this.unfollowtag} />
                    )} />
            </div>
        );
    }
}

export default FollowTag;
