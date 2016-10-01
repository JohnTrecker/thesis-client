import React, { Component } from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import Post from './Post';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: this.prop.posts };
  }

  render() {
    return (
      <Collection>
        <Post title={"Blog Post"} rank={1} desc={"Technical Blog Post"} author={"Mike Smith"} date={"Today"} tags={["Tag1 ", "Tag2 ", "Tag3 "]} />
      </Collection>
    );
  }
}

Results.propTypes = {
  posts: React.PropTypes.array };

export default Results;
