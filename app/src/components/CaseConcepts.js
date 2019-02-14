import React from 'react';

import { Table } from 'react-bootstrap';

//import '../css/main.css';

const CasesConcepts = (props) => {
    let data = props.concepts;

    return (
        <div>
        <div className="container">
            <div className="table-responsive">
                <Table className="table">
                <thead>
                    <tr>
                        <th id="Concept">Concept Found</th>
                        <th id="Relevance">Relevance</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </Table>
        </div>
        </div>
    </div>
    );
}

export default CasesConcepts

