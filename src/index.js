// Needed for redux-saga es6 generator support
import '@babel/polyfill';
import 'utility/polyfills';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './redux/configureStore';

import history from 'utility/history';
import App from './components/layouts/App';

const initialState = {};
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

render();

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./components/layouts/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}