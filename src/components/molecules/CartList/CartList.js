import React from 'react';
import { connect } from 'react-redux';

import { cartDataSelector } from '_redux/modules/cart/selectors';

import { 
  addToCart,
  deleteFromCart, 
} from '_redux/modules/cart/actions';
 
import CartListItem from './blocks/CartListItem';

import styles from  './CartList.scss';

const CartList = ({ 
  count, 
  isCompact,
  items, 
  dispatch 
}) => {

  const handleAddItemCount = (item) => {
    dispatch(addToCart(item));
  };

  const handleDeleteItemCount = (item) => {
    dispatch(deleteFromCart(item));
  };

  return (
    <div className={styles.cartListContainer}>
      <h3 className={styles.cartListTitle}>
        {count} items in cart
      </h3>
      <ul className={styles.cartList}>
        {items.map((item) => (
          <li className={styles.cartListItem}>
            <CartListItem 
              isCompact={isCompact}
              item={item} 
              onAddCount={handleAddItemCount} 
              onDeleteCount={handleDeleteItemCount} 
            />
          </li>
        ))}
      </ul>
      <a>Close</a>
      <a>Clear Cart</a>
    </div>
  );
};

CartList.defaultProps = {
  count: 0,
  items: [],
};

export default connect((state) => ({
  ...cartDataSelector(state)
}))(CartList);


