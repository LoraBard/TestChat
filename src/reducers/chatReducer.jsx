import { CONSTANTS } from '../actions';

const initialState = {
    isOnline: true
}

const chatReducer = (state = initialState, action) => {
    let st = {};
    switch(action.type) {
        case CONSTANTS.IS_ONLINE:
                st = {
                    isOnline: action.payload
                }
            return st;
        default:
            return state;
    }
}

export default chatReducer;