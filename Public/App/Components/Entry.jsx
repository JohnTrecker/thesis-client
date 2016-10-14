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

  // componentWillReceiveProps(props) {
  //   this.setState({
  //     entry: this.props.entry,
  //     links: this.props.links });
  // }

  render() {
    if (this.props.links.length === 0) {
      var count = 0;
    } else {
      var count = null;
    }
    var linksHeader = <Row><Col className="title center-align" s={10}>Cited By: {count}</Col></Row>;
    if (this.props.entry) {
      var entry = 
        <div>
          <CollectionItem>
            <Row>
              <Col className="title link left-align" s={12}>{<a href={this.props.entry.url} target="_blank">{this.props.entry.title}</a>}</Col>
            </Row>
            <Row>
              <Col className="link left-align" s={12}>{<a href={this.props.entry.url} target="_blank">{this.props.entry.url}</a>}</Col>
            </Row>
            <Row>
              <Col className="left-align" s={10}>
                <p><b>Description</b>: {this.props.entry.description}</p>
              </Col>
            </Row>
          </CollectionItem>
          <CollectionItem>
            <div>{linksHeader}</div>
            {this.props.links
              .map((link, i) =>
                <Link link={link.url} title={link.title} author={link.author} />)
            }
          </CollectionItem>
        </div>;
    } else {
      var entry = null;
    }
    if (this.props.authorEntry && this.props.view === 'authors') {
      var authorEntry = 
        <CollectionItem>
          <Row>
            <Col className="title center-align" s={12}>{this.props.authorEntry.name}</Col>
          </Row>
          <Row>
            <Col className="left-align" s={6}>hIndex: {this.props.authorEntry.hIndex}</Col>
            <Col className="right-align" s={6}>Relevant Blog Posts: {this.props.authorEntry.totalPosts}</Col>
          </Row>
        </CollectionItem>;
    } else {
      var authorEntry = null;
    }
    if (linksHeader || entry || authorEntry) {
      return (
        <Row>
          <Collection>
            <div>{authorEntry}</div>
            <div>{entry}</div>
          </Collection>
        </Row>
      );
    } else {
      return null;
    }
  }
}

Entry.propTypes = {
  entry: React.PropTypes.object,
  links: React.PropTypes.array };

export default Entry;
