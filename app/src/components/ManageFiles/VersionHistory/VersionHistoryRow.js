import React from 'react';
import {Button, Glyphicon } from 'react-bootstrap'


const VersionHistoryRow = (props) => {


	let viewURL = "/file/" + props.id;

	// let dateCreated = new Date(props.dateCreated);
	// dateCreated = dateCreated.toLocaleDateString();


    return (
        <tr id="fileRow"> 
            <td>
                <div>{props.title}</div>
            </td>
            <td>
                <div>{props.type}</div>
            </td>
            <td>
                <div>{props.size}</div>
            </td>
            <td>
                <div>{props.lastEdited}</div>
            </td>
            <td>
                <div>
                    {props.lastEditer}
                </div>
            </td>
            <td>
                <div id="fileViewCell">
						<Button 
						bsStyle="warning" 
						bsSize="small"
						
						href={viewURL}
						>
							<Glyphicon glyph="zoom-in" />
						</Button>
                </div>
            </td>
        </tr>
    );
}

export default VersionHistoryRow
