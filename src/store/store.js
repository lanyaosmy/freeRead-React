import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

// 创建store
export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
        ),
    );
}
