import React from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import Link from './Link';

const author = "ICANN";
const title = "Example Domain";
const link = "www.example.com";

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
      <Link link={link} title={title} author={author} />
    </Collection>
  </Row>
);

export default Entry;
