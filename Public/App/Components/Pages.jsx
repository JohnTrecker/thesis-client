import React from 'react';
import {Row, Col} from 'react-materialize';
import * as _ from 'underscore';

const Pages = ({view, currPostPage, postsPages, currAuthPage, authPages, pageHandler}) => {
  if ((postsPages <=1 && view === 'posts') || (authPages <=1 && view === 'authors')) {
    return null;
  } else {
    var pages = view === 'posts' ? postsPages : authPages;
    var currPage = view === 'posts' ? currPostPage : currAuthPage;
    return (
      <Row>
        <ul className="pagination center-align">
          <li className="disabled pageback waves-effect">
            <a onClick={() => {
              if (currPage - 1 === 1) {
                $('.pageback').addClass('disabled');
              }
              if (currPage - 1 != pages) {
                $('.pageforward').removeClass('disabled');
              }
              if (currPage > 1) {
                $('.pagenums').removeClass('active');
                $(`#page${currPage - 2}`).addClass('active');
                pageHandler(currPage - 1);
              }
            }}><i className="material-icons">chevron_left</i></a>
          </li>
          {_.range(1, pages + 1)
            .map((page, i) => {
              return (
                <li id={'page'+i} className={'pagenums waves-effect ' + (i === 0 ? 'active' : '')}>
                  <a onClick={() => {
                    if (i > 0) {
                      $('.pageback').removeClass('disabled');
                    } else {
                      $('.pageback').addClass('disabled');
                    }
                    if (i === pages - 1) {
                      $('.pageforward').addClass('disabled');
                    } else {
                      $('.pageforward').removeClass('disabled');
                    }
                    $('.pagenums').removeClass('active');
                    $(`#page${i}`).addClass('active');
                    pageHandler(page);
                  }}>{page}</a>
                </li>
              )
            })
          }
          <li className="waves-effect pageforward">
            <a onClick={() => {
              if (currPage + 1 === pages) {
                $('.pageforward').addClass('disabled');
              }
              if (currPage + 1 > 1) {
                $('.pageback').removeClass('disabled');
              }
              if (currPage < pages) {
                $('.pagenums').removeClass('active');
                $(`#page${currPage}`).addClass('active');
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