/* Import statements */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import Home from './components/Home/Home';
import Header from './components/static/Header';

import { Breadcrumb} from 'react-bootstrap';
import { NavLink} from 'react-router-bootstrap';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'


/* App component */
class App extends Component {
  render() {
    return (
      <div>

         <Header></Header>
          
         {/*<Breadcrumbs></Breadcrumbs>*/}
         <div className="container">
          <Breadcrumb>
          <BreadcrumbsItem to='/'>    
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
            {/* <Route path="/upload" exact component={UploadCase}/> */}
            {/* <Route path="/case/:id" exact component={Case}/> */}
            <Route component={Home}/>
          </Switch>

      </div>
    )
  }
}
export default App;

