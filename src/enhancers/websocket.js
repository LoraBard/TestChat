import ReconnectingWebSocket from 'reconnecting-websocket';
import { CONSTANTS } from '../actions';

let socket = null;

const websocketConnection = (next) => {
    const options = {
        connectionTimeout: 1000,
    };
      socket = new ReconnectingWebSocket("ws://st-chat.shas.tel",[], options);
      socket.binaryType = "arraybuffer";

      socket.onopen = ()=>{
        if(document.cookie.length>1){

            sendMessage({
              message:document.cookie.replace(/(?:(?:^|.*;\s*)message\s\=\*\s*([^;]*).*$)|^.*$/, "$1"),
              from: document.cookie.replace(/(?:(?:^|.*;\s*)from\s\=\*\s*([^;]*).*$)|^.*$/, "$1")
            });
            document.cookie = "message= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "from= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        }
        next({type:CONSTANTS.IS_ONLINE, payload:true});
      };

      socket.onclose = ()=>{
        next({type:CONSTANTS.IS_ONLINE, payload:false});
        socket.reconnect();
      };

      socket.onerror = (e) => {
        console.log(e);
      }

      socket.onmessage = (event)=>{
        next({ type:CONSTANTS.GET_MESSAGES, payload:JSON.parse(event.data).reverse()});
      };
}

function sendMessage(message){
    socket.send(JSON.stringify(message));
}


const logger = (store)=>(next) => (action) =>{
    switch (action.type) {
        case CONSTANTS.START_SOCKET:
            websocketConnection(next);
        break;
        case CONSTANTS.SEND_MESSAGE:
            sendMessage(action.payload);
        break;
        case CONSTANTS.CLOSE_SOCKET:
            socket.close();
        break;
        default:
        next(action); 

    }
} 

export default logger;