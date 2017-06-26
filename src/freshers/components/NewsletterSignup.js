import React from 'react';
import getFalmerEndpoint from '../../js/libs/getFalmerEndpoint';

const RESPONSE_TEXT = {
  INITIAL: () => `Be the first to hear`,
  INITIAL_FOCUS: () => `Enter your email address`,
  ADDRESS_SUCCESS: () =>
    "Check you inbox to confirm! But first, what's your name?",
  NAME_SUCCESS: () => `Thanks! What will you be?`,
  LEVEL_SUCCESS: () => `Great. Where are you coming from?`,
  FEE_SUCCESS: data => `See you in September, ${data.name}!`,
  ERROR: () => `We haven't been able to add you. Please try again later.`,
};

const LS_KEY = 'newsletter:freshers';
const NEWSLETTER_ENDPOINT = `${getFalmerEndpoint()}/newsletters/freshers17/members`;

const OPTIONS_MERGE = {
  LEVEL: {
    Undergraduate: 'Undergraduate',
    'Taught postgraduate': 'Taught postgraduate',
    'Research postgraduate': 'Research postgraduate',
    'Not a Sussex/BSMS student': 'Not a Sussex/BSMS student',
  },
  FEE: {
    'Home (UK) student': 'Home (UK) student',
    'EU student': 'EU student',
    'International student': 'International student',
    'Visiting/exchange student': 'Visiting/exchange student',
    'Not a Sussex/BSMS student': 'Not a Sussex/BSMS student',
  },
};

class NewsletterSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign(
      {
        currentState: 'INITIAL',
        isLoading: false,
        continuationToken: null,
        data: {
          address: '',
          name: '',
        },
      },
      JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    );

    this.handleEmailAddress = ({ target: { value } }) =>
      this.setState({ data: { ...this.state.data, address: value } });

    this.handleName = ({ target: { value } }) =>
      this.setState({ data: { ...this.state.data, name: value } });

    this.handleEmailSubmit = () => {
      fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: this.state.data.address,
        }),
      })
        .then(res => Promise.all([res, res.json()]))
        .then(([res, data]) => {
          console.log(data);
          if (res.status === 200) {
            this.setState({
              continuationToken: data.continuationToken,
              currentState: 'ADDRESS_SUCCESS',
            });
            localStorage.setItem(LS_KEY, JSON.stringify(this.state));
          } else {
            this.setState({
              currentState: 'ERROR',
            });
          }
        })
        .catch(() => {
          this.setState({
            currentState: 'ERROR',
          });
        });
    };

    const fieldUpdate = (nextSuccessState, fieldMap) => {
      fetch(NEWSLETTER_ENDPOINT, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          continuationToken: this.state.continuationToken,
          fields: fieldMap,
        }),
      })
        .then(res => ({ res, data: res.json() }))
        .then(({ res }) => {
          if (res.status === 200) {
            this.setState({
              currentState: nextSuccessState,
            });
            localStorage.setItem(LS_KEY, JSON.stringify(this.state));
          } else {
            this.setState({
              currentState: 'ERROR',
            });
          }
        })
        .catch(() => {
          this.setState({
            currentState: 'ERROR',
          });
        });
    };

    this.handleNameSubmit = () =>
      fieldUpdate('NAME_SUCCESS', {
        NAME: this.state.data.name,
      });

    this.handleStatusSubmit = () =>
      fieldUpdate('STATUS_SUCCESS', {
        STATUS: this.state.data.status,
      });

    this.handleLevel = level => {
      fieldUpdate('LEVEL_SUCCESS', {
        LEVEL: level,
      });
    };

    this.handleFee = fee => {
      fieldUpdate('FEE_SUCCESS', {
        FEE: fee,
      });
    };

    this.handleFormSubmit = e => {
      e.preventDefault();
      if (
        this.state.currentState === 'INITIAL' ||
        this.state.currentState === 'INITIAL_FOCUS'
      ) {
        this.handleEmailSubmit();
      } else if (this.state.currentState === 'ADDRESS_SUCCESS') {
        this.handleNameSubmit();
      } else if (this.state.currentState === 'NAME_SUCCESS') {
        this.handleStatusSubmit();
      }
    };
  }

  render() {
    const { currentState, data } = this.state;
    return (
      <div className="NewsletterSignup">
        <div className="NewsletterSignup__response">
          {currentState ? RESPONSE_TEXT[currentState](data) : null}
        </div>
        <div>
          {currentState === 'INITIAL' || currentState === 'INITIAL_FOCUS'
            ? <form
                className="NewsletterSignup__form"
                onSubmit={this.handleFormSubmit}
              >
                <input
                  className="NewsletterSignup__email-input NewsletterSignup__input"
                  type="email"
                  value={data.address}
                  onChange={this.handleEmailAddress}
                  onFocus={() =>
                    this.setState({ currentState: 'INITIAL_FOCUS' })}
                />
                <button className="NewsletterSignup__button" type="submit">
                  Subscribe
                </button>
              </form>
            : null}

          {currentState === 'ADDRESS_SUCCESS'
            ? <form
                className="NewsletterSignup__form"
                onSubmit={this.handleFormSubmit}
              >
                <input
                  className="NewsletterSignup__input"
                  type="text"
                  placeholder="Your Name"
                  value={data.name}
                  onChange={this.handleName}
                />
                <button className="NewsletterSignup__button" type="submit">
                  <svg
                    className="BackBar__arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="BackBar__arrow-back"
                        width="18"
                        height="18"
                        rx="2"
                      />
                      <path
                        className="BackBar__arrow"
                        fill="#FFF"
                        fillRule="nonzero"
                        d="M15.715215,9.67002437 C16.0969496,9.29253227 16.0939089,8.67853807 15.7121731,8.30258285 L9.55867891,2.24158095 C8.82411406,1.50934734 7.72454442,2.60694484 8.45759085,3.33917457 L13.0809849,7.94634327 C13.2330683,8.09946147 13.1828826,8.22377469 12.9684427,8.22377469 L2.77867689,8.22377469 C2.34826324,8.22377469 2,8.57094432 2,8.99998035 C2,9.42901639 2.34827492,9.77618601 2.77867689,9.77618601 L12.9684427,9.77618601 C13.1844049,9.77618601 13.2361129,9.89746815 13.0809849,10.0521038 L8.45759085,14.660825 C7.72454442,15.3930586 8.82411795,16.4906522 9.55867891,15.7584186 L15.715215,9.67002437 Z"
                        transform="matrix(-1 0 0 1 18 0)"
                      />
                    </g>
                  </svg>

                </button>
              </form>
            : null}

          {currentState === 'NAME_SUCCESS'
            ? <div className="NewsletterSignup__form">
                <ul className="NewsletterSignup__options">
                  {Object.keys(OPTIONS_MERGE.LEVEL).map(key =>
                    <li className="NewsletterSignup__options-item">
                      <button
                        className="NewsletterSignup__options-button"
                        onClick={this.handleLevel.bind(this, key)}
                      >
                        {OPTIONS_MERGE.LEVEL[key]}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            : null}

          {currentState === 'LEVEL_SUCCESS'
            ? <div className="NewsletterSignup__form">
                <ul className="NewsletterSignup__options">
                  {Object.keys(OPTIONS_MERGE.FEE).map(key =>
                    <li className="NewsletterSignup__options-item">
                      <button
                        className="NewsletterSignup__options-button"
                        onClick={this.handleFee.bind(this, key)}
                      >
                        {OPTIONS_MERGE.FEE[key]}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            : null}
        </div>
      </div>
    );
  }
}

export default NewsletterSignup;
