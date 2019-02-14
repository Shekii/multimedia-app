import React, { Component } from 'react';
import { 
     Button, 
     FormGroup, Form, Col, ControlLabel, FormControl } from 'react-bootstrap';


class NewCaseForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = props.hs;
        this.handleInputChange = props.hic;
    }


    render() {
        const { formIsValid } = true;

        return (
            <Form 
                //onSubmit={this.handleSubmitNewAnimal}
                horizontal
                noValidate
                className={ formIsValid ? '' : 'formHasErrors' }>
                <FormGroup 
                    noValidate controlId="formHorizontalCaseName">
                    <Col componentClass={ControlLabel} sm={2}>Case Name</Col>
                    <Col sm={10}>
                        <FormControl 
                            required type="text" 
                            name="caseName" 
                            placeholder="Case Name"
                            onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalCaseDate">
                    <Col componentClass={ControlLabel} sm={2}>Case Date</Col>
                    <Col sm={10}>
                        <FormControl 
                            required type="date" 
                            name="caseDate" 
                            placeholder="Case Date" 
                            onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalCaseText">
                    <Col componentClass={ControlLabel} sm={2}>Case Text</Col>
                    <Col sm={10}>
                        <FormControl  
                            required type="text" 
                            name="text" 
                            placeholder="Case Text" 
                            onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                
                <Button 
                    type="submit" 
                    //onClick={this.handleSubmitNewAnimal}
                    onClick={this.handleSubmit}
                    bsStyle="success">
                    Add Case</Button>
            </Form>
            // <form 
            //     noValidate 
            //     className={ formIsValid ? '' : 'formHasErrors' }>

            //     <label htmlFor="nom">Pet's Name</label>
            //     <input
            //         name="nom"
            //         id="nom"
            //         type="text"                    
            //         onChange={this.handleInputChange} 
            //     />
            //     <label htmlFor="species">Species</label>
            //     <input
            //         name="species"
            //         id="species"
            //         type="text"
            //         onChange={this.handleInputChange} 
            //     />
            //     <label htmlFor="breed">Breed</label>
            //     <input
            //         name="breed"
            //         id="breed"
            //         type="text"
            //         onChange={this.handleInputChange} 
            //     />
            //     <label htmlFor="age">Pet's Age</label>
            //     <input
            //         name="age"
            //         id="age"
            //         type="text"
            //         onChange={this.handleInputChange} 
            //     />
            //     <label htmlFor="colour">Colour</label>
            //     <input
            //         name="colour"
            //         id="colour"
            //         type="text"
            //         onChange={this.handleInputChange} 
            //     />

            //     <button 
            //         onClick={this.handleSubmit}>
            //         Submit
            //     </button>
            // </form>
        );
    }

}

export default NewCaseForm