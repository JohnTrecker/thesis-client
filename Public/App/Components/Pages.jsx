import React from 'react';
import {Row, Col} from 'react-materialize';
import * as _ from 'underscore';

const Pages = ({view, currPostPage, postsPages, currAuthPage, authPages, pageHandler}) => {
  if ((postsPages <= 1 && view === 'posts') || (authPages <= 1 && view === 'authors')) {
    return null;
  } else {
    var pages = view === 'posts' ? postsPages : authPages;
    var currPage = view === 'posts' ? currPostPage : currAuthPage;
    return (
      <Row className="oneline">
        <ul className="pagination center-align">
          <li className={'pageback waves-effect ' + (currPage === 1 ? 'disabled' : '')}>
            <a onClick={() => {
              if (currPage > 1) {
                pageHandler(currPage - 1);
              }
            }}><i className="material-icons">chevron_left</i></a>
          </li>
          {_.range(1, pages + 1)
            .map((page, i) => {
              return (
                <li id={'page' + i}
                    className={'pagenums waves-effect' + (i === currPage - 1 ? 'active teal darken-2' : '')}>
                  <a className={'smallfont ' + (i === currPage - 1 ? 'textwhite' : '')}
                     onClick={() => {
                       pageHandler(page);
                     }}>{page}
                 </a>
                </li>
              )
            })
          }
          <li className={'waves-effect pageforward ' + (currPage === pages ? 'disabled' : ' ')}>
            <a onClick={() => {
              if (currPage < pages) {
                pageHandler(currPage + 1);
              }
            }}><i className="material-icons">chevron_right</i></a>
          </li>
        </ul>
      </Row>
    )
  }
};

Pages.propTypes = {
  pageHandler: React.PropTypes.func.isRequired
};

export default Pages;