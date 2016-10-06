import React, { Component } from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import Post from './Post';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: this.props.posts,
      view: this.props.view };
  }

  componentWillReceiveProps(props) {
    this.setState({
      posts: this.props.posts });
  }

  render() {
    if (this.props.view === 'posts') {
      return (
        <Collection>
          {this.props.posts
            .map((post, i) =>
              <Post
                title={post.title}
                url={post.url}
                rank={post.inLinks.length}
                desc={post.description}
                author={post.author}
                date={post.publishDate}
                tags={post.oldTags}
                key={post.postId}
                index={i}
                resultsClickHandler={this.props.resultsClickHandler}
              />)
          }
        </Collection>
      );
    } else if (this.props.view === 'authors') {
      return null;
    }
  }
}

Results.propTypes = {
  posts: React.PropTypes.array };

export default Results;

