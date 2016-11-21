import React from 'react';

class FeedbackButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleFeedbackClicked = this.handleFeedbackClicked.bind(this);

    this.state = {
      feedbackGivenKeys: [],
    };
  }

  handleFeedbackClicked() {
    this.props.onFeedback();
    this.setState({ feedbackGivenKeys: [...this.state.feedbackGivenKeys, this.props.feedbackKey] });
    console.log(this.state);
  }

  render() {
    const { buttonText, givenText, feedbackKey } = this.props;
    const hasGivenFeedback = this.state.feedbackGivenKeys.indexOf(feedbackKey) >= 0;

    if (hasGivenFeedback) {
      return (
        <div className="FeedbackButton">
          <div className="FeedbackButton__feedbackGiven">
            {givenText}
          </div>
        </div>
      );
    }

    return (
      <div className="FeedbackButton">
        <a className="FeedbackButton__button" onClick={this.handleFeedbackClicked} role="button" tabIndex="0">
          {buttonText}
        </a>
      </div>
    );
  }
}

FeedbackButton.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  givenText: React.PropTypes.string.isRequired,
  feedbackKey: React.PropTypes.string.isRequired,
  onFeedback: React.PropTypes.func.isRequired,
};

export default FeedbackButton;
