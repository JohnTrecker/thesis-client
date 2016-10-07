import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';

const Link = ({ link, title, author }) => (
  <CollectionItem>
    <Row>
      <Col>Cited By: {<a href={link}>{title}</a>}</Col>
    </Row>
    <Row>
      <Col>{ <a href={link}>{link}</a> }</Col>
    </Row>
    <Row>
      <Col>Author: { author }</Col>
    </Row>
  </CollectionItem>
);

Link.propTypes = {
  link: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired };

export default Link;

