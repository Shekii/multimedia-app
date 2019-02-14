import React, { Component } from 'react';
import {  Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <div>
          <div className="container">
            <Jumbotron>
              <h1>Tovi</h1> 
              <p>
                  Welcome to the new Multimedia Sharing Web Application, Tovi, from TMS.
              </p>
              <p>
              <p>Current locations supported: Oslo, Malmö and Leeds.</p>
                <Button bsStyle="primary" href="/upload">Manage Files</Button>
              </p>
            </Jumbotron>
          </div>
        </div>
    )
  }
}

export default Home;
