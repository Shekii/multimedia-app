import React, { Component } from 'react';
import { Navbar, Nav,NavItem } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import '../../../css/main.css';
import * as constants from '../constants.js';
import axios from 'axios';


class HeaderLoggedIn extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }
    logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        let username = this.props.user.username;
        axios.post(constants.API + 'account/logout', { username })
        .catch((error) => {
            console.log(error);
        });
        window.location.reload();
    }

    render() {
        return (
            <div className="container-fluid" id="header">
                        <Navbar inverse collapseOnSelect fixedTop>
                            <Navbar.Header>
                                <Navbar.Brand pullLeft>
                                    <a href="/">Tovi </a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav pullRight>
                                    <LinkContainer to="/manage">
                                        <NavItem eventKey={1}>
                                            Manage Files
                                        </NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/upload">
                                        <NavItem eventKey={2}>
                                            Upload File
                                        </NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/profile">
                                        <NavItem eventKey={2}>
                                           My Profile
                                        </NavItem>
                                    </LinkContainer>
                                    <NavItem onClick={this.logout} eventKey={4}>
                                        Logout
                                    </NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                </div>
        );
    }
}

export default HeaderLoggedIn;