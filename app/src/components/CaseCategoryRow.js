import React from 'react';
//import {Button, Glyphicon } from 'react-bootstrap'


const CaseCatergoryRow = (props) => {
    let data = {
        label:props.label,
        score:props.score
    }

    return (
        <tr id="caseRow"> 
            <td>
                <div>{data.label}</div>
            </td>
            <td>
                <div>{data.score}%</div>
            </td>
        </tr>
    );
}

export default CaseCatergoryRow
