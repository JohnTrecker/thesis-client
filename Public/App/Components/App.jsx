import React, { Component } from 'react';
import { Row, Col, Card, Button, Navbar, NavItem, ProgressBar, Collection, CollectionItem } from 'react-materialize';
import * as _ from 'underscore';
import Search from './Search';
import Results from './Results';
import Entry from './Entry';
import Pages from './Pages';
import About from './About';
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
      query: '',
      authors: [],
      authorEntry: null,
      loading: true,
      postsPages: 1,
      currPostPage: 1,
      authPages: 1,
      currAuthPage: 1,
      stats: {
        posts: 'loading',
        authors: 'loading',
        connected: 'loading'
      },
      graph: false };

    this.get = _.debounce(this.get.bind(this), 500);
    this.getAuthors = _.debounce(this.getAuthors.bind(this), 500);
  }

  getPosts(tags, cb) {
    const q = JSON.stringify(tags);
    const page = this.state.currPostPage;
    $.ajax({
      url: `/api/posts?tags=${q}&page=${page}`,
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

  getStats(cb) {
    //const q = JSON.stringify(id);

    $.ajax({
      url: '/api/stats',
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
          authors: authors.results,
          query: str,
          authorEntry: authors.results.length === 0 ? null : 
          {
            name: authors.results[0].name,
            hIndex: authors.results[0].hIndex,
            totalPosts: authors.results[0].posts.length
          },
          loading: false,
          authPages: Math.min(Math.ceil(authors.count / 20), 10) || 1
        }, () => {
          if (this.state.view === 'authors') {
            this.get(str);
          }
        });       
      }
      if (cb) {
        cb();
      }
    };

    if (tags.length > 0) {
      if (this.state.view === 'authors') {
        this.setState({
          loading: true
        });
      }
      const q = JSON.stringify(tags);
      const page = this.state.currAuthPage;
      $.ajax({
        url: `/api/authors?tags=${q}&page=${page}`,
        method: 'GET',
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
        if (blogPosts.results.length === 0) {
          this.setState({
            tags: null,
            posts: [],
            entry: null,
            links: [],
            query: str,
            loading: false,
            postsPages: 1 
          });
          if (cb) {
            cb();
          }
        } else {
          this.getLinks(blogPosts.results[0].postId, (errorLinks, blogLinks) => {
            if (errorLinks) {
              throw errorLinks;
            }
            this.setState({
              tags: tags,
              posts: blogPosts.results,
              entry: this.state.view === 'posts' ? {
                title: blogPosts.results[0].title,
                rank: blogPosts.results[0].rank,
                description: blogPosts.results[0].description,
                url: blogPosts.results[0].url
              } : null,
              links: blogLinks,
              query: str,
              loading: false,
              postsPages: Math.min(Math.ceil(blogPosts.count / 20), 10)
            });
            if (cb) {
              cb();
            }
          });
        }
        if (this.state.view === 'posts') {
          this.getAuthors(str);
        }
      });
    }
  }

  resultsClickHandler(index, authIndex) {
    let post;
    if (authIndex !== undefined && this.state.view === 'authors') {
      post = this.state.authors[authIndex].posts[index];
      this.authorNameClickHandler(authIndex);
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
      });
    });
  }

  pageHandler(page) {
    if (this.state.view === 'posts') {
      this.setState({
        currPostPage: page
      }, () => {
        this.get(this.state.query);
      }); 
    } else if (this.state.view === 'authors') {
      this.setState({
        currAuthPage: page
      }, () => {
        this.getAuthors(this.state.query);
      }); 
    }
  }

  resetActivePage() {
    $('.pagenums').removeClass('active');
    $('#page0').addClass('active');
    $('.pageback').addClass('disabled');
    $('.pageforward').removeClass('disabled');
  }

  resetCurrPages(cb) {
    this.setState({
      currAuthPage: 1,
      currPostPage: 1
    }, cb);
  }

  postsViewClickHandler() {
    if (this.state.view === 'authors') {
      if (this.state.posts.length > 0) {
        var post = this.state.posts[0];
        this.getLinks(post.postId, (err, blogLinks) => {
          this.setState({
            view: 'posts',
            entry: {
              title: post.title,
              rank: post.rank,
              description: post.description,
              url: post.url
            },
            links: blogLinks
          });
        });
      } else {
        this.setState({
          view: 'posts',
          entry: null
        });
      }

      $('.authorselect').addClass('disabled');
      $('.postselect').removeClass('disabled');
    }
  }


  authorsViewClickHandler() {
    if (this.state.view === 'posts') {
      this.setState({
        view: 'authors',
        entry: null
      });
      $('.postselect').addClass('disabled');
      $('.authorselect').removeClass('disabled');
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
      return `Author results for "${this.state.query}"`;
    } else if (this.state.view === 'posts') {
      return `Post results for "${this.state.query}"`;
    }
  }

  showGraph() {
    this.setState({
      graph: !this.state.graph
    });
    console.log('Graph view: ', this.state.graph);
  }

  componentDidMount() {
    this.get('javascript');
    this.getStats((err, data) => {
      console.log('Stats were recieved: ', data);
      this.setState({
        stats: data
      });
    });
  }

  componentDidUpdate() {
    $('.collapsible').collapsible({
      accordion: true
    });
  }

  render() {
    var progress = this.state.loading 
                    ? <ProgressBar className='red'></ProgressBar> 
                    : <div className="center-align">
                        <p className="finish">{this.finishSearchMessage()}</p>
                      </div>;
    return (
    <div>
      <Row>
        <nav className="teal darken-2">
          <div className="nav-wrapper">
            <Col className="logo center-align" s={4}>
              <h4>BlogRank</h4>
            </Col>
            <Col className="center-align" s={4}>
              <h4></h4>
            </Col>
            <Col className="center-align" s={4}>
              <h4></h4>
            </Col>
          </div>
        </nav>
      </Row>
      <Row>
        <Col s={12} m={4}>
          <Search 
            view={this.state.view} 
            getAuthors={this.getAuthors.bind(this)} 
            get={this.get.bind(this)} 
            resetActivePage={this.resetActivePage.bind(this)} 
            resetCurrPages={this.resetCurrPages.bind(this)}/>
          <Row>
            <div className="center-align">
              <a className="postselect waves-effect red lighten-3 waves-light btn" 
                 onClick={this.postsViewClickHandler.bind(this)}>Posts</a>
              <a className="authorselect disabled red lighten-3 waves-effect waves-light btn" 
                 onClick={this.authorsViewClickHandler.bind(this)}>Authors</a>
            </div>
          </Row>
          <About
            className="about"
            stats={this.state.stats}
            showGraph={this.showGraph.bind(this)} />
        </Col>
        <Col className="results" s={12} m={4}>
          <Collection className="lesspadding"
                      style="background-color: white;">
            <CollectionItem className="lesspadding">
              {progress}
              <Pages 
                view={this.state.view} 
                currPostPage={this.state.currPostPage} 
                postsPages={this.state.postsPages} 
                currAuthPage={this.state.currAuthPage} 
                authPages={this.state.authPages} 
                pageHandler={this.pageHandler.bind(this)}/>
            </CollectionItem>
          </Collection>
          <Scrollbars style={{ height: $(window).height() }}>
            <Results 
              authorNameClickHandler={this.authorNameClickHandler.bind(this)} 
              view={this.state.view} 
              className="left-align" 
              resultsClickHandler={this.resultsClickHandler.bind(this)} 
              authors={this.state.authors} 
              posts={this.state.posts} 
              query={this.state.query}/>
          </Scrollbars>
        </Col>
        <Col s={12} m={4}>
          <Entry 
            view={this.state.view} 
            authorEntry={this.state.authorEntry} 
            entry={this.state.entry} 
            links={this.state.links} />
        </Col>
      </Row>
      </div>
    );
  }
}

export default App;

