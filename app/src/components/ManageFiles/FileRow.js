import React from 'react';
import {Button, Glyphicon } from 'react-bootstrap'
import moment from 'moment';


const FileRow = (props) => {


	let viewURL = "/file/" + props.id;

	let dateCreated = new Date(props.dateCreated);
	dateCreated = dateCreated.toLocaleDateString();


    return (
        <tr id="fileRow"> 
            <td>
                <div>{props.title}</div>
            </td>
            <td>
                <div>{props.type}</div>
            </td>
            <td>
                <div>{props.author}</div>
            </td>
            <td>
                <div>{props.size}</div>
            </td>
            <td>
                <div>
					{dateCreated}
				</div>
            </td>
            <td>
                <div>
                    {props.modifiedBy}
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

export default FileRow
