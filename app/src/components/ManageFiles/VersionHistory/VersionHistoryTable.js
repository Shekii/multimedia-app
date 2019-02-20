import React from 'react';

import { Table } from 'react-bootstrap';

const VersionHistoryTable = (props) => {
    //let dataCases = props.cases; 
   //let dataCollection = props.dataCollection;

   let versionHistorySet = props.dataCollection;

    return (
        <div>
        <div className="container">
            <h3>Previous Versions</h3>

            <div className="table-responsive">
                <Table className="table">
                <thead>
                    <tr>
                        <th id="">Title</th>
                        <th id="">Type</th>
                        <th id="">Size <small>(kb)</small></th>
                        <th id="">Last Edited</th>
                        <th id="">Last Editor</th>
                    </tr>
                </thead>
                <tbody>
           
                </tbody>
            </Table>
        </div>
        </div>
    </div>
    );
}

export default VersionHistoryTable

