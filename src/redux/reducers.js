import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utility/history';

import items from './modules/items';
import common from './modules/common';
import cart from './modules/cart';

export default combineReducers({
    items,
    common,
    cart,
    router: connectRouter(history),
});