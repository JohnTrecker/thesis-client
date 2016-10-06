import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import * as _ from 'underscore';
import Search from './Search';
import Results from './Results';
import Entry from './Entry';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: null,
      entry: {},
      links: [],
      posts: [] };

    this.get = _.debounce(this.get.bind(this), 500);
  }

  getPosts(tags, cb) {
    const q = JSON.stringify(tags);

    $.ajax({
      url: `/api/posts?tags=${q}`,
      method: 'GET',
      success: data => cb(null, data),
      error: error => cb(error, null) });
  }

  getLinks(id, cb) {
    const q = JSON.stringify(id);

    $.ajax({
      url: `/api/posts/${q}`,
      method: 'GET',
      success: data => cb(null, data),
      error: error => cb(error, null) });
  }

  get(str, cb) {
    const tags = str.split(' ').filter(word => word.length > 0);
    if (tags.length > 0) {
      this.getPosts(tags, (errorPosts, blogPosts) => {
        if (errorPosts) {
          throw errorPosts;
        }
        if (!blogPosts[0]) {
          this.setState({
            tags: null,
            posts: [],
            entry: null,
            links: [] 
          }, () => {
            this.forceUpdate();
          });
        } else {
          this.getLinks(blogPosts[0].postId, (errorLinks, blogLinks) => {
            if (errorLinks) {
              throw errorLinks;
            }

            this.setState({
              tags: tags,
              posts: blogPosts,
              entry: {
                title: blogPosts[0].title,
                rank: blogPosts[0].rank,
                description: blogPosts[0].description,
                url: blogPosts[0].url },
              links: blogLinks 
            }, () => this.forceUpdate());

          });
        }
      });
    }
  }


  componentDidMount() {
    this.get('javascript');
  }

  render() {
    return (
      <Row>
        <Col s={4}>
          <Search query={this.get}/>
        </Col>
        <Col s={4}>
          <Results className="left-align" posts={this.state.posts} />
        </Col>
        <Col s={4}>
          <Entry entry={this.state.entry} links={this.state.links} />
        </Col>
      </Row>
    );
  }
}

export default App;

