import React, {Component} from 'react';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import * as constants from '../static/constants.js';
import axios from 'axios';

import VersionHistory from './VersionHistory/VersionHistoryTable';
import VersionHistoryRow from './VersionHistory/VersionHistoryRow';

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
            _id: '',
            permittedLocations: [],
            errorMessage: '',
            successMessage: '',
            file: [],
            previousVersions: [],
            user: []
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        
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
                        _id: file.fileVersions[lastIndex]._id,
                        title: file.fileVersions[lastIndex].title,
                        type: file.fileVersions[lastIndex].type,
                        description: file.fileVersions[lastIndex].description,
                        size: file.fileVersions[lastIndex].size,
                        permittedLocations: file.fileVersions[lastIndex].permittedLocations,
                    });

                    //populate previousVerions for VersionHistory
                    //in DESC order using reverse()
                    let tempVersions = [];

                    //push original final to VersionHistory created by Author
                    tempVersions.push(<VersionHistoryRow
                        key={file._id}
                        id={file._id}
                        title={file.title}
                        type={file.type}
                        size={file.size}
                        lastEdited={
                                new Date(file.dateCreated).toLocaleDateString("en-US")
                                + " - " +
                                new Date(file.dateCreated).toLocaleTimeString("en-US")
                        }
                        lastEditer={file.createdBy}
                />); 
    
                    file.fileVersions.forEach(function(version, idx, array) {
                        //not rendering the newest version
                        if (idx !== array.length -1) {
                            tempVersions.push(<VersionHistoryRow
                                key={version._id}
                                id={version._id}
                                title={version.title}
                                type={version.type}
                                size={version.size}
                                lastEdited={
                                    new Date(version.dateModified).toLocaleDateString("en-US")
                                    + " - " +
                                    new Date(version.dateModified).toLocaleTimeString("en-US")
                                }
                                lastEditer={version.modifiedBy}
                        />);
                        }
                    });

                    this.setState({previousVersions: tempVersions});
                } else {
                    this.setState ({
                        _id: file._id,
                        title: file.title,
                        type: file.type,
                        description: file.description,
                        size: file.size,
                        permittedLocations: file.permittedLocations,
                    });
                }
            } else {
                console.log(result.data);
                this.setState({errorMessage: result.data});
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    dateString = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("en-US")
                + " - " +
                new Date(timestamp).toLocaleTimeString("en-US")
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

    let fileID = this.props.match.params.id;
    axios.post(constants.API + 'file/update/' + fileID,
    { title, description, type, size, permittedLocations, modifiedBy })
      .then((result) => {
        if (result.data.success === true) {
            this.setState({ successMessage: result.data.message});
        }
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

  onDelete = () => {
        let fetchID = this.props.match.params.id;
        axios.post(constants.API + 'file/delete/' + fetchID)
        .then((result) => {
            if (result.data.error) {
                this.setState({errorMessage: result.data.error});
            } else {
                this.props.history.push('/manage');
            }
        })
        .catch ((error) => {
            console.log(error);
        });
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
                        <textarea
                            className="form-control" 
                            required type="text" 
                            name="description" 
                            placeholder="File Description"
                            value={this.state.description}
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
                                value={this.state.type}>
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
                    onClick={this.onDelete}
                    bsStyle="danger" bsSize="small" block>
                    Delete File
                </Button>
            </Form>
            

            <VersionHistory dataCollection={this.state.previousVersions}/>
        </div>
    );
  }
}

export default File;
