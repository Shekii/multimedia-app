import React, { Component } from 'react';
import axios from 'axios';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import * as constants from '../static/constants.js';

import { 
     Button, 
     FormGroup,
     Form,
     Col,
    ControlLabel,
    FormControl, Alert } from 'react-bootstrap';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      location: 'Oslo',
      team: 'Creative',
      errorMessage: ''
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password, firstName, lastName, location, team } = this.state;

    axios.post(constants.API + 'account/register',
    { username, password, firstName, lastName, location, team })
      .then((result) => {
        if (result.data.success === false) {
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
            <Alert dismissible="true" variant="danger">
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
            <FormGroup 
                noValidate controlId="formHorizontalFirstName">
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
                noValidate controlId="formHorizontalLastName">
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
                noValidate controlId="formHorizontalLocation">
                <Col componentClass={ControlLabel} sm={2}>Location</Col>
                <Col sm={10}>
                    <select name="location" onChange={this.onChange} className="form-control">
                        <option value="Oslo" defaultValue="Oslo">Oslo</option>
                        <option value="Malmö">Malmö</option>
                        <option value="Leeds">Leeds</option>
                    </select>
                </Col>
            </FormGroup>
            <FormGroup 
                noValidate controlId="formHorizontalTeam">
                <Col componentClass={ControlLabel} sm={2}>Team</Col>
                <Col sm={10}>
                    <select name="team" onChange={this.onChange} className="form-control">
                        <option value="Creative" defaultValue="Creative">Creative</option>
                        <option value="Sales"> Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Management/Support">Management/Support</option>
                    </select>
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