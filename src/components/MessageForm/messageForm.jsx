import React, {useState} from "react";
import { OverlayTrigger, Image, Form, Popover} from 'react-bootstrap';
import {sendMessage, getMessages} from '../../actions';
import { Picker } from 'emoji-mart'
import smile from '../../assets/smile.png'
import send from '../../assets/send.png';

const MessageForm = ({dispatch, login, isOnline})=>{
    const [text, setText] = useState('');
    const saveMessage = (event)=>{
        setText(event.target.value);
    }
    const Message = () => {
        dispatch(sendMessage({
            message:text,
            from:login.nickname
        }));
        if(!isOnline){
          document.cookie = `message=${text}`;
          document.cookie = `from=${login.nickname}`;
          dispatch(getMessages([{
            from: login.nickname,
              message: text,
              time: Date.now()
          }]))}
        setText('');
    }
    const addEmoji = (e)=>{
        let emoji = e.native;
        setText(text + emoji);
      }
    const popover = (
        <Popover id="popover-basic">
          <Picker onSelect={addEmoji} />
        </Popover>
      );
    return (
        <Form onSubmit={Message}>
      <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Image src={smile} className='emodji'/>
      </OverlayTrigger>
        <textarea value={text} className='textarea' onChange={saveMessage}/>
        <Image src={send} id='send' type="submit" onClick={Message}/>
        </Form>
    )
}

export default MessageForm;