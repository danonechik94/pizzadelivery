import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from 'organisms/Header';
import Footer from 'organisms/Footer';
import Auth from 'organisms/Auth';
import Modal from 'molecules/Modal';
import Home from 'pages/Home';

import { authSelector } from '_redux/modules/common/auth/selectors';
import { showAuth, hideAuth } from '_redux/modules/common/authModal/actions';

import styles from './App.scss';

@connect(store => ({
  showAuthState: store.common.authModal.showAuth,
  auth: authSelector(store),
}))
class App extends React.PureComponent {
  closeAuthModal = () => {
    const { dispatch } = this.props;
    dispatch(hideAuth());
  }

  showAuthModal = () => {
    const { dispatch } = this.props;
    dispatch(showAuth());
  };

  render() {
    const { auth, showAuthState } = this.props;
  
    return (
      <Router>
        <div className={styles['app-container']}>
          <Header
            auth={auth}
            showAuth={this.showAuthModal}
          />

          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>

          <Footer />
          <Modal 
            open={showAuthState} 
            closeModal={this.closeAuthModal} 
          >
            <Auth auth={auth} />
          </Modal>
        </div>
      </Router>
    );
  }
}

export default App;
