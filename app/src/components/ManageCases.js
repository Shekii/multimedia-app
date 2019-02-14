import React, {Component} from 'react';

import CasesTable from './CasesTable';
import NewCaseForm from './NewCaseForm';
import EditCaseForm from './EditCaseForm';
import RemoveCaseForm from './RemoveCaseForm';
import CaseCollection from './CaseCollection';

import * as constants from './static/constants.js';

import {  Modal, Button } from 'react-bootstrap';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'


class ManageCases extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            dataCollection:[],
            formIsValid:false, 
            caseToEdit:[], 
            caseToRemove:[], 
            showNewCaseModal:false, showEditCaseModal:false, 
            showCaseCaseModal:false,
            caseName:'', text:'', caseDate:''
        };

        this.handleSubmitNewCase = this.handleSubmitNewCase.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);

        this.handleOpenNewCaseModal = this.handleOpenNewCaseModal.bind(this);
        this.handleCloseNewCaseModal = this.handleCloseNewCaseModal.bind(this);
        this.handleOpenEditCaseModal = this.handleOpenEditCaseModal.bind(this);
        this.handleCloseEditCaseModal = this.handleCloseEditCaseModal.bind(this);
        this.editCase = this.editCase.bind(this);

        this.handleOpenRemoveCaseModal = this.handleOpenRemoveCaseModal.bind(this);
        this.handleCloseRemoveCaseModal = this.handleCloseRemoveCaseModal.bind(this);
        this.removeCase = this.removeCase.bind(this);

        this.viewCase = this.viewCase.bind(this); 

    }

    async componentDidMount() {
        //WatsonDiscovery
        const tempCollection = [];

        //Watson Discovery
        await fetch(constants.API + '/cases_discovery')
            .then(res => res.json())
            .then(item => {
                 item.data.forEach(it => {
                    tempCollection.push(<CaseCollection
                        key={it.id}
                        id={it.id}
                        caseName={it.caseName}
                        caseDate={it.caseDate}
                        text={it.text}
                        ec={this.editCase}
                        dc={this.removeCase}
                        vc={this.viewCase}
                    />);
                })
                console.log(tempCollection);
                this.setState({ dataCollection: tempCollection });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async handleSubmitNewCase(event) {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            this.setState({ formIsValid: false });
            // form is invalid! so we do nothing
            return;
        }
        else {
            console.log("formIsValid: false");
        }
        this.setState({ formIsValid: true });

        let nu = {
            caseName:this.state.caseName,
            caseDate:this.state.caseDate,
            text:this.state.text,
        };
        fetch(constants.API + '/cases_discovery', {
            method: "POST",
            body:JSON.stringify(nu),
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(response => {
            response.json()
            .then(status => {
                console.log("Successful "+ status);
            })
        })
        .then(this.handleCloseNewCaseModal())
        .then(window.location.reload());

    }

    async handleSubmitDelete(event) {
        console.log(this.state.caseToRemove);
        
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({ formIsValid: false });
            // form is invalid! so we do nothing
            return;
        }
        this.setState({ formIsValid: true });

        let url = constants.API + '/cases_discovery/'+ this.state.caseToRemove.id +'/delete';
        console.log(url);

        //http://localhost:3050/api/cases_discovery/4d084294-d82b-4672-a933-44bbb2ee3313/edit

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(response => {
            response.json()
            .then(status => {
                console.log("Successful "+ status);
            })
        })
        .then(this.handleCloseRemoveCaseModal())
        .then(window.location.reload())
    }

    handleSubmitUpdate(event) {
        console.log(this.state.caseToEdit);

        console.log("HANDLE_UPDATE");
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({ formIsValid: false });
            // form is invalid! so we do nothing
            return;
        }
        this.setState({ formIsValid: true });
        let url = constants.API + '/cases_discovery/'+ this.state.caseToEdit.id +'/edit';
        // console.log(url);

        fetch(url, {
            method: "POST",
            body:JSON.stringify(this.state.caseToEdit),
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(response => {
            response.json()
            .then(status => {
                console.log("Successful "+ status);
            })
        })
        .then(this.handleCloseEditCaseModal())
        .then(window.location.reload())
    }


    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    handleUpdateChange(event) {
        const target = event.target;
        const name = target.name;
        let temp = this.state.caseToEdit;
        temp[name] = target.value;
        console.log(temp);
        this.setState({ caseToEdit:temp }); 
        // this.setState({ [name]: target.value});
    }

    downloadAllJson() {
        let data = this.state.showNewCaseModal;
        console.log(data);
    }


    handleOpenNewCaseModal () { this.setState({ showNewCaseModal: true }); }  
    handleCloseNewCaseModal () { this.setState({ showNewCaseModal: false }); }
    handleCloseEditCaseModal () { this.setState({ showEditCaseModal: false }); }
    handleOpenEditCaseModal () { this.setState({ showEditCaseModal: true }); } 
    
    handleCloseRemoveCaseModal () { this.setState({ showRemoveCaseModal: false }); }
    handleOpenRemoveCaseModal () { this.setState({ showRemoveCaseModal: true }); }  

    editCase(orig, evt) {
        this.setState({ showEditCaseModal:true, caseToEdit:orig }); 
    }

    removeCase(orig, evt) {
        this.setState ({showRemoveCaseModal:true, caseToRemove:orig })
    }

    viewCase(orig, evt) {
        console.log(orig.key);
    }

  render() {
    return (
        <div>
            
            <BreadcrumbsItem to='/manage'>Manage Cases</BreadcrumbsItem>
                <div className="container">
                    
                  <Button 
                    bsStyle="primary"
                    bsSize="large"
                    block
                    onClick={this.handleOpenNewCaseModal}>
                      Add New Case
                  </Button>


                  <CasesTable dataCollection={this.state.dataCollection} />

                  <Button 
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.downloadAllJson}>
                      Download all JSON
                  </Button>

                    <Modal
                        show={this.state.showNewCaseModal}
                        container={this}
                        aria-labelledby="contained-modal-title">
                      <Modal.Header 
                        closeButton
                        onClick={this.handleCloseNewCaseModal}>
                          <Modal.Title id="contained-modal-title">
                          Add New Case
                          </Modal.Title>
                      </Modal.Header>
                        <Modal.Body>
                          <NewCaseForm hs={this.handleSubmitNewCase} hic={this.handleInputChange} />
                        </Modal.Body>
                      <Modal.Footer>
                      </Modal.Footer>
                    </Modal>

                    <Modal
                        show={this.state.showEditCaseModal}
                        container={this}
                        aria-labelledby="contained-modal-title">
                      <Modal.Header 
                        closeButton
                        onClick={this.handleCloseEditCaseModal}>
                          <Modal.Title id="contained-modal-title">
                          Edit Case
                          </Modal.Title>
                      </Modal.Header>
                        <Modal.Body>
                          <EditCaseForm hs={this.handleSubmitUpdate} hic={this.handleUpdateChange} cte={this.state.caseToEdit} />
                        </Modal.Body>
                      <Modal.Footer>
                      </Modal.Footer>
                    </Modal>

                    <Modal
                        show={this.state.showRemoveCaseModal}
                        container={this}
                        aria-labelledby="contained-modal-title">
                      <Modal.Header 
                        closeButton
                        onClick={this.handleCloseRemoveCaseModal}>
                          <Modal.Title id="contained-modal-title">
                          Confirm delete?
                          </Modal.Title>
                      </Modal.Header>
                        <Modal.Body>
                          <RemoveCaseForm hs={this.handleSubmitDelete} ctd={this.state.caseToRemove} />
                        </Modal.Body>
                      <Modal.Footer>
                      </Modal.Footer>
                    </Modal>
                </div>
        </div>
    )
  }
}

export default ManageCases;
