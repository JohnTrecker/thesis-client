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
    if (this.props.links.length > 0) {
      var linksHeader = <Row><Col className="title center-align" s={10}>Cited By:</Col></Row>;
    } else {
      var linksHeader = null;
    }
    return (
      <Row>
        <Collection>
          <CollectionItem>
            <Row>
              <Col className="title left-align" s={12}>{<a href={this.props.entry.url}>{this.props.entry.title}</a>}</Col>
            </Row>
            <Row>
              <Col className="left-align" s={12}>{<a href={this.props.entry.url}>{this.props.entry.url}</a>}</Col>
            </Row>
            <Row>
              <Col className="left-align" s={10}>
                <p>Description: {this.props.entry.description}</p>
              </Col>
            </Row>
          </CollectionItem>
          <CollectionItem>
            <div>{linksHeader}</div>
            {this.props.links
              .map((link, i) =>
                <Link link={link.url} title={link.title} author={link.author} key={i} />)
            }
          </CollectionItem>
        </Collection>
      </Row>
    );
  }
}

Entry.propTypes = {
  entry: React.PropTypes.object,
  links: React.PropTypes.array };

export default Entry;
