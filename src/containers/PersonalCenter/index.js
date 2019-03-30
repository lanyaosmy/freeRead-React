import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';

import Publishednote from '../../components/PublishedNote';
import FollowTag from '../../components/FollowTag';
import HeadImage from '../../common/HeadImage';
import FollowUser from '../../components/FollowUser';
import MyMessage from '../../components/MyMessage';
import './index.scss';

const { TabPane } = Tabs;

class PersonalCenter extends React.Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const { userinfo } = this.props;
        const { username, userintro, headimage } = userinfo;
        return (
            <div className="per-container">
                <h2 className="per-title">个人中心</h2>
                <div className="per-top">
                    <HeadImage username={username}
                        size={64}
                        imgUrl={headimage}
                        userintro={userintro} />
                    <div className="per-info">
                        <h3 className="per-username">{username}</h3>
                        <p className="per-userintro">{userintro}</p>
                    </div>
                </div>
                <div className="per-content">
                    <Tabs tabPosition="left">
                        <TabPane tab="已发表的笔记" key="publishednote">
                            <Publishednote type="published" />
                        </TabPane>
                        <TabPane tab="草稿箱" key="boxnote"><Publishednote type="box" /></TabPane>
                        <TabPane tab="收藏的笔记" key="collectnote"><Publishednote type="collect" /></TabPane>
                        <TabPane tab="关注的标签" key="followtag"><FollowTag /></TabPane>
                        <TabPane tab="关注的作者" key="followauthor"><FollowUser /></TabPane>
                        <TabPane tab="我的消息" key="mymessage"><MyMessage /></TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        userinfo
    } = state.mainReducer;
    return {
        userinfo
    };
}
export default connect(mapStateToProps, null)(PersonalCenter);
