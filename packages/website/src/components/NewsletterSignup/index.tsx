import React from 'react';
import getFalmerEndpoint from '@ussu/common/src/libs/getFalmerEndpoint';
import { Store } from '@ussu/common/src/libs/store';

const LS_KEY = 'newsletter:freshers19';
const NEWSLETTER_ENDPOINT = `${getFalmerEndpoint()}/newsletters/freshers19/members`;

const OPTIONS_MERGE: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  LEVEL: {
    Undergraduate: 'Undergraduate',
    Postgraduate: 'Postgraduate',
  },
};

enum FormState {
  Initial = 'Initial',
  InitialFocus = 'InitialFocus',
  AddressSuccess = 'AddressSuccess',
  NameSuccess = 'NameSuccess',
  LevelSuccess = 'LevelSuccess',
  Complete = 'Complete',
  Error = 'Error',
}

interface IProps {}

interface IState {
  currentState: FormState;
  isLoading: boolean;
  continuationToken: string;
  data: {
    address: string;
    name: string;
    status: string;
  };
}

const RESPONSE_TEXT: {
  [state: string]: (data: IState['data']) => string;
} = {
  [FormState.Initial]: () => `Sign up to our newsletter for exclusive content`,
  [FormState.InitialFocus]: () => `Enter your email address`,
  [FormState.AddressSuccess]: () =>
    "Check your inbox to confirm! But first, what's your name?",
  [FormState.NameSuccess]: () => `Thanks! What will you be?`,
  [FormState.LevelSuccess]: (data) => `See you in September, ${data.name}!`,
  [FormState.Complete]: () => `See you in September!`,
  [FormState.Error]: () =>
    `We either haven't been able to add you or you might already be on there. Please try again later.`,
};

class NewsletterSignup extends React.Component<IProps, IState> {
  private handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  private handleEmailAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  private handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  private handleEmailSubmit: () => void;
  private handleNameSubmit: () => void;
  private handleLevel: (level: string) => void;

  constructor(props: IProps) {
    super(props);

    this.state = Object.assign(
      {
        currentState: FormState.Initial,
        isLoading: false,
        continuationToken: null,
        data: {
          address: '',
          name: '',
          status: '',
        },
      },
      Store.get(LS_KEY, {}),
    );

    this.handleEmailAddress = ({ currentTarget: { value } }) =>
      this.setState({ data: { ...this.state.data, address: value } });

    this.handleName = ({ currentTarget: { value } }) =>
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
        .then((res) => Promise.all([res, res.json()]))
        .then(([res, data]) => {
          if (res.status === 200) {
            if (data.complete) {
              this.setState({ currentState: FormState.Complete });
              return;
            }
            this.setState({
              continuationToken: data.continuationToken,
              currentState: FormState.AddressSuccess,
            });
            Store.set(LS_KEY, this.state);
          } else {
            this.setState({
              currentState: FormState.Error,
            });
          }
        })
        .catch(() => {
          this.setState({
            currentState: FormState.Error,
          });
        });
    };

    const fieldUpdate = (nextSuccessState: FormState, fieldMap: Object) => {
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
        .then((res) => ({ res, data: res.json() }))
        .then(({ res }) => {
          if (res.status === 200) {
            this.setState({
              currentState: nextSuccessState,
            });
            Store.set(LS_KEY, this.state);
          } else {
            this.setState({
              currentState: FormState.Error,
            });
          }
        })
        .catch(() => {
          this.setState({
            currentState: FormState.Error,
          });
        });
    };

    this.handleNameSubmit = () =>
      fieldUpdate(FormState.NameSuccess, {
        NAME: this.state.data.name,
      });

    this.handleLevel = (level) => {
      fieldUpdate(FormState.LevelSuccess, {
        LEVEL: level,
      });
    };

    this.handleFormSubmit = (e) => {
      e.preventDefault();
      if (
        this.state.currentState === FormState.Initial ||
        this.state.currentState === FormState.InitialFocus
      ) {
        this.handleEmailSubmit();
      } else if (this.state.currentState === FormState.AddressSuccess) {
        this.handleNameSubmit();
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
          {currentState === FormState.Initial ||
          currentState === FormState.InitialFocus ? (
            <div>
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
                    this.setState({ currentState: FormState.InitialFocus })
                  }
                  placeholder="example@email.com"
                  required
                />
                <button className="NewsletterSignup__button" type="submit">
                  Subscribe
                </button>
              </form>
              <div className="NewsletterSignup__small-print">{`We'll send you Freshers' Week update emails and subscribe you to our newsletter. You can unsubscribe at any time.`}</div>
            </div>
          ) : null}

          {currentState === FormState.AddressSuccess ? (
            <form
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
          ) : null}

          {currentState === FormState.NameSuccess ? (
            <div className="NewsletterSignup__form">
              <ul className="NewsletterSignup__options">
                {Object.keys(OPTIONS_MERGE.LEVEL).map((key) => (
                  <li className="NewsletterSignup__options-item">
                    <button
                      type="button"
                      className="NewsletterSignup__options-button"
                      onClick={this.handleLevel.bind(this, key)}
                    >
                      {OPTIONS_MERGE.LEVEL[key]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export { NewsletterSignup };
