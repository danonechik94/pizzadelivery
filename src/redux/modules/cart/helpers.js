import getDataAdapter from './adapters';

const CART_DATA_KEY_NAME = 'cartData';
const dataAdapter = getDataAdapter();

export const getStoredCartData = () => {
    return dataAdapter.getData(CART_DATA_KEY_NAME);
};

export const saveCartData = (data) => {
    return dataAdapter.saveData(CART_DATA_KEY_NAME, data);
};