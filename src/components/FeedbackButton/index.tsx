import React from 'react';
import bind from 'bind-decorator';

interface IProps {
  buttonText: string;
  givenText: string;
  feedbackKey: string;
  onFeedback(): void;
}

interface IState {
  feedbackGivenKeys: string[];
}

class FeedbackButton extends React.Component<IProps, IState> {
  state = {
    feedbackGivenKeys: [],
  };

  @bind
  handleFeedbackClicked() {
    this.props.onFeedback();
    this.setState({
      feedbackGivenKeys: [
        ...this.state.feedbackGivenKeys,
        this.props.feedbackKey,
      ],
    });
  }

  render() {
    const { buttonText, givenText, feedbackKey } = this.props;
    const hasGivenFeedback =
      this.state.feedbackGivenKeys.indexOf(feedbackKey) >= 0;

    if (hasGivenFeedback) {
      return (
        <div className="FeedbackButton">
          <div className="FeedbackButton__feedbackGiven">{givenText}</div>
        </div>
      );
    }

    return (
      <div className="FeedbackButton">
        <a
          className="FeedbackButton__button"
          onClick={this.handleFeedbackClicked}
          role="button"
          tabIndex={0}
        >
          {buttonText}
        </a>
      </div>
    );
  }
}

export default FeedbackButton;
