import { CONSTANTS } from '../actions';

const initialState = {
    isOnline: true,
    notify:false
}

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONSTANTS.IS_ONLINE:
                return {
                    ...state,
                    isOnline: action.payload,
                }
        case CONSTANTS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            }

        default:
            return state;
    }
}

export default chatReducer;