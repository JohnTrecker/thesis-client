import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';
import Link from './Link';
import Post from './Post';

const Author = ({name, posts, resultsClickHandler, authIndex, authorNameClickHandler}) => (
  <ul className="collapsible" data-collapsible="accordion">
    <li>
      <div onClick={() => authorNameClickHandler(authIndex)} className="collapsible-header">{name}</div>
      <div className="collapsible-body">{posts.slice(0, 10).map((post, i) => <Post authIndex={authIndex} title={post.title} url={post.url} desc={post.description} rank={post.rank} index={i} resultsClickHandler={resultsClickHandler}/>)}</div>
    </li>
  </ul>
);

Author.propTypes = {
  name: React.PropTypes.string,
  posts: React.PropTypes.array
};

export default Author;