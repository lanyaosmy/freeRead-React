import actions from '../actions/constants';

const {
    FETCH_START,
    FETCH_FAILURE,
    FETCH_SUCCESS,
    FETCH_UPLOADING,
    FETCH_HOT,
    FETCH_LATEST,
    FETCH_AUTHOR_LATEST,
    GET_USERINFO,
    FETCH_PUBLIC_KEY,
    CLEAR_HOT,
    CLEAR_LATEST
} = actions;


const initialState = {
    uploadData: false,
    success: null,
    errorMsg: null,
    hotNoteList: [],
    hotHasMore: true,
    latestNoteList: [],
    latestHasMore: true,
    authorLatest: [],
    userinfo: {},
    publicKey: null,
    isLogin: false
};

export function mainReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
    case FETCH_START:
        return Object.assign({}, state, {
            uploadData: false,
            success: null,
            errorMsg: null
        });
    case FETCH_UPLOADING:
        return Object.assign({}, state, {
            uploadData: true,
            success: null,
            errorMsg: null
        });
    case FETCH_SUCCESS:
        return Object.assign({}, state, {
            uploadData: false,
            success: Object.assign({}, state.success, {
                [action.name]: true
            })
        });
    case FETCH_FAILURE:
        return Object.assign({}, state, {
            uploadData: false,
            errorMsg: Object.assign({}, state.errorMsg, {
                [action.name]: payload
            })
        });
    case FETCH_HOT:
        return Object.assign({}, state, {
            hotNoteList: state.hotNoteList.concat(payload.notelist),
            hotHasMore: payload.hasMore
        });
    case CLEAR_HOT:
        return Object.assign({}, state, {
            hotNoteList: [],
            hotHasMore: true
        });
    case FETCH_LATEST:
        return Object.assign({}, state, {
            latestNoteList: state.latestNoteList.concat(payload.notelist),
            latestHasMore: payload.hasMore
        });
    case CLEAR_LATEST:
        return Object.assign({}, state, {
            latestNoteList: [],
            latestHasMore: true
        });
    case FETCH_AUTHOR_LATEST:
        return Object.assign({}, state, {
            authorLatest: payload.authorlatest
        });
    case GET_USERINFO:
        return Object.assign({}, state, {
            userinfo: payload,
            isLogin: true
        });
    case FETCH_PUBLIC_KEY:
        return Object.assign({}, state, {
            publicKey: payload.key
        });
    default:
        return state;
    }
}
