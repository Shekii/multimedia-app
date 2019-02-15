/* Import statements */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import Home from './components/Home/Home';
import Header from './components/static/Header';
import Profile from './components/Profile/ProfilePage';

import { Breadcrumb} from 'react-bootstrap';
import { NavLink} from 'react-router-bootstrap';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import axios from 'axios';


/* App component */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      user: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    // axios.get('/api/book')
    //   .then(res => {
    //     this.setState({ books: res.data });
    //     console.log(this.state.books);
    //   })
    //   .catch((error) => {
    //     if(error.response.status === 401) {
    //       this.props.history.push("/login");
    //     }
    //   });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div>

         <Header></Header>
          
         {/*<Breadcrumbs></Breadcrumbs>*/}
         <div className="container">
            <h3 className="panel-title">
              {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
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
            <Route path="/profile" exact component = {Profile}/>
            {/* <Route path="/upload" exact component={UploadCase}/> */}
            {/* <Route path="/case/:id" exact component={Case}/> */}
            <Route component={Home}/>
          </Switch>

      </div>
    )
  }
}
export default App;

