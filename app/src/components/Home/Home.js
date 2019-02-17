import React, { Component } from 'react';
import {  Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <div>
          <Jumbotron>
              <div className="container">
                <h1>Tovi</h1> 
                <p>
                    Welcome to the new Multimedia Sharing Web Application, Tovi, from TMS.
                </p>
                <p>Current locations supported: Oslo, Malmö and Leeds.</p>
                  <Button bsStyle="primary" href="/upload">Manage Files</Button>
              </div>
          </Jumbotron>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>About</h2>
                <p>Tove and Morten Skjeggestad run an advertising agency, TMS, based in Oslo, Norway. TMS has two
types of work: they are a design and development agency.
                </p>
              </div>
              <div className="col-md-4">
                <h2>International</h2>
                <p>Alongside their original Norwegian operation TMS has offices in Malmö, Sweden, and Leeds. Over
the next four years the company plans to expand its operations.
 </p>
              </div>
              <div className="col-md-4">
                <h2>Technologies</h2>
                <p>Supporting Wordpress sites;
and they create advertising campaigns that are deployed on social media platforms - mainly Pinterest,
Instagram and Twitter.</p>
              </div>
            </div>
        </div>
      </div>

    )
  }
}

export default Home;
