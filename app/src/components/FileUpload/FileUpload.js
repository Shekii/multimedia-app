import React, { Component } from 'react';
import axios from 'axios';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import * as constants from '../static/constants.js';
import {withRouter} from "react-router-dom";
import { 
     Button, 
     FormGroup,
     Form,
     Col,
     ControlLabel,
     FormControl, Alert, Label } from 'react-bootstrap';

class FileUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      type: '.pdf',
      size: '',
      permittedLocations: [],
      errorMessage: '',
      successMessage: '',
      user: props.user
    };

  }
  componentDidMount() {
      console.log(this.state.user.username);
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onChangeMulti = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
        value.push(options[i].value);
        }
    }
    const state = this.state;
    state[e.target.name] = value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const createdBy = this.props.user.username;
    const { title, description, type, size, permittedLocations } = this.state;

    axios.post(constants.API + 'file/upload',
    { title, description, type, size, permittedLocations, createdBy })
      .then((result) => {
        if (result.data.success === true) {
            this.setState({ successMessage: result.data.message});
        } else {
            this.setState({ errorMessage: result.data.message});
        }
        console.log(result.data.message);
      });
  }

  render() {
    const { errorMessage, successMessage } = this.state;
    return (
      <div className="container">
        <BreadcrumbsItem to='/login'>Upload New File</BreadcrumbsItem>
          {errorMessage !== '' &&
            <Alert dismissible="true" variant="danger">
             <p> { errorMessage } </p>
            </Alert>
          }
          {successMessage !== '' &&
            <Alert dismissible="true" variant="success">
             <p> { successMessage } </p>
            </Alert>
          }
        <Form 
            horizontal
            noValidate
            onSubmit={this.onSubmit}>
            <FormGroup 
                noValidate controlId="formHorizontalTitle">
                <Col componentClass={ControlLabel} sm={2}>File Name</Col>
                <Col sm={10}>
                    <FormControl 
                        required type="text" 
                        name="title" 
                        placeholder="File Name"
                        onChange={this.onChange}/>
                </Col>
            </FormGroup>
            <FormGroup 
                noValidate controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>File Description</Col>
                <Col sm={10}>
                    <FormControl 
                        required type="text" 
                        name="description" 
                        placeholder="File Description"
                        onChange={this.onChange}/>
                </Col>
            </FormGroup>
            <FormGroup 
                noValidate controlId="formHorizontalFileType">
                <Col componentClass={ControlLabel} sm={2}>File Type</Col>
                <Col sm={10}>
                    <select name="type" onChange={this.onChange} className="form-control">
                        <option value=".pdf" defaultValue=".pdf">.pdf</option>
                        <option value=".gif">.gif</option>
                        <option value=".jpg">.jpg</option>
                        <option value=".docx">.docx</option>
                        <option value=".xls">.xls</option>
                        <option value=".pptx">.pptx</option>
                        <option value=".txt">.txt</option>
                    </select>
                </Col>
            </FormGroup>
            <FormGroup 
                noValidate controlId="formHorizontalFirstName">
                <Col componentClass={ControlLabel} sm={2}>File Size <small>(kb)</small></Col>
                <Col sm={10}>
                    <FormControl 
                        required type="number" 
                        name="size" 
                        placeholder="File Size"
                        onChange={this.onChange}/>
                </Col>
            </FormGroup>
            <FormGroup 
                noValidate controlId="formHorizontalPermittedLocations">
                <Col componentClass={ControlLabel} sm={2}>Permitted Locations</Col>
                <Col sm={10}>
                    {/* <FormControl 
                        required type="text" 
                        name="lastName" 
                        placeholder="Surname"
                        onChange={this.onChange}/> */}
                        <select name="permittedLocations" onChange={this.onChangeMulti} multiple data-live-search="true" className="form-control">
                            <option>Oslo</option>
                            <option>Leeds</option>
                            <option>Malmö</option>
                        </select>
                    <Label>Select which locations of the Company should be able to view this file.</Label>
                </Col>
            </FormGroup>
            <Button 
                type="submit" 
                onClick={this.onSubmit}
                bsStyle="primary" bsSize="large" block>
                Upload File
            </Button>
        </Form>
    </div>
    );
  }
}

export default withRouter(FileUpload);