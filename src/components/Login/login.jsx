import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Button} from 'react-bootstrap';
import {logIn, isAuthenticated} from '../../actions';

const Login = ({login, dispatch}) => {
  let n = '';
  const HandleInput = (e) => {
    n = e.target.value;
  }

  const Chat = () => {
    dispatch(logIn(n));
    localStorage.setItem('nickname', n);
    dispatch(isAuthenticated(true));
  }

  const AuthorisedBefore = () => {
    alert('local');
    dispatch(logIn(localStorage.getItem('nickname'), true));
  }
    if(localStorage.getItem('nickname')&&!login.isAuth){
      AuthorisedBefore();
      return <Redirect to='/chat'/>
    }else if(login.isAuth){
          return <Redirect to='/chat'/>
    } else {
      return ( 
        <Form className='form'>
            <Form.Group>
                <Form.Label>Enter your nickname</Form.Label>
                <Form.Control type="text" placeholder="Enter nickname" className='input' onChange = {HandleInput}/>
                <Button variant="primary" className='logButton' onClick={Chat}>Let`s chat</Button>
            </Form.Group>
        </Form>
    );
    }
  }

const mapStateToProps = state => (
    {
      login: state.login,
    }
)

export default connect(mapStateToProps)(Login);