import React, { Component } from 'react';
import {  Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <div>
          <div className="container">
            <Jumbotron>
              <h1>Law App</h1> 
              <p>
                Using IBM Watson's various services, this web application facilites
                the ability for the user to upload new legal cases and these will be used
                to establish predence based on similarities between the new case and old cases.
              </p>
              <p>
                <Button bsStyle="primary" href="/upload">Upload New Case</Button>
              </p>
            </Jumbotron>
          </div>
        </div>
    )
  }
}

export default Home;
