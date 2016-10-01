import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Search from './Search';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col s={4}>
          <Search />
        </Col>
        <Col s={4}>
          <Results className="left-align" />
        </Col>
        <Col s={4}>
          <p>Right</p>
        </Col>
      </Row>
    );
  }
}

export default App;

