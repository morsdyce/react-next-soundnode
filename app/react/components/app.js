import React, { Component, lazy, Suspense } from 'react';
import HeaderActions from './common/header/headerActions';
import SettingsButton from './common/header/settingsButton';
import Player from './player';
import NotificationCenter from './notifications/notification-center';

import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import ModalCenter from './modals/modal-center';
import User from './common/user';
import Loader from './common/loader';

const Charts = lazy(() => import('../pages/charts'));
const Favorites = lazy(() => import('../pages/favorites'));
const Track = lazy(() => import('../pages/track'));

@inject((stores) => ({
  fetchUser: () => stores.authStore.fetchUser()
}))
@observer
export class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<Loader />}>
          <div id="app" className="ui_app">
            <header className="topFrame">
              <HeaderActions/>

              <ul className="appInfo">
                <li className="appInfo_item subNav settingsApp">
                  <SettingsButton/>
                </li>
              </ul>
            </header>

            <aside className="aside">
              <header className="header"/>
              <User />
              <nav className="mainNav">
                <h2 className="ui_title">Main</h2>
                <ul className="mainNav_nav">
                  <li className="mainNav_item" ui-sref-active="active">
                    <Link to="/charts" className="mainNav_button">
                      <i className="fa fa-trophy"/>
                      <span className="mainNav_tit">Top 50</span>
                    </Link>
                  </li>
                  <li className="mainNav_item" ui-sref-active="active">
                    <Link to="/favorites" className="mainNav_button">
                      <i className="fa fa-heart"/>
                      <span className="mainNav_tit">Likes</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
            <Player/>
            <div className="mainView">
              <Switch>
                <Route exact path="/" component={Charts}/>
                <Route path="/charts/:genre?" component={Charts}/>
                <Route path="/favorites" component={Favorites}/>
                <Route path="/track/:id" component={Track} />
              </Switch>
            </div>

            <NotificationCenter/>
            <ModalCenter />
          </div>
        </Suspense>
      </Router>
    );
  }
}

export default App;
