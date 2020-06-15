import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utility/history';

import items from './modules/items';
import common from './modules/common';

export default combineReducers({
    items,
    common,
    router: connectRouter(history),
});