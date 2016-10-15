import React from 'react';
import { Row, Col, CollectionItem } from 'react-materialize';

const Link = ({ link, title, author, i }) => (
  <ul className="collapsible grey lighten-4" data-collapsible="accordion">
    <li>
      <div className="collapsible-header grey lighten-4 header-lines">{title}</div>
      <div className="collapsible-body">{
        [<div key={i} className="link linkprops"><a href={link} target="_blank">{link}</a></div>,
         <div key={i + 'a'} className="linkprops"><b>Author</b>: { author }</div>]}
       </div>
    </li>
  </ul>
);

Link.propTypes = {
  link: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired };

export default Link;

