import React from 'react';
import './style.css';
import dots from './dots.svg';
import classToggle from '../../libs/dom/classToggle';

function showAds(toggle = false) {
  [...document.querySelectorAll('.AdvertBar')].forEach(el => classToggle(el, 'AdvertBar--hide', !toggle));
  return toggle;
}

const optionsList = {
  showAds,
};

function generateInitial(options) {
  const optionDict = {};
  const previous = localStorage.getItem('suop') ? JSON.parse(localStorage.getItem('suop')) : {};

  Object.keys(options).forEach((optionName) => {
    if (Object.hasOwnProperty.call(previous, optionName)) {
      optionDict[optionName] = options[optionName](previous[optionName]);
    } else {
      optionDict[optionName] = options[optionName];
    }
  });

  return optionDict;
}

class OptionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: generateInitial(optionsList),
    };
  }

  handleChange(optionName) {
    this.setState({ options: {
      ...this.state.options,
      [optionName]: optionsList[optionName](!this.state.options[optionName]),
    } }, () => localStorage.setItem('suop', JSON.stringify(this.state.options)));
  }

  render() {
    const options = this.state.options;
    return (
      <div className="OptionsPanel">
        <img src={dots} role="presentation" height="20" />
        <ul>
          {Object.keys(options).map(optionName => (
            <li key={optionName}>
              <label htmlFor={optionName}>
                {optionName}
              </label>
              <input
                type="checkbox"
                id={optionName}
                checked={options[optionName]}
                onChange={this.handleChange.bind(this, optionName)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OptionsPanel;
