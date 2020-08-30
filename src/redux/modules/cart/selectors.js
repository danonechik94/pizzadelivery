import { createSelector } from 'reselect';
import _getFP from 'lodash/fp/get';

export const cartDataSelector = createSelector(
    _getFP('cart'),
    (cartData) => {
        return cartData || { count: 0, items: [] };
    }
);