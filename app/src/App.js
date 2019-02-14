/* Import statements */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//import ManageCases from './comps/ManageCases';
//import UploadCase from './comps/UploadCase.js';
import Home from './components/Home/Home.js';
import Header from './components/static/Header';

//import Case from './comps/Case';

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
            Precedence Establisher
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
            {/* <Route path="/manage" exact component={ManageCases}/> */}
            {/* <Route path="/upload" exact component={UploadCase}/> */}
            {/* <Route path="/case/:id" exact component={Case}/> */}
            <Route component={Home}/>
          </Switch>

      </div>
    )
  }
}
export default App;

