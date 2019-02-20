import React, {Component} from 'react';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import * as constants from '../static/constants.js';
import axios from 'axios';

import { 
     Button, 
     FormGroup,
     Form,
     Col,
     ControlLabel,
     FormControl, Alert, Label } from 'react-bootstrap';

//import '../css/main.css';

class File extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            type: '',
            size: '',
            permittedLocations: [],
            errorMessage: '',
            successMessage: '',
            file: [],
            newestRev: [],
            user: []
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async componentDidMount() {

        const tempCollection = [];

        let fetchID = this.props.match.params.id;

        let userObj = JSON.parse(localStorage.getItem('user'));
        this.setState({user: userObj});

        axios.get(constants.API + 'file/' + fetchID)
        .then((result) => {
            if (!result.data.error) {
                let file = result.data.file;

                if (file.fileVersions.length > 0) {
                    let lastIndex = file.fileVersions.length -1;
                    this.setState({
                        title: file.fileVersions[lastIndex].title,
                        type: file.fileVersions[lastIndex].type,
                        description: file.fileVersions[lastIndex].description,
                        size: file.fileVersions[lastIndex].size,
                        permittedLocations: file.fileVersions[lastIndex].permittedLocations,
                    });
                } else {
                    this.setState ({
                        title: file.title,
                        type: file.type,
                        description: file.description,
                        size: file.size,
                        permittedLocations: file.permittedLocations,
                    });
                    this.setState({file: file});
                }

                //this.setState({successMessage: result.data.message});

            } else {
                //this.setState({errorMessage: result.data.message});
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

  onChange = (e) => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const modifiedBy = this.state.user.username;
    const { title, description, type, size, permittedLocations } = this.state;

    console.log(title);
    console.log(description);
    console.log(type);
    console.log(size);
    console.log(permittedLocations);
    
    let fileID = this.props.match.params.id;
    axios.post(constants.API + 'file/update/' + fileID,
    { title, description, type, size, permittedLocations, modifiedBy })
      .then((result) => {
        if (result.data.success === true) {
            this.setState({ successMessage: result.data.message});
        }
        console.log(result.data.message);
      });
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

  render() {
    const { errorMessage, successMessage } = this.state;
    return (
        <div className="container">
            
            <BreadcrumbsItem to='#'>Manage Files</BreadcrumbsItem>
            <BreadcrumbsItem to='/manage'>{this.state.title}{this.state.type}</BreadcrumbsItem> 
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
            <h3>Most Recent Verison</h3>
            <Form 
                horizontal
                noValidate
                onSubmit={this.onSubmit}>
                <FormGroup 
                    noValidate controlId="formHorizontalTitle">
                    <Col componentClass={ControlLabel} sm={2}>File Name</Col>
                    <Col sm={8}>
                        <FormControl 
                            required type="text" 
                            name="title" 
                            placeholder="File Name"
                            defaultValue={this.state.title}
                            onChange={this.onChange}/>
                    </Col>
                </FormGroup>
                <FormGroup 
                    noValidate controlId="formHorizontalDescription">
                    <Col componentClass={ControlLabel} sm={2}>File Description</Col>
                    <Col sm={8}>
                        <FormControl 
                            required type="text" 
                            name="description" 
                            placeholder="File Description"
                            defaultValue={this.state.description}
                            onChange={this.onChange}/>
                    </Col>
                </FormGroup>
                <FormGroup 
                    noValidate controlId="formHorizontalFileType">
                    <Col componentClass={ControlLabel} sm={2}>File Type</Col>
                    <Col sm={8}>
                        <select name="type" 
                                onChange={this.onChange}
                                className="form-control"
                                defaultValue={this.state.type}>
                            <option value=".pdf">.pdf</option>
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
                    noValidate controlId="formHorizontalSize">
                    <Col componentClass={ControlLabel} sm={2}>File Size <small>(kb)</small></Col>
                    <Col sm={8}>
                        <FormControl 
                            required type="number" 
                            name="size" 
                            defaultValue={this.state.size}
                            placeholder="File Size"
                            onChange={this.onChange}/>
                    </Col>
                </FormGroup>
                <FormGroup 
                    noValidate controlId="formHorizontalPermittedLocations">
                    <Col componentClass={ControlLabel} sm={2}>Permitted Locations</Col>
                    <Col sm={8}>
                        <select name="permittedLocations"
                                onChange={this.onChangeMulti}
                                 multiple 
                                 data-live-search="true"
                                 className="form-control"
                                 defaultValue={this.state.permittedLocations}>
                            <option value="Oslo">Oslo</option>
                            <option value="Leeds">Leeds</option>
                            <option value="Malmö">Malmö</option>
                        </select>
                        <Label>Select which locations of the Company should be able to view this file.</Label>
                    </Col>
                </FormGroup>
                <Button 
                    type="submit" 
                    onClick={this.onSubmit}
                    bsStyle="primary" bsSize="small" block>
                    Save and Checkout
                </Button>
                <Button 
                    type="submit" 
                    onClick={this.onSubmit}
                    bsStyle="danger" bsSize="small" block>
                    Delete File
                </Button>
            </Form>
            <h3>Previous Versions</h3>
        </div>
    );
  }
}

export default File;
