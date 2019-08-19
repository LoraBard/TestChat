import { CONSTANTS } from '../actions';

const initialState = {
    messages: []
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONSTANTS.GET_MESSAGES:
            return {
                messages: [...state.messages, ...action.payload],
            }
        case CONSTANTS.START_SOCKET:
            return {
                messages: action.payload,
            }
        case CONSTANTS.RESET_SOCKET:
            return {
                messages: [],
            }
        default:
            return state;
    }
}

export default messageReducer;