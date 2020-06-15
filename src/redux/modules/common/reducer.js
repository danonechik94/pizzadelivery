import { combineReducers } from 'redux';

import auth from './auth';
import authModal from './authModal';

export default combineReducers({
    auth,
    authModal,
})