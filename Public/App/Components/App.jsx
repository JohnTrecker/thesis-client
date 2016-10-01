import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Search from './Search';

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
          <p>Center</p>
        </Col>
        <Col s={4}>
          <p>Right</p>
        </Col>
      </Row>
    );
  }
}

export default App;

