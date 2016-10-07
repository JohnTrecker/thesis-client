import React, { Component } from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import Link from './Link';
import { Scrollbars } from 'react-custom-scrollbars';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: this.props.entry,
      links: this.props.links };
  }

  componentWillReceiveProps(props) {
    this.setState({
      entry: this.props.entry,
      links: this.props.links });
  }

  render() {
    if (!this.props.entry) {
      return null;
    }
    return (
      <Row>
        <Collection>
          <CollectionItem>
            <Row>
              <Col className="left-align" s={9}>Title: {<a href={this.props.entry.url}>{this.props.entry.title}</a>}</Col>
              <Col className="right-align" s={3}>Cited By {this.props.links.length || 0}</Col>
            </Row>
            <Row>
              <Col className="left-align" s={10}>
                <p>Description: {this.props.entry.description}</p>
              </Col>
            </Row>
          </CollectionItem>
        </Collection>
        <Collection>
          {this.props.links
            .map(link =>
              <Link link={link.url} title={link.title} author={link.author} key={link.postId} />)
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
