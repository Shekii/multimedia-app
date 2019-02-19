import React, {Component} from 'react';
import * as constants from '../static/constants.js';
import axios from 'axios';
import {  Modal, Button } from 'react-bootstrap';

import FilesTable from './FilesTable';
import FileCollection from './FileRow';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'


class ManageFiles extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            files:[],
        };

    }

    async componentDidMount() {
        const tempFiles =  [];

        await axios.get(constants.API + 'file')
        .then((result) => {
            result.data.forEach(it => {
                tempFiles.push(<FileCollection 
                    key={it._id}
                    id={it._id}
                />);
            });
            console.log(result.data);
        });
    }

  render() {
    return (
      <div>
         <BreadcrumbsItem to='/manage'>Manage Files</BreadcrumbsItem>

         <div className="container">
            <FilesTable/>
         </div>
      </div>
    );
  }

}
export default ManageFiles;
