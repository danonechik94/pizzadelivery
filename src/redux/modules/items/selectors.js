import { createSelector } from 'reselect';
import _getFP from 'lodash/fp/get';

export const itemsStateSelector = createSelector(
    _getFP('items'),
    ({ data, ...restItemsState }) => {
        return restItemsState;
    }
);

export const itemsSelector = createSelector(
    _getFP('items.data'),
    itemsData => {
        return itemsData || [];
    }
);