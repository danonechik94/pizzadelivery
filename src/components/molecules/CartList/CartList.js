import React from 'react';
import { connect } from 'react-redux';

import { cartDataSelector } from '_redux/modules/cart/selectors';

import { 
  addToCart,
  deleteFromCart, 
  clearCart,
} from '_redux/modules/cart/actions';
 
import CartListItem from './blocks/CartListItem';

import cls from 'classnames';
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

  const handleClearCartClick = (evt) => {
    evt.preventDefault();
    dispatch(clearCart());
  };

  return (
    <div className={cls(styles.cartListContainer, { [styles['cartListContainer--compact']]: isCompact })}>
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

      {count > 0 ? (
        <div className={styles.cardListActionsContainer}>
          <a 
            className={styles.cardListAction} 
            onClick={handleClearCartClick}
          >
            Clear Cart
          </a>

          <a 
            className={styles.cardListAction} 
            href="/cart"
          >
            Go to Cart
          </a>
        </div>
      ) : null}
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


