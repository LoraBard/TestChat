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

export const sendMessage = (message) => {
    return {
        type: CONSTANTS.SEND_MESSAGE,
        payload: {
            from: message.from,
            message: message.message
        }
    }
}

export const getMessages = (message) => {
    return {
        type: CONSTANTS.GET_MESSAGES,
        payload: message
    }
}

export const startSocket = () => {
    return{
        type: CONSTANTS.START_SOCKET
    }
}

export const closeSocket = (flag) => {
    return{
        type:CONSTANTS.CLOSE_SOCKET
    }
}

export const resetSocket = (flag) => {
    return{
        type:CONSTANTS.RESET_SOCKET
    }
}

export const notify = (flag) => {
    return{
        type:CONSTANTS.NOTIFY,
        payload: flag
    }
}