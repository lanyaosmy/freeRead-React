const actions = {
    // 请求状态
    FETCH_FAILURE: 'FETCH_FAILURE',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_UPLOADING: 'FETCH_UPLOADING',
    FETCH_START: 'FETCH_START',
    // 获取热门笔记
    FETCH_HOT: 'FETCH_HOT',
    CLEAR_HOT: 'APPEND_HOT',
    // 获取最新动态
    FETCH_LATEST: 'FETCH_LATEST',
    CLEAR_LATEST: 'APPEND_LATEST',
    // 获取关注作者最新动态
    FETCH_AUTHOR_LATEST: 'FETCH_AUTHOR_LATEST',
    // 获取用户信息
    GET_USERINFO: 'GET_USERINFO',
    // 获取公钥
    FETCH_PUBLIC_KEY: 'FETCH_PUBLIC_KEY'
};

export default actions;
