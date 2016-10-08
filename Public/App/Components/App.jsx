import React, { Component } from 'react';
import { Row, Col, Card, Button, Navbar, NavItem } from 'react-materialize';
import * as _ from 'underscore';
import Search from './Search';
import Results from './Results';
import Entry from './Entry';
import { Scrollbars } from 'react-custom-scrollbars';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: null,
      entry: null,
      links: [],
      posts: [],
      view: 'posts',
      page: 1,
      query: '',
      authors: [] };

    this.get = _.debounce(this.get.bind(this), 500);
    this.getAuthors = _.debounce(this.getAuthors.bind(this), 500);
  }

  getPosts(tags, cb) {
    const q = JSON.stringify(tags);

    $.ajax({
      url: `/api/posts?tags=${q}`,
      page: this.state.page,
      method: 'GET',
      success: data => cb(null, data),
      error: error => cb(error, null) });
  }

  getLinks(id, cb) {
    //const q = JSON.stringify(id);

    $.ajax({
      url: `/api/posts/${id}`,
      method: 'GET',
      success: data => cb(null, data),
      error: error => cb(error, null) });
  }

  getAuthors(str, cb) {
    const tags = str.split(' ').filter(word => word.length > 0);
    const onResult = (err, authors) => {
      if (err) {
        throw err;
      } else {
        this.setState({
          authors: authors,
          query: str
        }, () => {
          console.log(this.state.authors);
        });       
      }
    };

    if (tags.length > 0) {
      const q = JSON.stringify(tags);
      $.ajax({
        url: `/api/authors?tags=${q}`,
        method: 'GET',
        page: this.state.page,
        success: data => onResult(null, data),
        error: error => onResult(error, null)
      });
    }
  }

  get(str, cb) {
    const tags = str.split(' ').filter(word => word.length > 0);
    if (tags.length > 0) {
      this.getPosts(tags, (errorPosts, blogPosts) => {
        if (errorPosts) {
          throw errorPosts;
        }
        if (blogPosts.length === 0) {
          if (this.state.page === 0) {
            this.setState({
              tags: null,
              posts: [],
              entry: null,
              links: [],
              query: str 
            });
          }
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
                url: blogPosts[0].url
              },
              links: blogLinks,
              query: str
            });
          });
        }
      });
    }
  }

  resultsClickHandler(index) {
    this.getLinks(this.state.posts[index].postId, (err, blogLinks) => {
      this.setState({
        entry: {
          title: this.state.posts[index].title,
          rank: this.state.posts[index].rank,
          description: this.state.posts[index].description,
          url: this.state.posts[index].url
        },
        links: blogLinks
      });
    });
  }

  pageHandler(str, page) {
    this.setState({
      page: page
    }, () => this.get(str));
  };

  postsViewClickHandler() {
    if (this.state.view === 'authors') {
      this.setState({
        view: 'posts'
      }, () => {
        this.get(this.state.query);
      });
      $('.postselect').addClass('active');
      $('.authorselect').removeClass('active');
    }
  }

  authorsViewClickHandler() {
    if (this.state.view === 'posts') {
      this.setState({
        view: 'authors'
      }, () => {
        this.getAuthors(this.state.query);
      });
      $('.authorselect').addClass('active');
      $('.postselect').removeClass('active');
    }
  }

  componentDidMount() {
    this.get('javascript');
  }

  componentDidUpdate() {
    $('.collapsible').collapsible({
      accordion : true
    });
  }

  render() {
    return (
    <div>
      <Row>
        <Navbar>
          <Col className="logo center-align" s={4}>
            <h4>BLOGRANK</h4>
          </Col>
          <Col className="center-align" s={4}>
            <h4>Results</h4>
          </Col>
          <Col className="center-align" s={4}>
            <h4>Details</h4>
          </Col>
        </Navbar>
      </Row>
      <Row>
        <Col s={4}>
          <Search view={this.state.view} getAuthors={this.getAuthors.bind(this)} get={this.get.bind(this)}/>
          <Navbar>
            <NavItem className="active postselect" onClick={this.postsViewClickHandler.bind(this)}>View Posts</NavItem>
            <NavItem className="authorselect" onClick={this.authorsViewClickHandler.bind(this)}>View Authors</NavItem>
          </Navbar>
        </Col>
        <Col className="results" s={4}>
          <Scrollbars style={{ height: $(window).height() }}>
            <Results page={this.state.page} view={this.state.view} className="left-align" resultsClickHandler={this.resultsClickHandler.bind(this)} authors={this.state.authors} posts={this.state.posts} />
          </Scrollbars>
          <ul className="pagination">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            <li className="active"><a onClick={this.pageHandler}>1</a></li>
            <li className="waves-effect"><a href="#!">2</a></li>
            <li className="waves-effect"><a href="#!">3</a></li>
            <li className="waves-effect"><a href="#!">4</a></li>
            <li className="waves-effect"><a href="#!">5</a></li>
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        </Col>

        <Col s={4}>
          <Entry entry={this.state.entry} links={this.state.links} />
        </Col>
      </Row>
      </div>
    );
  }
}

export default App;

