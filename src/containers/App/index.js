import React from 'react';
import {
    Layout, Menu, Icon, Avatar, Dropdown
} from 'antd';
import {
    Link,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Hot from '../Hot/index';
import Focus from '../Focus/index';
import EditNote from '../EditNote';
import BoxNote from '../BoxNote';
import PersonalCenter from '../PersonalCenter';
import NoteDetail from '../NoteDetail';
import HeadDropdown from '../../components/HeadDropdown';
import './index.scss';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const { location } = this.props;

        return (
            <Layout style={{ height: '100%', background: '#F2EEEE' }}>
                <Header className="header">
                    <div className="title">
                        <Icon
                            className="logo"
                            type="crown" />
                        <h2 style={{ marginRight: '20px' }}>Free&Read</h2>

                        <Menu
                            className="menu"
                            selectedKeys={[location.pathname.slice(1)]}
                            mode="horizontal"
                            style={{ lineHeight: '64px' }}>
                            <Menu.Item key="hot"><Link to="/hot">热门笔记</Link></Menu.Item>
                            <Menu.Item key="focus"><Link to="/focus">关注动态</Link></Menu.Item>
                        </Menu>
                    </div>
                    <div className="header-right">
                        <Link to="/edit">
                            <div className="edit-note">
                                <Icon
                                    className="logo"
                                    type="edit" />
                                <span className="edit-title">创建笔记</span>
                            </div>
                        </Link>
                        <Dropdown overlay={HeadDropdown} trigger={['click']}>
                            <div className="head-image">
                                <Avatar
                                    size={48}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <Icon
                                    className="logo"
                                    type="caret-down" />
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="main-content" style={{ padding: '0 15%', marginTop: 64, overflow: 'scroll' }}>
                    <div className="content-inner">
                        <Switch>
                            <Route exact path="/hot" component={Hot} />
                            <Route exact path="/focus" component={Focus} />
                            <Route exact path="/edit/:type/:noteid" component={BoxNote} />
                            <Route exact path="/edit" component={EditNote} />
                            <Route exact path="/personal" component={PersonalCenter} />
                            <Route exact path="/detail/:noteid" component={NoteDetail} />
                            <Redirect to="/hot" />
                        </Switch>
                    </div>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Content>

            </Layout>
        );
    }
}

export default App;
