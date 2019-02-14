import React from 'react';
//import {Button, Glyphicon } from 'react-bootstrap'


const CaseEmotionsRow = (props) => {
    let data = {
        disgust:props.disgust,
        joy:props.joy,
        anger:props.anger,
        fear:props.fear,
        sadness:props.sadness
    }

    return (
        <tr id="caseRow"> 
            <td>
                <div>{data.disgust}%</div>
            </td>
            <td>
                <div>{data.joy}%</div>
            </td>
            <td>
                <div>{data.anger}%</div>
            </td>
            <td>
                <div>{data.fear}%</div>
            </td>
            <td>
                <div>{data.sadness}%</div>
            </td>
        </tr>
    );
}

export default CaseEmotionsRow
