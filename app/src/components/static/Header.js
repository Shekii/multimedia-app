import React, { Component } from 'react';
import { Navbar, Nav,NavItem } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import '../../css/main.css';



class Header extends Component {
    render() {
        return (
            <div className="container-fluid" id="header">
                        <Navbar inverse collapseOnSelect fixedTop>
                            <Navbar.Header>
                                <Navbar.Brand pullLeft>
                                    <a href="/">TMS </a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav pullRight>
                                    <LinkContainer to="/manage">
                                        <NavItem eventKey={1}>
                                            Manage Cases
                                        </NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/upload">
                                        <NavItem eventKey={2}>
                                            Upload Case
                                        </NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/upload">
                                        <NavItem eventKey={2}>
                                            Statistics
                                        </NavItem>
                                    </LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                </div>
        );
    }
}

export default Header;