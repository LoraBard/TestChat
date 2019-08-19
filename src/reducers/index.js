import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    login: loginReducer,
    chat: chatReducer,
    messages: messageReducer
});