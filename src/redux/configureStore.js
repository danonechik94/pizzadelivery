import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from './middleware/logger';
import clientMiddleware from './middleware/client';
import rootReducer from './reducers';

export default function configureStore(preloadedState, history) {
  const middlewares = [loggerMiddleware, clientMiddleware, routerMiddleware(history), thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composedEnhancers = compose(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}