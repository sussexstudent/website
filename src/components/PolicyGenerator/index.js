import React from 'react';
import cx from 'classnames';
import Hydro from '~components/HydroLeaf';
import { gs, createGeneration } from '@drafty/generation-game';
import { starters, enders } from './data';

let openSocial = () => '';
let sharing = { twitter: () => '' };

if (typeof window === 'undefined') {
} else {
  openSocial = (url) => {
    window.open(
      url,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=522,width=556',
    );
  };

  window.fbAsyncInit = function() {
    FB.init({
      appId: '131048754247134',
      autoLogAppEvents: true,
      xfbml: false,
      version: 'v2.11',
    });
  };

  (function(d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  sharing = {
    facebook(link) {
      if (link == null) {
        link = window.location.href;
      }
      const url = `https://www.facebook.com/v2.8/dialog/share?href=${encodeURIComponent(
        link,
      )}&app_id=696155863910264`;
      return url;
    },
    twitter(text, link) {
      const hashtags = 'sussexelections';

      if (link === null) {
        link = window.location.href;
      }
      const url =
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          link,
        )}&text=${encodeURIComponent(text)}` + `&hashtags=${hashtags}`;

      return url;
    },
  };
}

const degrees = ['English', 'Mathematics', 'Media Studies', 'Computer Science'];

const generation = createGeneration([
  gs`${starters} should be ${enders}`,
  gs`${starters} shouldn't be ${enders}`,
  gs`${starters} should be compulsory if you study ${degrees}`,
  gs`${starters} should be replaced with ${starters}`,
  gs`${starters} should be made to experience ${starters}`,
  gs`${starters} should be funded instead of ${starters}`,
  gs`${starters} should be valued more than ${starters}`,
  gs`${starters} should be made to defend ${starters}`,
]);

function capitaliseLine(line) {
  return `${line.charAt(0).toUpperCase()}${line.slice(1)}`;
}

class PolicyGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      generated: generation.generate(),
    };
    this.handleShare = this.handleShare.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }

  handleGenerate() {
    this.setState({ generated: generation.generate() });
  }

  handleShare() {
    FB.ui({
      method: 'share',
      href: window.location.href,
      quote: `"${capitaliseLine(this.state.generated.output)}"`,
    });
  }

  handleTweet() {
    openSocial(
      sharing.twitter(
        `"${capitaliseLine(
          this.state.generated.output,
        )}" via the @ussu Policy Bot.`,
      ),
    );
  }

  render() {
    return (
      <div className="PolicyGenerator">
        <h1 className="PolicyGenerator__title">
          Automatically generate your election manifesto
        </h1>
        <div className="PolicyGenerator__idea-box">
          <div className="PolicyGenerator__kicker">
            policy idea #{this.state.generated.id}
          </div>
          <h1 className="PolicyGenerator__idea-line">
            {capitaliseLine(this.state.generated.output)}
          </h1>
          <div>
            <button
              className="Button"
              onClick={this.handleGenerate.bind(this)}
              type="button"
            >
              Generate another
            </button>
          </div>
          <div>
            <ul className={cx('Social', 'Social--as-action')}>
              <li>
                <button
                  className="Social__link Social__link--facebook"
                  onClick={this.handleShare}
                  type="button"
                >
                  <span className="Social__icon Social__icon--facebook">
                    <span className="u-h">Facebook</span>
                  </span>

                  <span className="Social__handle">Share</span>
                </button>
              </li>
              <li>
                <button
                  className="Social__link Social__link--twitter"
                  onClick={this.handleTweet}
                  type="button"
                >
                  <span className="Social__icon Social__icon--twitter">
                    <span className="u-h">Twitter</span>
                  </span>
                  <span className="Social__handle">Tweet</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p>
          Our automatic policy generator might come&nbsp;up with an
          election-winning suggestion or just some random nonsense.
        </p>
        <p>
          <strong>
            As a Sussex BSMS, IDS student or researcher you&#39;ve got great
            ideas for things that should be different here.
            <br />
            That&#39;s all you need to be a candidate in our elections.
          </strong>
        </p>
        <p>
          You don&#39;t need to be a certain type of person, have done
          particular things or have any related experience.
        </p>
        <p>
          <strong>You just need some ideas.</strong>
        </p>
        <p>
          Find out more about the elections at{' '}
          <a href="https://www.sussexstudent.com/elections">
            www.sussexstudent.com/elections
          </a>{' '}
          and more about being a candidate at{' '}
          <a href="https://www.sussexstudent.com/itcouldbeme">
            www.sussexstudent.com/itcouldbeme
          </a>
        </p>
        <p>
          If our policy bot&nbsp;generates something it shouldn&#39;t be saying
          please email it to{' '}
          <a href="mailto:jo.w@sussexstudent.com">jo.w@sussexstudent.com</a> so
          we can tweak it.
        </p>
      </div>
    );
  }
}

export default Hydro({ disableSSR: true })(PolicyGenerator);
