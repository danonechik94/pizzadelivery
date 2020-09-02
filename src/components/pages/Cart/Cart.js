import React, { createRef } from 'react';
import { connect } from 'react-redux';

import cls from 'classnames';
import styles from './Cart.scss';

import { cartDataSelector } from '_redux/modules/cart/selectors';

import { 
  addToCart,
  deleteFromCart, 
} from '_redux/modules/cart/actions';

import CartList from 'molecules/CartList';
import AddressForm from './blocks/AddressForm';

class CartPage extends React.PureComponent {
  render() {
    const auth = null;

    return (
      <div className={styles.cartContainer}>
        <CartList />

        <div className={styles.cartAddress}>
          <h2>Delivery Address</h2>
          {auth ? null: <span>Log In</span>}
          <AddressForm />
        </div>

        <div className={styles.cartPayment}>
          <h2>Payment</h2>
          <AddressForm />
        </div>
      </div>
    );
  }
}

export default CartPage;
