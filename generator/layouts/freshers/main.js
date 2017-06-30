import React from 'react';
import PropTypes from 'prop-types';
import BackBar from '../../../src/js/components/BackBar/index';
import MSLTag from '../../components/MSLTag';

const ga = `!function(u,s,S,U){u.GoogleAnalyticsObject=S;u[S]||(u[S]=function(){
(u[S].q=u[S].q||[]).push(arguments)});u[S].l=+new Date;U=s.createElement('script');
var e=s.scripts[0];U.src='//www.google-analytics.com/analytics.js';
e.parentNode.insertBefore(U,e)}(window,document,'ga');

ga('create', 'UA-258929-3', 'auto');
ga('send', 'pageview');`;

const FreshersHeader = () =>
  <BackBar href="https://sussexstudent.com/" color="white">Main site</BackBar>;

const mainLayout = ({ assets }) =>
  <body className="Body" id="top">
    <div className="Site">
      <FreshersHeader />
      <main className="Site__content">
        <div dangerouslySetInnerHTML={{ __html: MSLTag('Content') }} />
      </main>
    </div>
    <div className="js__modal" />
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0&features=es6,es7,default-3.6,performance.now&flags=gated&callback=hasPolyfilled&unknown=polyfill" />
    <script src={assets.vendor.js} />
    <script src={assets.freshers.js} />
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: ga }} />
  </body>;

mainLayout.propTypes = {
  assets: PropTypes.shape({
    main: PropTypes.shape({
      js: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

mainLayout.defaultProps = {
  legacy: false,
  loggedIn: false,
};

export default mainLayout;
