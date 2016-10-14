//Graph component

import React from 'react';
import { Col, Row, Chip } from 'react-materialize';

const Graph = ({ data }) => (
  <Row>
    <Col s={12}>
      We're rendering this correctly mayne

      
    </Col>
  </Row>
);

Graph.propTypes = {
  stats: React.PropTypes.array
};

export default Graph;