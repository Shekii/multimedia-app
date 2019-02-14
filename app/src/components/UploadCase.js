import React, {Component} from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

class UploadCase extends Component {
  render() {
    return (
        <div>
          <div className="container">
            <BreadcrumbsItem active to='#'>Upload Case</BreadcrumbsItem>
            <h1>Upload A New Case</h1>
          </div>
        </div>
    )
  }
}

export default UploadCase;
