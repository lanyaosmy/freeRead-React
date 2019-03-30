import React from 'react';
import { Popover, Avatar } from 'antd';


function HeadImage(props) {
    const { username, size, imgUrl, userintro } = props;
    const defaultImg = 'http://imgsize.ph.126.net/?imgurl=http://imglf0.ph.126.net/phHgO_bZjJ9JdM4pgX7RPQ==/67272519451997844.jpg_64x64x0x90.jpg';
    const content = (
        <div>
            <div className="author-name">{username}</div>
            <div className="author-intro">{userintro || '这个人没有介绍哦~'}</div>
        </div>
    );
    return (
        <Popover placement="left" title="作者详情" content={content}>
            <Avatar
                size={size}
                style={{ cursor: 'pointer' }}
                src={imgUrl || defaultImg} />
        </Popover>
    );
}

export default HeadImage;
