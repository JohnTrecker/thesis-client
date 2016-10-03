import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';

const Link = ({ link, title, author }) => (
  <CollectionItem>
    <Row>
      <Col>Incoming Link: { link }</Col>
    </Row>
    <Row>
      <Col>Title: { title }</Col>
      <Col>Author: { author }</Col>
    </Row>
  </CollectionItem>
);

Link.propTypes = {
  link: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired };

export default Link;

