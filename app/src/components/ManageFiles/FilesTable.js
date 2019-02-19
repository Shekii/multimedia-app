import React from 'react';

import { Table } from 'react-bootstrap';

const FilesTable = (props) => {
    //let dataCases = props.cases; 
   let dataCollection = props.dataCollection;

    return (
        <div>
        <div className="container">
            <h1>Manage Cases <small>Using Watson Discovery</small></h1>

            <div className="table-responsive">
                <Table className="table">
                <thead>
                    <tr>
                        <th id="">Title</th>
                        <th id="">Type</th>
                        <th id="">Size</th>
                        <th id="">Author</th>
                        <th id="">Created</th>
                        <th id="">Modified</th>
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

export default FilesTable

