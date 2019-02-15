import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    FormControl, Grid, Row, Alert } from 'react-bootstrap';

class ProfilePage extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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

    axios.post(constants.API + 'account/register',
    { username, password })
      .then((result) => {
        //this.props.history.push("/login")
        console.log(result.data.message);
      });
  }

  render() {
    return (
      <div className="container">
        <BreadcrumbsItem to='/profile'>Profile</BreadcrumbsItem>
        <Form 
            horizontal
            noValidate
            onSubmit={this.onSubmit}>
            <FormGroup 
                noValidate controlId="formHorizontalName">
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
                noValidate controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={2}>Password</Col>
                <Col sm={10}>
                    <FormControl 
                        required type="text" 
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

export default ProfilePage;