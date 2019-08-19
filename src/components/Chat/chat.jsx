import React from "react";
import { Container, Row, Col, Button, Image, Spinner} from 'react-bootstrap';
import {uniqueId} from 'lodash';
import Message from '../Message';
import MessageForm from '../MessageForm';
import {NotificationRequested, sendNotification} from './notifications';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {isAuthenticated, isOnline, startSocket, notify, closeSocket} from '../../actions';
import arrow from '../../assets/arrow.png';


class Chat extends React.Component{
  constructor(props){
    super(props);
    this.active = true;
    this.messagesEnd = null;
    this.scrollElem = null;
    this.arrow=null;
    this.f=false;
    this.addEventListeners();
  }

  scrollToBottom(){
      this.messagesEnd.scrollIntoView();
  }

  componentDidUpdate(){
    if(this.props.chat.notify&&!this.active&&this.props.messages.messages.length){
      sendNotification(this.props.messages.messages[this.props.messages.messages.length-1]);
    }
    if(!this.f){
      this.scrollToBottom();
    }
  }

  addEventListeners(){
    window.onload=()=>{
      this.props.dispatch(startSocket());
      NotificationRequested().then(result=>{
        if(result){
          this.props.dispatch(notify(true));
        }
      }).catch(()=>{
        alert('Error notifications');
      });
      document.addEventListener('visibilitychange',()=>this.changeActive(),false);
      window.addEventListener('online',()=>this.updateStatus());
      window.addEventListener('offline',()=>this.updateStatus());
    }
  }

  scrollControl(){
    this.arrow.hidden = (this.scrollElem.scrollTop >= this.scrollElem.clientHeight*100);
  }


    updateStatus(){
      if(navigator.onLine){
        this.props.dispatch(isOnline(true));
      } else {
        this.props.dispatch(closeSocket());
        this.props.dispatch(isOnline(false));
      }
    }

    changeActive(){
      if (document.hidden) {
        this.active=false;
      }else{
        this.active=true;
      }
    }

    close(){
      this.props.dispatch(isAuthenticated(false));
      this.props.dispatch(closeSocket());
      localStorage.clear();
      this.f=true;
  }

    returnMessages(){
    return (
      <Container className='cont'>
      <Row className='chatContainer' ref={el=>this.scrollElem=el} onScroll={()=>this.scrollControl()}>
        <Col className='pl-0'>
          <ul>
            {
              this.props.messages.messages.length>0 ? this.props.messages.messages.map( message => message.from!==this.props.login.nickname ? <li key={message.key || uniqueId()}><Message info={message}/></li> : <li key={message.key || uniqueId()} className='myMess'><Message info={message} my={true}/></li>) : <li><Spinner animation="border" variant="secondary" /></li>
            }
          </ul>
          <div ref={el=>this.arrow=el} onClick={()=>this.scrollToBottom()} className='arrow'><Image src={arrow}/></div>
          <div ref={el=>this.messagesEnd=el}>
          </div>
        </Col>
      </Row>
      <Row id='typeMessage'>
      <MessageForm dispatch={this.props.dispatch} login={this.props.login} isOnline={this.props.chat.isOnline}/>
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
              <Button onClick = {()=>this.close()} className='buttonExit' variant='primary' style={{ backgroundColor: "#9999ff" }}>LOG OUT</Button>
              <h5 className='hello'>Hello {this.props.login.nickname}</h5>
            </div>
            {
              this.returnMessages()
            }
          </div>
        );
      } else {
        return <Redirect to={{ pathname: process.env.PUBLIC_URL + '/login'}}/>
      }
    } else {
      return (
        <div>
            <div className='titleChat'>
              <Button onClick = {()=>this.close()} className='buttonExit' variant='primary' style={{ backgroundColor: "#9999ff" }}>LOG OUT</Button>
              <p style={{color:'red'}}>Trying to connect</p>
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
    chat: state.chat,
    messages: state.messages
  }

)

export default connect(mapStateToProps)(Chat);
