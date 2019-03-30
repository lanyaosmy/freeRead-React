import fetch from 'cross-fetch';
import actions from './constants.js';

const {
    FETCH_FAILURE,
    FETCH_UPLOADING,
    FETCH_SUCCESS,
    FETCH_HOT,
    FETCH_LATEST,
    FETCH_AUTHOR_LATEST,
    GET_USERINFO,
    FETCH_PUBLIC_KEY,
    CLEAR_HOT,
    CLEAR_LATEST
} = actions;
// url

const ip = 'http://localhost:9090/';
const hot = 'note/hot';
const latest = 'note/latest';
const authorlatest = 'note/authorlatest';
const getkey = 'user/getKey';
// 检测是否当前正在有请求
function shouldFetchPost(state) {
    const { uploadData } = state.mainReducer;
    if (uploadData) {
        return false;
    }
    return true;
}

// 带超时的fetch方法
function myFetch(url, myAction, type, dispatch, timeout) {
    return Promise.race([
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080/'
            }
        }),
        new Promise(function(resolve, reject) {
            setTimeout(() => reject(new Error('timeout')), timeout);
        })])
        .then(res => res.json())
        .then(resdata => {
            const { code, msg, data } = resdata;
            if (code === '0') {
                dispatch({
                    type: FETCH_SUCCESS,
                    name: type
                });
                if (data) {
                    return dispatch({
                        type: myAction,
                        payload: data
                    });
                }
            }
            return dispatch({
                type: FETCH_FAILURE,
                payload: msg,
                name: type
            });
        }).catch((res) => {
            return dispatch({
                type: FETCH_FAILURE,
                payload: res === 'timeout' ? '网络请求超时，请稍后再试' : '网络请求失败，请稍后再试',
                name: type
            });
        });
}

// 获取热门笔记
export const fetchHot = (page) => (dispatch, getState) => {
    if (!shouldFetchPost(getState())) {
        return;
    }

    dispatch({
        type: FETCH_UPLOADING,
        name: 'fetchHot'
    });
    myFetch(ip + hot + '?page=' + page, FETCH_HOT, 'fetchHot', dispatch, 10000);
};

export function clearHot() {
    return {
        type: CLEAR_HOT
    };
}

export function clearLatest() {
    return {
        type: CLEAR_LATEST
    };
}

// 获取最新动态
export const fetchLatest = (page) => (dispatch, getState) => {
    if (!shouldFetchPost(getState())) {
        return;
    }
    dispatch({
        type: FETCH_UPLOADING,
        name: 'fetchLatest'
    });
    myFetch(ip + latest + '?page=' + page, FETCH_LATEST, 'fetchLatest', dispatch, 10000);
};

// 获取关注作者最新动态
export const fetchAuthorLatest = () => (dispatch) => {
    myFetch(ip + authorlatest, FETCH_AUTHOR_LATEST, 'fetchAuthorLatest', dispatch, 10000);
};

// 获取用户信息
export function getUserinfo(info) {
    return {
        type: GET_USERINFO,
        payload: info
    };
}
// 获取公钥
export const fetchPublicKey = () => (dispatch) => {
    myFetch(ip + getkey, FETCH_PUBLIC_KEY, 'fetchPublicKey', dispatch, 10000);
};
