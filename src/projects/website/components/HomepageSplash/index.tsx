import React from 'react';
import bind from 'bind-decorator';
import SULogoWhite from '../../../../img/SUlogowhite.svg';
import {OneImageBackground} from '~components/OneImage';
import {basicTimer, Typer} from '~components/Typer';
import {WebsiteRootState} from '~types/website';
import * as routerActions from '~website/ducks/router';
import {RouterState, SearchChangeSource} from '~website/ducks/router';
import {connect} from 'react-redux';

const placeholderHints = [
  'Search',
  'Bars on campus',
  'List of societies',
  'Start a society',
];

interface HomepageSplashProps {
  router: RouterState;
  setSearchValue: typeof routerActions.setSearchValue;
}

class HomepageSplashComponent extends React.Component<HomepageSplashProps> {
  @bind
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.setSearchValue(e.target.value, SearchChangeSource.Elsewhere);
  }

  componentDidMount() {
    const body = document.querySelector('.Body');
    if (body) {
      body.classList.add('html--miniheader');
    }
  }

  componentWillUnmount() {
    const body = document.querySelector('.Body');
    if (body) {
      body.classList.remove('html--miniheader');
    }
  }

  render() {
    const { router } = this.props;

    return (
      <OneImageBackground
        className="HomepageSplash"
        src="original_images/63b813ed4eb54ee6b07ac2b29a478b18"
      >
        <div className="LokiContainer">
          <div className="HomepageSplash__inner">
            <img
              className="HomepageSplash__logo"
              src={SULogoWhite}
              alt="Sussex Students Union"
            />
            <Typer
              timer={basicTimer}
              lines={placeholderHints}
              render={({ value }) => (
                <input
                  className="HomepageSplash__search-input"
                  type="search"
                  placeholder={value}
                  value={router.searchQuery}
                  onChange={this.onChange}
                />
              )}
            />
            <h2>Run by students, for students</h2>
          </div>
        </div>
      </OneImageBackground>
    );
  }
}

export const HomepageSplash = connect(
  (state: WebsiteRootState) => ({
    router: state.router,
  }),
  {
    setSearchValue: routerActions.setSearchValue,
  },
)(HomepageSplashComponent);
