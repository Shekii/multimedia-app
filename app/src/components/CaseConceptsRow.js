import React from 'react';
//import {Button, Glyphicon } from 'react-bootstrap'


const CaseConceptsRow = (props) => {
    let concept = {
        title:props.title,
        relevance:props.relevance,
    }

    return (
        <tr id="caseRow"> 
            <td>
                <div>{concept.title}</div>
            </td>
            <td>
                <div>{concept.relevance}%</div>
            </td>
        </tr>
    );
}

export default CaseConceptsRow
