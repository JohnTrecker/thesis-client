import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';

const Post = ({ title, desc, rank, author, date, tags }) => (
  <CollectionItem>
    <Row>
      <Col className="left-align" s={6}>Title: {title}</Col>
      <Col className="right-align" s={6}>Ranking: {rank}</Col>
    </Row>
    <Row>
      <Col className="left-align">Description: {desc}</Col>
    </Row>
    <Row>
      <Col className="left-align" s={6}>Author: {author}</Col>
      <Col className="right-align" s={6}>Date: {date}</Col>
    </Row>
    <Row>
      <Col className="left-align">Tags: {tags}</Col>
    </Row>
  </CollectionItem>
);

Post.propTypes = {
  title: React.PropTypes.string,
  desc: React.PropTypes.string,
  rank: React.PropTypes.number,
  author: React.PropTypes.string,
  date: React.PropTypes.string,
  tags: React.PropTypes.array };

export default Post;
