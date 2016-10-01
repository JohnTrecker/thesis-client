import React from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';

const Entry = () => (
  <Row>
    <Collection>
      <CollectionItem>
        <Row>
          <Col className="left-align" s={6}>Title: Blog Post</Col>
          <Col className="right-align" s={6}>Ranking: 1</Col>
        </Row>
        <Row>
          <Col className="left-align" s={10}>
            <p>
              Description: Technical Blog Post blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah
            </p>
          </Col>
        </Row>
      </CollectionItem>
    </Collection>
    <Collection>
      <CollectionItem>
        <Row>
          <Col>Incoming Link: </Col>
        </Row>
        <Row>
          <Col>Title: </Col>
          <Col>Author: </Col>
        </Row>
      </CollectionItem>
      <CollectionItem>
        <Row>
          <Col>Incoming Link: </Col>
        </Row>
        <Row>
          <Col>Title: </Col>
          <Col>Author: </Col>
        </Row>
      </CollectionItem>
      <CollectionItem>
        <Row>
          <Col>Incoming Link: </Col>
        </Row>
        <Row>
          <Col>Title: </Col>
          <Col>Author: </Col>
        </Row>
      </CollectionItem>
    </Collection>
  </Row>
);

export default Entry;
