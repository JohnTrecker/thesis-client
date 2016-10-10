import React from 'react';
import {Row, Col} from 'react-materialize';
import * as _ from 'underscore';

const Pages = ({view, postsPages, authPages, pageHandler}) => {
  if ((postsPages <=1 && view === 'posts') || (authPages <=1 && view === 'authors')) {
    return null;
  } else {
    var pages = view === 'posts' ? postsPages : authPages;
    return (
      <Row>
        <ul className="pagination center-align">
          <li className="disabled"><a><i className="material-icons">chevron_left</i></a></li>
          {_.range(1, pages + 1)
            .map(function(page, i) {
              return (
                <li className="waves-effect">
                  <a onClick={function(e) {
                    console.log($(this).parent().attr('class'));
                    $(this).parent().addClass('active');
                    pageHandler(page);
                  }}>{page}</a>
                </li>
              )
            })
          }
          <li className="waves-effect"><a><i className="material-icons">chevron_right</i></a></li>
        </ul>
      </Row>
    )
  }
};

Pages.propTypes = {
  pageHandler: React.PropTypes.func.isRequired
};

export default Pages;