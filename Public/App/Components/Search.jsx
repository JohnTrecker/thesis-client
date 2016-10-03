import React from 'react';
import { Row, Input } from 'react-materialize';

const Search = ({ query }) => (
  <Row>
    <Input label="Search" s={9} onChange={e => query(e.target.value)} />
  </Row>
);

Search.propTypes = {
  query: React.PropTypes.func.isRequired };

export default Search;
