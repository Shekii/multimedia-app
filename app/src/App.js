/* Import statements */
import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import {Router, browserHistory} from 'react-router';

import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import Home from './components/Home/Home';

import HeaderLoggedIn from './components/static/Headers/HeaderLoggedIn';
import HeaderUnauth from './components/static/Headers/HeaderUnauth';

import Profile from './components/Profile/ProfilePage';

import { Breadcrumb, Navbar, Nav,NavItem} from 'react-bootstrap';
import { LinkContainer, NavLink } from 'react-router-bootstrap';

import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import * as constants from './components/static/constants.js';

import axios from 'axios';


/* App component */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      user: [],
      isLoggedIn: false
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    if (localStorage.getItem('jwtToken'))
      this.setState({isLoggedIn: true});

    if (localStorage.getItem('user')) {
        let userObj = JSON.parse(localStorage.getItem('user'));
        this.setState({user: userObj});
    }

    axios.get(constants.API+ 'account/')
      .then(res => {
        //console.log(res);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  render() {
    return (
      <div>

        {localStorage.getItem('jwtToken') &&
          <HeaderLoggedIn user={this.state.user}/>
        }
        {!localStorage.getItem('jwtToken') &&
          <HeaderUnauth/>
        }
         <div className="container">
            <Breadcrumb>
              <BreadcrumbsItem to=''>    
                Tovi
              </BreadcrumbsItem>
              <Breadcrumbs
                separator={<b> / </b>}
                item={NavLink}
                finalItem={'b'}
                finalProps={{
                  style: {color: 'black'}
                }}
            />
            </Breadcrumb>
         </div>

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component = {RegisterPage}/>
            <Route path="/profile"
                   render={(props) => <Profile user={this.state.user} />}/>
            {/* <Route path="/case/:id" exact component={Case}/> */}
            <Route component={Home}/>
          </Switch>

        <footer className="footer">
          <div className="container">
            <span className="text-muted">&copy; Harry Walker 2019</span>
          </div>
        </footer>

      </div>
    )
  }
}
export default App;

