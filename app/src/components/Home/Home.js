import React, { Component } from 'react';
import {  Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <div>
          <div className="container">
            <Jumbotron>
              <h1>TMS</h1> 
              <p>
                  Tove and Morten Skjeggestad
              </p>
              <p>
                <Button bsStyle="primary" href="/upload">Manage Files</Button>
              </p>
            </Jumbotron>
          </div>
        </div>
    )
  }
}

export default Home;
