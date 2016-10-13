//About.jsx

import React from 'react';
import { Col, Row, Chip } from 'react-materialize';

const About = ({ stats }) => (
  <Row>

    <Col s={12}>
      <p className='about'>
        <em>BlogRank is your go-to source for discovering programming knowledge from bloggers. 
        Independent bloggers power the world of development, often-times disseminating the best new ideas, practices, 
        and even novel language contructs that the creators of a technology didn't even think of. The core idea 
        of BlogRank is that the articles you want to see most are the ones vetted by other independent bloggers.
        The more highly cited a blog post is by other authors, the more highly we rank it. You can also search by
        author who are ranked according to their <a href='https://en.wikipedia.org/wiki/H-index' target='_blank'>h-index</a>, as 
        inspired by the world of academia.</em>
      </p>
      <p className='about'>
        <em>
        Our search engine is powered by the graph data structure you see visualized in the background, 
        and a web crawler and indexing service running behind the scenes. The project was made with React,
        Node.js, and postgreSQL</em>
      </p>
      <Row>
        <div className='center-align'>
          <Chip>{stats.posts} posts</Chip>
          <Chip>{stats.authors} authors</Chip>
          <Chip>{stats.connected} edges</Chip>
        </div>
      </Row>
      <div className='center-align'>
        <p>
          Made by 
          <a href='https://github.com/abandeali1' target='_blank'> Amir</a>,
          <a href='https://github.com/p-herbert' target='_blank'> Pete</a>, and
          <a href='https://github.com/oldchevy' target='_blank'> Nick </a>
         at Hack Reactor
        </p>
      </div>
      <div className='center-align'>
        <p>
          <a href='https://github.com/truncatedAvocados' target='_blank'>Contribute</a>
        </p>
      </div>
    </Col>
  </Row>
);

About.propTypes = {
  stats: React.PropTypes.object,
  links: React.PropTypes.array };

export default About;