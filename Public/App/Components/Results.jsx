import React from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';

const Results = () => (
  <Collection>
    <CollectionItem>
      <Row>
        <Col className="left-align" s={6}>Title: Blog Post</Col>
        <Col className="right-align" s={6}>Ranking: 1</Col>
      </Row>
      <Row>
        <Col className="left-align">Description: Technical Blog Post</Col>
      </Row>
      <Row>
        <Col className="left-align" s={6}>Author: Mike Smith</Col>
        <Col className="right-align" s={6}>Date: Today</Col>
      </Row>
      <Row>
        <Col className="left-align">Tags: Tag1 Tag2 Tag3</Col>
      </Row>
    </CollectionItem>
  </Collection>
);

export default Results;
