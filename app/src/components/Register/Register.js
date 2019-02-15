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

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      location: '',
      team: '',
      errorMessage: ''
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
        if (result.data.success == false) {
            this.setState({ errorMessage: result.data.message});
        } else {
            this.props.history.push("/login")
        }
      });
  }

  render() {
    //const { username, password, firstName, lastName, location, team } = this.state;
    const { errorMessage } = this.state;
    return (
      <div className="container">
        <BreadcrumbsItem to='/login'>Register New Account</BreadcrumbsItem>
          {errorMessage !== '' &&
            <div className="alert alert-danger alert-dismissible" role="danger">
              { errorMessage }
            </div>
          }
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
    </div>
    );
  }
}

export default Register;