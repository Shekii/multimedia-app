import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import * as constants from '../static/constants.js';

import { 
     Button, 
     FormGroup,
     Form,
     Col,
    ControlLabel,
    FormControl, Alert } from 'react-bootstrap';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      errorMessage: '',
      isActive: false
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post(constants.API + 'account/login', { username, password })
      .then((result) => {
        if (result.data.success === true) {
          localStorage.setItem('jwtToken', result.data.token);
          localStorage.setItem('user', JSON.stringify(result.data.user));
          
          this.setState({ errorMessage: '' });
          this.props.history.push('/')
        } 
      })
      .catch((error) => {
          this.setState({errorMessage: 'Authorisation failed. Invalid Username or Password.'});
      });
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="container">
        <BreadcrumbsItem to='/login'>Login</BreadcrumbsItem>
          {errorMessage !== '' && 
            <Alert variant="danger" role="alert">
             <p> { errorMessage } </p>
            </Alert>
          }
        <Form 
            horizontal
            noValidate
            onSubmit={this.onSubmit}>
            <FormGroup 
                noValidate controlId="formHorizontalUsername">
                <Col componentClass={ControlLabel} sm={2}>Username</Col>
                <Col sm={10}>
                    <FormControl 
                        required type="text" 
                        name="username" 
                        placeholder="Username"
                        onChange={this.onChange}/>
                </Col>
            </FormGroup>
            <FormGroup 
                noValidate controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>Password</Col>
                <Col sm={10}>
                    <FormControl 
                        required type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={this.onChange}/>
                </Col>
            </FormGroup>
            <Button 
                type="submit" 
                onClick={this.onSubmit}
                bsStyle="primary" bsSize="large" block>
                Login
            </Button>
        </Form>
    </div>
    );
  }
}

export default Login;