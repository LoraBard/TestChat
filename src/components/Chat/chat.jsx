import React from "react";
import { Container, Row, Col, Button, OverlayTrigger,Popover, Image, Spinner, Form} from 'react-bootstrap';
import Message from '../Message';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {uniqueId} from 'lodash';
import {isAuthenticated, isOnline} from '../../actions';
import { Picker } from 'emoji-mart'
import smile from '../../assets/smile.png'
import send from '../../assets/send.png';
import arrow from '../../assets/arrow.png';
import ReconnectingWebSocket from 'reconnecting-websocket';


class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
      messages:[],
      text: ''
    }
    this.active=true;
    this.inputValue='';
    this.messagesEnd='';
    this.granted=false;
    const options = {
      connectionTimeout: 5000,
  };
    this.socket = new ReconnectingWebSocket(" wss://wssproxy.herokuapp.com/",[], options);
    this.socket.binaryType = "arraybuffer";
    this.addEventSocket();
    this.NotificationRequested();
  }

 changeActive(){
   this.active=!this.active;
 }

 socketOpen(){
    const { dispatch } = this.props;
    dispatch(isOnline(true));
    if(document.cookie.length>1){
      this.sendMessage();
    }
    this.setState({
      messages: []
  });
  document.cookie = "message= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
 }

 socketMessage(event){
  this.setState((prevState)=>{
    return {
      messages: prevState.messages.concat(JSON.parse(event.data).reverse()),
    }
  });
   if(this.granted){
    this.sendNotification(JSON.parse(event.data));
  }
    this.scrollToBottom();
 }

 NotificationRequested(){
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else{
    Notification.requestPermission(permission=> {
      if (permission === "granted") {
        this.granted=true;
      }
    });
  }
 }

 addEventSocket(){

  window.addEventListener('focus',()=>this.changeActive);
  window.addEventListener('blur',()=>this.changeActive);

  window.addEventListener('online',()=>this.updateStatus());
  window.addEventListener('offline',()=>this.updateStatus());

  this.socket.addEventListener('open', ()=>this.socketOpen());

  this.socket.addEventListener('message', (event)=>this.socketMessage(event));

  this.socket.addEventListener('close', ()=>this.socketClose());
}

 socketClose(){
  const { dispatch } = this.props;
  dispatch(isOnline(false));
  window.removeEventListener('focus',this.changeActive);
  window.removeEventListener('blur',this.changeActive);
  window.removeEventListener('online',this.updateStatus);
  window.removeEventListener('offline',this.updateStatus);

  this.socket.removeEventListener('open',this.socketOpen);
  this.socket.removeEventListener('message',this.socketMessage);
  this.socket.removeEventListener('close',this.socketClose);
 }

  sendNotification(data){
    data.map((mess) => {
      let body = mess.message;
      return new Notification(mess.from, {body})
    });
  }

  updateStatus(){
    const { dispatch } = this.props;
    if(navigator.onLine){
      dispatch(isOnline(true));
    } else {
      this.socket.close();
      this.socket.reconnect();
    }
  }
  
  closeSocket(){
    const { dispatch } = this.props;
    dispatch(isAuthenticated(false));
    this.socket.close();
    localStorage.clear();
  }

  saveMessage(event){
    this.setState({
       text: event.target.value
    });
  }

  addEmoji(e){
    let emoji = e.native;
    this.setState((prevState, props)=>{
      return {
        text: prevState.text + emoji
      }
    });
  }


  sendMessage(){
    this.socket.send(JSON.stringify({
      from: this.props.login.nickname,
      message: this.state.text!==''?this.state.text:document.cookie.replace(/(?:(?:^|.*;\s*)message\s\=\*\s*([^;]*).*$)|^.*$/, "$1")
    }));
    if(!this.props.chat.isOnline){
      document.cookie = `message=${this.state.text}`;
      this.setState((prevState)=>{
        return {
          messages: prevState.messages.concat([{
            from: this.props.login.nickname,
            message: this.state.text,
            time: Date.now()
          }]),
        }
      });
    }
    this.setState({text:''});
  }

  scrollToBottom = () => {
      this.messagesEnd.scrollIntoView();
  }

  returnMessages(){
    const popover = (
      <Popover id="popover-basic">
        <Picker onSelect={(e)=>this.addEmoji(e)} />
      </Popover>
    );
    return (
      <Container className='cont'>
      <Row className='chatContainer'>
        <Col className='pl-0'>
          <ul>
            {
              this.state.messages.length>0 ? this.state.messages.map( message => message.from!==this.props.login.nickname ? <li key={uniqueId()}><Message info={message}/></li> : <li key={uniqueId()} className='myMess'><Message info={message} my={true}/></li>) : <li><Spinner animation="border" variant="secondary" /></li>
            }
          </ul>
          <div onClick={this.scrollToBottom} className='arrow'><Image src={arrow}/></div>
          <div ref={el=>this.messagesEnd=el}></div>
        </Col>
      </Row>
      <Row id='typeMessage'>
      <Form onSubmit={() => this.sendMessage()}>
      <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Image src={smile} className='emodji'/>
      </OverlayTrigger>
        <textarea  value={this.state.text} onChange={(event)=>this.saveMessage(event)}/>
        <Image src={send} className='send' type="submit" onClick={() => this.sendMessage()}/>
        </Form>
      </Row>
    </Container>
    );
  }
  

  render(){
        if(this.props.chat.isOnline){
          if(this.props.login.isAuth){
            return (
              <div>
                <div className='titleChat'>
                  <Button onClick = {() => this.closeSocket()} className='buttonExit' variant='primary' style={{ backgroundColor: "#9999ff" }}>LOG OUT</Button>
                  <h5 className='hello'>Hello {this.props.login.nickname}</h5>
                </div>
                {this.returnMessages()}
              </div>
            );
          } else {
            return <Redirect to={{ pathname: "/login"}}/>
          }
        } else {
          return (
            <div>
                <div className='titleChat'>
                  <Button onClick = {() => this.closeSocket()} className='buttonExit' variant='primary' style={{ backgroundColor: "#9999ff" }}>LOG OUT</Button>
                  <p>Trying to connect</p>
                </div>
                {this.returnMessages()}
            </div>
          )
        }
  }
}

const mapStateToProps = state => (
  {
    login: state.login,
    chat: state.chat
  }

)

export default connect(mapStateToProps)(Chat);
