import React, { Component } from 'react';
import { 
     Button, 
     FormGroup,
     Form,
     Grid,
     Row,
     Col,
    ControlLabel,
    FormControl } from 'react-bootstrap';


class EditCaseForm extends Component { 
    constructor(props) {
        super(props);
        this.handleSubmitUpdate = props.hs;
        this.handleSubmitDelete = props.hs;
        this.handleInputChange = props.hic;
    }

    render() {
        const { formIsValid } = true;
        
        return (
            <div>
            <Form 
                horizontal
                noValidate
                className={ formIsValid ? '' : 'formHasErrors' }>
                <input 
                    type="hidden"
                    name="id"
                    id="id"
                    value={this.props.cte.id}
            />
                <FormGroup 
                    noValidate controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>Case Name</Col>
                    <Col sm={10}>
                        <FormControl 
                            required type="text" 
                            value={this.props.cte.caseName} 
                            name="caseName" 
                            placeholder="Case Name"
                            onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalDate">
                    <Col componentClass={ControlLabel} sm={2}>Case Date</Col>
                    <Col sm={10}>
                        <FormControl 
                            required type="date" 
                            value={this.props.cte.caseDate} 
                            name="caseDate" 
                            placeholder="Case Date" 
                            onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalText">
                    <Col componentClass={ControlLabel} sm={2}>Case Text</Col>
                    <Col sm={10}>
                        <FormControl  
                            required type="text" 
                            value={this.props.cte.text} 
                            name="text" 
                            placeholder="Case Text" 
                            onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup> 
                
            <Grid>
                <Row className="show-grid">
                        <Button 
                            type="submit" 
                            onClick={this.handleSubmitUpdate}
                            bsStyle="success" bsSize="large">
                            Save
                        </Button>
                </Row>
            </Grid>
            </Form>
            </div>
        );
    }

}

export default EditCaseForm