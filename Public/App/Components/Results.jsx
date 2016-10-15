import React, { Component } from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';
import Post from './Post';
import Author from './Author';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: this.props.posts,
      view: this.props.view };
  }

  // componentWillReceiveProps(props) {
  //   this.setState({
  //     posts: this.props.posts });
  // }

  render() {
    if (this.props.view === 'posts' && this.props.posts.length > 0) {
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
                index={i}
                resultsClickHandler={this.props.resultsClickHandler}
                key={i}
              />)
          }
        </Collection>
      );
    } else if (this.props.view === 'authors' && this.props.authors.length > 0) {
      return (
        <div className="noborder">
          {this.props.authors
            .map((author, i) =>
              <Author
                name={author.name}
                posts={author.posts}
                resultsClickHandler={this.props.resultsClickHandler}
                authorNameClickHandler={this.props.authorNameClickHandler}
                authIndex={i}
                key={i}
              />)
          }
        </div>
      );
    } else if (this.props.query !== '') {
      return (
        <div className="center-align">
          <p className="noresults">
            No results found, please try another search!
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

Results.propTypes = {
  posts: React.PropTypes.array,
  authors: React.PropTypes.array };

export default Results;

