import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';

const Link = ({ link, title, author }) => (
  <ul className="collapsible" data-collapsible="accordion">
    <li>
      <div className="collapsible-header">{title}</div>
      <div className="collapsible-body">{[<div className="linkprops"><a href={link}>{link}</a></div>,<div className="linkprops">Author: { author }</div>]}</div>
    </li>
  </ul>
);

Link.propTypes = {
  link: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired };

export default Link;

