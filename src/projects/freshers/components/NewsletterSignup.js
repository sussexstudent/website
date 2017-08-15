import React from 'react';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import HydroLeaf from '~components/HydroLeaf/index';

const RESPONSE_TEXT = {
  INITIAL: () =>
    `Get exclusive advance access to our events & discount wristbands by signing up below`,
  INITIAL_FOCUS: () => `Enter your email address`,
  ADDRESS_SUCCESS: () =>
    "Check you inbox to confirm! But first, what's your name?",
  NAME_SUCCESS: () => `Thanks! What will you be?`,
  LEVEL_SUCCESS: () => `Great. Where are you coming from?`,
  FEE_SUCCESS: data => `See you in September, ${data.name}!`,
  COMPLETE: () => `See you in September!`,
  ERROR: () => `We haven't been able to add you. Please try again later.`,
};

const LS_KEY = 'newsletter:freshers';
const NEWSLETTER_ENDPOINT = `${getFalmerEndpoint()}/newsletters/freshers17/members`;

if (typeof localStorage === 'undefined') {
  global.localStorage = { getItem: () => null, setItem: () => null };
}

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
            if (data.complete) {
              this.setState({ currentState: 'COMPLETE' });
              return;
            }
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
            ? <div>
                <form
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
                    required
                  />
                  <button className="NewsletterSignup__button" type="submit">
                    Subscribe
                  </button>
                </form>
                <div className="NewsletterSignup__small-print">{`We'll send you freshers week update emails and subscribe you to our newsletter. You can unsubscribe at any time`}</div>
              </div>
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
                  required
                />
                <button className="NewsletterSignup__button" type="submit">
                  Next
                </button>
              </form>
            : null}

          {currentState === 'NAME_SUCCESS'
            ? <div className="NewsletterSignup__form">
                <ul className="NewsletterSignup__options">
                  {Object.keys(OPTIONS_MERGE.LEVEL).map(key =>
                    <li className="NewsletterSignup__options-item">
                      <button
                        type="button"
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
                        type="button"
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

const Hydro = HydroLeaf({ disableSSR: true })(NewsletterSignup);

export default NewsletterSignup;
export { Hydro };
