import React from 'react';
import PropTypes from 'prop-types';

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
          <div className="FeedbackButton__feedbackGiven">
            {givenText}
          </div>
        </div>
      );
    }

    return (
      <div className="FeedbackButton">
        <a
          className="FeedbackButton__button"
          onClick={this.handleFeedbackClicked}
          role="button"
          tabIndex="0"
        >
          {buttonText}
        </a>
      </div>
    );
  }
}

FeedbackButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  givenText: PropTypes.string.isRequired,
  feedbackKey: PropTypes.string.isRequired,
  onFeedback: PropTypes.func.isRequired,
};

export default FeedbackButton;
