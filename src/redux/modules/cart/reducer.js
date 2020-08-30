import T from './types';

import { 
  getStoredCartData, 
  saveCartData 
} from './helpers';

const defaultInitialState = {
  count: 0,
  items: [],
};

const initialState = getStoredCartData() || defaultInitialState;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.CART_ADD: {
      const {
        count,
        items,
      } = state;

      const { itemData } = action;
      let newItems = [];

      const existingItem = items.find((item) => item.id === itemData.id);
      if (existingItem) {
        existingItem.count += 1;
        newItems = items;
      } else {
        newItems = [...items, { ...itemData, count: 1 }];
      }

      const newCartData = {
        count: count + 1,
        items: newItems
      };
      saveCartData(newCartData);
      return {
        ...newCartData
      };
    }

    case T.CART_DELETE: {
      const {
        count,
        items,
      } = state;

      const { itemData } = action;
      let newItems = [];

      const existingItem = items.find((item) => item.id === itemData.id);
      if (existingItem.count === 1) {
        const existingItemIndex = items.findIndex((item) => item.id === itemData.id);
        items.splice(existingItemIndex);
        newItems = items;
      } else {
        existingItem.count -= 1;
        newItems = items;
      }

      const newCartData = {
        count: count - 1,
        items: newItems,
      };
      saveCartData(newCartData);

      return {
        ...newCartData,
      };
    }

    case T.CART_CLEAR: {
      return {
        ...defaultInitialState
      };
    }

    default: {
      return state;
    }
  }
};