import React from 'react';

import { Table } from 'react-bootstrap';

import '../css/main.css';

const CasesTable = (props) => {
    //let dataCases = props.cases; 
    let dataCollection = props.dataCollection;

    return (
        <div>
        <div className="container">
            <h1>Manage Cases <small>Using Watson Discovery</small></h1>

            <div className="table-responsive" id="tblManageCases">
                <Table className="table">
                <thead>
                    <tr>
                        <th id="caseName">Name</th>
                        <th id="caseDate">Date</th>
                        <th id="caseText">Text</th>
                        <th id="caseEdit"></th>
                        <th id="caseDelete"></th>
                        <th id="caseView"></th>
                    </tr>
                </thead>
                <tbody>
                    {dataCollection}
                </tbody>
            </Table>
        </div>
        </div>
    </div>
    );
}

export default CasesTable

