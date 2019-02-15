import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import * as constants from '../static/constants.js';

import { 
     Button, 
     FormGroup,
     Form,
     Col,
    ControlLabel,
    FormControl } from 'react-bootstrap';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      location: '',
      team: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password, firstName, lastName, location, team } = this.state;

    axios.post(constants.API + 'account/register',
    { username, password, firstName, lastName, location, team })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { username, password, firstName, lastName, location, team } = this.state;
    return (
      <div className="container">
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
        <FormGroup 
            noValidate controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>First Name</Col>
            <Col sm={10}>
                <FormControl 
                    required type="text" 
                    name="firstName" 
                    placeholder="First Name"
                    onChange={this.onChange}/>
            </Col>
        </FormGroup>
        <FormGroup 
            noValidate controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>Surname</Col>
            <Col sm={10}>
                <FormControl 
                    required type="text" 
                    name="lastName" 
                    placeholder="Surname"
                    onChange={this.onChange}/>
            </Col>
        </FormGroup>
        <FormGroup 
            noValidate controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>Location</Col>
            <Col sm={10}>
                <FormControl 
                    required type="text" 
                    name="location" 
                    placeholder="Location"
                    onChange={this.onChange}/>
            </Col>
        </FormGroup>
        <FormGroup 
            noValidate controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>Team</Col>
            <Col sm={10}>
                <FormControl 
                    required type="text" 
                    name="team" 
                    placeholder="Team"
                    onChange={this.onChange}/>
            </Col>
        </FormGroup>
        <Button 
            type="submit" 
            onClick={this.onSubmit}
            bsStyle="primary" bsSize="large" block>
            Register
        </Button>
    </Form>
        {/* <form class="form-signin" onSubmit={this.onSubmit}>
          <h2 class="form-signin-heading">Register</h2>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" class="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form> */}
      </div>
    );
  }
}

export default Register;