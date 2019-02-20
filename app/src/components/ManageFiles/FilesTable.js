import React from 'react';

import { Table } from 'react-bootstrap';

const FilesTable = (props) => {
    //let dataCases = props.cases; 
   let dataCollection = props.dataCollection;

    return (
        <div>
        <div className="container">
            <h1>Manage Files</h1>

            <div className="table-responsive">
                <Table className="table">
                <thead>
                    <tr>
                        <th id="">Title</th>
                        <th id="">Type</th>
                        <th id="">Author</th>
                        <th id="">Size <small>(kb)</small></th>
                        <th id="">Created</th>
                        <th id="">Last Editor</th>
                        <th id=""></th>
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

