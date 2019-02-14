import React, {Component} from 'react';
import { Button,Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
class LoginPage extends Component {
  render() {
    return (
        <div>
          <div className="container">
            <BreadcrumbsItem to='/login'>User Login</BreadcrumbsItem>
            <Form>
                <FormGroup 
                    noValidate controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>Username</Col>
                    <Col sm={10}>
                        <FormControl 
                            required type="text" 
                            name="username" 
                            placeholder="Username"/>
                    </Col>
                </FormGroup>
                <FormGroup 
                    noValidate controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>Password</Col>
                    <Col sm={10}>
                        <FormControl 
                            required type="text" 
                            name="password" 
                            placeholder="Password"/>
                    </Col>
                </FormGroup>
                <Button 
                    type="submit" 
                    //onClick={this.handleSubmitUpdate}
                    bsStyle="primary">
                    Login
                </Button>
            </Form>
          </div>
        </div>
    )
  }
}

export default LoginPage;
