import React from 'react';

import { Table } from 'react-bootstrap';

const VersionHistoryTable = (props) => {
    //let dataCases = props.cases; 
   //let dataCollection = props.dataCollection;

   let versionHistorySet = props.dataCollection;

    return (
        <div>
        <div className="container">
            <h3>Version History</h3>

            <div className="table-responsive">
                <Table className="table">
                <thead>
                    <tr>
                        <th id="">Title</th>
                        <th id="">Type</th>
                        <th id="">Size <small>(kb)</small></th>
                        <th id="">Last Edited</th>
                        <th id="">Last Editer</th>
                    </tr>
                </thead>
                <tbody>
                    {versionHistorySet}
                </tbody>
            </Table>
        </div>
        </div>
    </div>
    );
}

export default VersionHistoryTable

