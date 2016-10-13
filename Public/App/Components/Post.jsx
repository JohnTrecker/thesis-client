import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';

const Post = ({ title, url, desc, rank, author, date, tags, index, resultsClickHandler, authIndex }) => {
  if (author) {
    var authRow = 
    <Row>
      <Col className="left-align" s={6}><b>Author</b> - {author}</Col>
    </Row>;
  } else {
    var authRow = null;
  }
  return (<CollectionItem className="post" onClick={() => resultsClickHandler(index, authIndex)}>
    <Row>
      <Col className="left-align" s={9}>{<a className="title link" 
                                            href={url}
                                            target="_blank">
                                            {title}</a>}</Col>
      <Col className="right-align" s={3}>Cited By {rank || 0}</Col>
    </Row>
    <Row>
      <Col className="left-align"><b>Description</b> - {desc}</Col>
    </Row>
    {authRow}
  </CollectionItem>
  );
};

Post.propTypes = {
  title: React.PropTypes.string,
  desc: React.PropTypes.string,
  url: React.PropTypes.string,
  rank: React.PropTypes.number,
  author: React.PropTypes.string,
  date: React.PropTypes.string,
  tags: React.PropTypes.array };

export default Post;
