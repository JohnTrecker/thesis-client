import React from 'react';
import { Row, Input } from 'react-materialize';

const Search = ({ get, getAuthors, view }) => (
  <Row>
    <Input label="Search" s={9} onChange={e => {
      if (view === 'posts') {
        get(e.target.value)
      } else if (view === 'authors') {
        getAuthors(e.target.value);
      }
    }} />
  </Row>
);

Search.propTypes = {
  get: React.PropTypes.func.isRequired,
  getAuthors: React.PropTypes.func.isRequired, 
  view: React.PropTypes.string.isRequired };

export default Search;
