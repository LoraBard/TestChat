import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    login: loginReducer,
    chat: chatReducer
});