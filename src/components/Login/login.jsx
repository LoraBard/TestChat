import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Button} from 'react-bootstrap';
import {logIn, isAuthenticated} from '../../actions';

class Login extends React.Component {
  HandleInput = (e) => {
    const { dispatch } = this.props;
    dispatch(logIn(e.target.value));
  }
  Chat = () => {
    const { dispatch } = this.props;
    dispatch(isAuthenticated(true));
    localStorage.setItem('nickname', this.props.login.nickname);
  }
  AuthorisedBefore = () => {
    const { dispatch } = this.props;
    dispatch(logIn(localStorage.getItem('nickname'), true));
  }
  render() {
    if(localStorage.getItem('nickname')){
      this.AuthorisedBefore();
      return <Redirect to={{ pathname: "/chat"}}/>
    }else if(this.props.login.isAuth){
          return <Redirect to={{ pathname: "/chat"}}/>
    } else {
      return ( 
        <Form className='form'>
            <Form.Group>
                <Form.Label>Enter your nickname</Form.Label>
                <Form.Control type="text" placeholder="Enter nickname" className='input' onChange = { this.HandleInput }/>
                <Button variant="primary" className='logButton' onClick={this.Chat}>Let`s chat</Button>
            </Form.Group>
        </Form>
    );
    }
  }
}

const mapStateToProps = state => (
    {
      login: state.login,
    }

)

export default connect(mapStateToProps)(Login);