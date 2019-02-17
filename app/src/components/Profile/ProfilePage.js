import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

// import { 
//      Button, 
//      FormGroup,
//      Form,
//      Col,
//      ControlLabel,
//      FormControl, Grid, Row, Alert, Card } from 'react-bootstrap';

class ProfilePage extends Component {

  render() {
    return (
      <div className="container">

        <BreadcrumbsItem to='/profile'>My Profile - {this.props.user.username}</BreadcrumbsItem>

    </div>
    );
  }
}

export default ProfilePage;