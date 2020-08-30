import T from './types';

export const addToCart = (itemData) => {
  return {
    type: T.CART_ADD,
    itemData,
  }
};

export const deleteFromCart = (itemData) => {
  return {
    type: T.CART_DELETE,
    itemData,
  }
};

export const clearCart = () => {
  return {
    type: T.CART_CLEAR,
  }
};