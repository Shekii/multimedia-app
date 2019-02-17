import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import * as constants from '../static/constants.js';

import { 
     Button, 
     FormGroup,
     Form,
     Col,
     ControlLabel,
     FormControl, Grid, Row, Alert, Card } from 'react-bootstrap';

class ProfilePage extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">

        <BreadcrumbsItem to='/profile'>My Profile - {this.props.user.username}</BreadcrumbsItem>

    </div>
    );
  }
}

export default ProfilePage;