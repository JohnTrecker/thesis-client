import React, { Component } from 'react';
import { Row, Col, Card, Button, Navbar, NavItem, ProgressBar } from 'react-materialize';
import * as _ from 'underscore';
import Search from './Search';
import Results from './Results';
import Entry from './Entry';
import Pages from './Pages';
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
      authors: [],
      authorEntry: null,
      loading: true };

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
    const tags = str.split(' ').filter(word => word.length > 0).map(word => word.toLowerCase());
    const onResult = (err, authors) => {
      if (err) {
        throw err;
      } else {
        this.setState({
          tags: tags,
          authors: authors,
          query: str,
          authorEntry: authors.length === 0 ? null : 
          {
            name: authors[0].name,
            hIndex: authors[0].hIndex,
            totalPosts: authors[0].posts.length
          },
          loading: false
        }, () => {
          if (this.state.view === 'authors') {
            this.get(str, cb);
          }
        });       
      }
    };

    if (tags.length > 0) {
      if (this.state.view === 'authors') {
        this.setState({
          loading: true
        });
      }
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
    const tags = str.split(' ').filter(word => word.length > 0).map(word => word.toLowerCase());
    if (tags.length > 0) {
      if (this.state.view === 'posts') {
        this.setState({
          loading: true
        });
      }
      this.getPosts(tags, (errorPosts, blogPosts) => {
        if (errorPosts) {
          throw errorPosts;
        }
        if (blogPosts.length === 0) {
          this.setState({
            tags: null,
            posts: [],
            entry: null,
            links: [],
            query: str,
            loading: false 
          });
          this.getAuthors(str, cb);
        } else {
          this.getLinks(blogPosts[0].postId, (errorLinks, blogLinks) => {
            if (errorLinks) {
              throw errorLinks;
            }
            this.setState({
              tags: tags,
              posts: blogPosts,
              entry: this.state.view === 'posts' ? {
                title: blogPosts[0].title,
                rank: blogPosts[0].rank,
                description: blogPosts[0].description,
                url: blogPosts[0].url
              } : null,
              links: blogLinks,
              query: str,
              loading: false
            }, () => {
              if (this.state.view === 'posts') {
                this.getAuthors(str, cb);
              }
            });
          });
        }
      });
    }
  }

  resultsClickHandler(index, authIndex) {
    let post;
    if (authIndex != undefined && this.state.view === 'authors') {
      post = this.state.authors[authIndex].posts[index];
    } else if (this.state.view === 'posts') {
      post = this.state.posts[index];
    }
    this.getLinks(post.postId, (err, blogLinks) => {
      this.setState({
        entry: {
          title: post.title,
          rank: post.rank,
          description: post.description,
          url: post.url
        },
        links: blogLinks
      }, () => {
        // console.log(this.state.links);
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
        view: 'posts',
        entry: this.state.posts.length > 0 ? {
          title: this.state.posts[0].title,
          rank: this.state.posts[0].rank,
          description: this.state.posts[0].description,
          url: this.state.posts[0].url
        } : null
      }, () => {
        //this.get(this.state.query);
      });
      $('.postselect').addClass('active');
      $('.authorselect').removeClass('active');
    }
  }

  authorsViewClickHandler() {
    if (this.state.view === 'posts') {
      this.setState({
        view: 'authors',
        entry: null
      }, () => {
        //this.getAuthors(this.state.query);
      });
      $('.authorselect').addClass('active');
      $('.postselect').removeClass('active');
    }
  }

  authorNameClickHandler(authIndex) {
    this.setState({
      authorEntry: {
        name: this.state.authors[authIndex].name,
        hIndex: this.state.authors[authIndex].hIndex,
        totalPosts: this.state.authors[authIndex].posts.length
      },
      entry: null
    });
  }

  finishSearchMessage() {
    if (this.state.view === 'authors') {
      return `Author results for ${this.state.query}`;
    } else if (this.state.view ==='posts') {
      return `Post results for ${this.state.query}`
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
    var progress = this.state.loading ? <ProgressBar ></ProgressBar> : <div><p className="finish">{this.finishSearchMessage()}</p></div>;
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
          {progress}
          <Pages className="center-align"/>
        </Col>
        <Col className="results" s={4}>
          <Scrollbars style={{ height: $(window).height() }}>
            <Results authorNameClickHandler={this.authorNameClickHandler.bind(this)} page={this.state.page} view={this.state.view} className="left-align" resultsClickHandler={this.resultsClickHandler.bind(this)} authors={this.state.authors} posts={this.state.posts} />
          </Scrollbars>
        </Col>

        <Col s={4}>
          <Entry view={this.state.view} authorEntry={this.state.authorEntry} entry={this.state.entry} links={this.state.links} />
        </Col>
      </Row>
      </div>
    );
  }
}

export default App;

