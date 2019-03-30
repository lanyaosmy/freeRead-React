import React from 'react';
import './index.scss';
import {
    List
} from 'antd';
import SideListitem from './SideListitem';

class Sidebar extends React.Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const { authorlatest } = this.props;
        return (
            <div className="hf-right">
                <h3 className="hf-right-title">你关注的作者动态</h3>
                <List
                    itemLayout="horizontal"
                    dataSource={authorlatest}
                    renderItem={item => (
                        <SideListitem {...item} />
                    )} />
            </div>
        );
    }
}

export default Sidebar;
