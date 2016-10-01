import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Search from './Search';
import Results from './Results';
import Entry from './Entry';

const posts = [
  { id: 1, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 2, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 3, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 4, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 5, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 6, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 7, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 8, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 9, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 10, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 11, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] },
  { id: 12, title: "Blog Post", desc: "Technical Blog Post", author: "Mike Smith", rank: 1, date: "Today", tags: ["Tag1 ", "Tag2 ", "Tag3 "] }];

const links = [
  { id: 1, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { id: 2, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { id: 3, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { id: 4, url: "www.example.com", title: "Example Domain", author: "ICANN" },
  { id: 5, url: "www.example.com", title: "Example Domain", author: "ICANN" }];

const entry = { title: "Blog Post", rank: 1, desc: "Technical Blog Post blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah" };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col s={4}>
          <Search />
        </Col>
        <Col s={4}>
          <Results className="left-align" posts={posts} />
        </Col>
        <Col s={4}>
          <Entry entry={entry} links={links} />
        </Col>
      </Row>
    );
  }
}

export default App;

