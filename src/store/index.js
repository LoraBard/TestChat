import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import logger from '../enhancers/websocket';

const store = createStore(rootReducer,applyMiddleware(logger));
console.log(store);
export default store;