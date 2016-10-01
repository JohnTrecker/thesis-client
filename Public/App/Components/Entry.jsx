import React, { Component } from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import Link from './Link';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: this.props.entry,
      links: this.props.links };
  }

  render() {
    return (
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
          {this.state.links
            .map(link =>
              <Link link={link.url} title={link.title} author={link.author} key={link.id} />)
          }
        </Collection>
      </Row>
    );
  }
}

Entry.propTypes = {
  entry: React.PropTypes.object,
  links: React.PropTypes.array };

export default Entry;
