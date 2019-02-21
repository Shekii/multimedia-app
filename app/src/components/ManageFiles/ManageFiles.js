import React, {Component} from 'react';
import * as constants from '../static/constants.js';
import axios from 'axios';

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
            if (result.data.files) {
                result.data.files.forEach(it => {
                    if (it.fileVersions.length > 0) {
                        //if newer revisions of file available

                        //newest version of the file
                        let lastIndex = it.fileVersions.length - 1;
                        tempFiles.push(<FileCollection 
                            key={it._id}
                            id={it._id}
                            title={it.fileVersions[lastIndex].title}
                            type={it.fileVersions[lastIndex].type}
                            size={it.fileVersions[lastIndex].size}
                            description={it.fileVersions[lastIndex].description}
                            modifiedBy ={it.fileVersions[lastIndex].modifiedBy}
                            dateModified={it.fileVersions[lastIndex].dateModified}
                            author={it.createdBy}
                            dateCreated={it.dateCreated}
                        />);
                    } else {
                        tempFiles.push(<FileCollection 
                            key={it._id}
                            id={it._id}
                            title={it.title}
                            type={it.type}
                            size={it.size}
                            description={it.description}
                            author={it.createdBy}
                            dateCreated={it.dateCreated}
                        />);
                    }
                });
            }

            this.setState({files: tempFiles});
            
            console.log(result.data.files);
        });
    }

  render() {
    return (
      <div>
         <BreadcrumbsItem to='/manage'>Manage Files</BreadcrumbsItem>

         <div className="container-fluid">
            <FilesTable dataCollection={this.state.files}/>
         </div>
      </div>
    );
  }

}
export default ManageFiles;
