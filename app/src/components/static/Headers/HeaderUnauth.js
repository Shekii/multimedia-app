import React, { Component } from 'react';
import { Navbar, Nav,NavItem } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import '../../../css/main.css';



class HeaderUnauth extends Component {
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
                                    <LinkContainer to="/login">
                                        <NavItem eventKey={2}>
                                            Login
                                        </NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <NavItem eventKey={2}>
                                            Register
                                        </NavItem>
                                    </LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                </div>
        );
    }
}

export default HeaderUnauth;