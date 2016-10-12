import React from 'react';
import { Col, Row, Input } from 'react-materialize';

const Search = ({ get, getAuthors, view, resetCurrPages, resetActivePage }) => (
  <Row>
    <Col offset="s1" s={12}>
      <Input label="Search" s={9} onChange={e => {
        e.persist();
        resetCurrPages(() => {
          if (view === 'posts') {
            get(e.target.value, () => {
              resetActivePage();
            });
          } else if (view === 'authors') {
            getAuthors(e.target.value, () => {
              resetActivePage();
            });
          }
        });
      }} />
    </Col>
  </Row>
);

Search.propTypes = {
  get: React.PropTypes.func.isRequired,
  getAuthors: React.PropTypes.func.isRequired, 
  view: React.PropTypes.string.isRequired };

export default Search;
