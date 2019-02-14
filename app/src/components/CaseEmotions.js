import React from 'react';

import { Table } from 'react-bootstrap';

//import '../css/main.css';

const CasesEmotions = (props) => {
    let data = props.emotions;

    return (
        <div>
        <div className="container">
            <div className="table-responsive">
                <Table className="table">
                <thead>
                    <tr>
                        <th>Disgust</th>
                        <th>Joy</th>
                        <th>Anger</th>
                        <th>Fear</th>
                        <th>Sadness</th>

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

export default CasesEmotions

