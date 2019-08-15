import {CONSTANTS} from '../actions';
export const logIn = (nickname, flag = false) => {
    return {
        type: CONSTANTS.LOG_IN,
        payload: {
            nickname: nickname,
            isAuthenticated: flag
        },
    };
};

export const isAuthenticated = (flag) => {
    return {
        type: CONSTANTS.IS_AUTH,
        payload: flag,
    };
};

export const isOnline = (flag) => {
    return {
        type: CONSTANTS.IS_ONLINE,
        payload: flag,
    }
}