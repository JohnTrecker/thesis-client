import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';

const Author = ({name, posts}) => (
  <div>{name}</div>
);

Author.propTypes = {
  name: React.PropTypes.string,
  posts: React.PropTypes.array
};

export default Author;