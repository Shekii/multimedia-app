import React from 'react';

import { Table } from 'react-bootstrap';

//import '../css/main.css';

const CaseCategories = (props) => {
    let data = props.categories;

    return (
        <div>
        <div className="container">
            <div className="table-responsive">
                <Table className="table">
                <thead>
                    <tr>
                        <th id="Concept">Category Found</th>
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

export default CaseCategories

