import { CONSTANTS } from '../actions';

const initialState = {
    nickname: localStorage.length>1?localStorage.getItem('nickname') : '',
    isAuth: localStorage.length>1?true:false,
}


const loginReducer = (state = initialState, action) => {
    let st = {};
    switch(action.type) {
        case CONSTANTS.LOG_IN:
                st = {
                    nickname: action.payload.nickname,
                    isAuth: action.payload.isAuthenticated,
                }
            return st;
        case CONSTANTS.IS_AUTH:
            st = {
                nickname: state.nickname,
                isAuth: action.payload,

            }
            return st;
        default:
            return state;
    }
}

export default loginReducer;