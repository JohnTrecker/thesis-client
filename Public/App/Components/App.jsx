import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import * as _ from 'underscore';
import Search from './Search';
import Results from './Results';
import Entry from './Entry';

const posts = [
  { postId: 1, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 2, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 3, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 4, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 5, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 6, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 7, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 8, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 9, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 10, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 11, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { postId: 12, title: "Blog Post", description: "Technical Blog Post", author: "Mike Smith", rank: 1, publishData: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] }];

const links = [
  { postId: 1, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { postId: 2, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { postId: 3, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { postId: 4, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { postId: 5, url: "www.example.com", title: "Example Domain", author: "ICANN" }];

const entry = { title: "Blog Post", rank: 1, desc: "Technical Blog Post blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah" };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      entry: {},
      links: [],
      posts: [] };

    this.getTags = _.debounce(this.getTags.bind(this), 500);
  }

  getPosts(tags, cb) {
    const q = JSON.stringify(tags);

    $.ajax({
      url: `http://ec2-54-218-115-180.us-west-2.compute.amazonaws.com/api/posts?tags=${q}`,
      method: 'GET',
      success: data => cb(null, data),
      error: error => cb(error, null) });
  }

  getLinks(id, cb) {
    const q = JSON.stringify(id);

    $.ajax({
      url: `http://ec2-54-218-115-180.us-west-2.compute.amazonaws.com/api/posts/${q}`,
      method: 'GET',
      success: data => cb(null, data),
      error: error => cb(error, null) });
  }

  get(str) {
    this.setState({
      tags: str.split(' ').filter(word => word.length > 0) });

    this.getPosts(this.state.tags, (errorPosts, blogPosts) => {
      if (errorPosts) {
        throw errorPosts;
      } else {
        this.setState({
          posts: blogPosts,
          entry: {
            title: blogPosts[0].title,
            rank: blogPosts[0].rank,
            description: blogPosts[0].description } });

        if (blogPosts[0].inLinks.length > 0) {
          this.getLinks(blogPosts[0].postId, (errorLinks, blogLinks) => {
            if (errorLinks) {
              throw errorLinks;
            } else {
              this.setState({
                links: blogLinks });
            }
          });
        } else {
          this.setState({
            links: [] });
        }
      }
    });
  }

  render() {
    return (
      <Row>
        <Col s={4}>
          <Search query={this.get} />
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

