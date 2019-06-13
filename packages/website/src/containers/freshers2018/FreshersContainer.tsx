import { Link } from 'react-router-dom';
import React from 'react';
import { Query } from 'react-apollo';

import FRESHERS_MENU_QUERY from './FreshersMenuQuery.graphql';
import { Page } from '../content/types';

class FreshersMenuQuery extends Query<
  {
    page: {
      root: {
        subPages: Page[];
      };
    };
  },
  {}
> {}

export const FreshersContainer = (props: any) => (
  <div className="FreshersSite u-keep-footer-down">
    <div className="LokiContainer">
      <ul className="FreshersMenu">
        <li>
          <Link to="/freshers">Home</Link>
        </li>

        <FreshersMenuQuery query={FRESHERS_MENU_QUERY}>
          {({ data }) => {
            if (!data || !data.page) {
              return null;
            }

            return data.page.root.subPages.map((item) => (
              <li>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ));
          }}
        </FreshersMenuQuery>
      </ul>
    </div>
    {props.children}
  </div>
);
