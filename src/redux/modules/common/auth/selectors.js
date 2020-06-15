import { createSelector } from 'reselect';
import _getFP from 'lodash/fp/get';

export const authSelector = createSelector(
    _getFP('common.auth'),
    (auth) => {
        // TODO divide auth data in a smart way
        return auth;
    }
);
