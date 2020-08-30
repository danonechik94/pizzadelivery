import React from 'react';
import { connect } from 'react-redux';

import { cartDataSelector } from '_redux/modules/cart/selectors';

import styles from  './CartList.scss';

const CartList = ({ count, items }) => {
  return (
    <React.Fragment>
      <h3>
        {count} items in cart
      </h3>
      <ul>
        {items.map((item) => (
          <li>
            {item.name} - {item.count}
          </li>
        ))}
      </ul>
      <a>Close</a>
      <a>Clear Cart</a>
    </React.Fragment>
  );
};

CartList.defaultProps = {
  count: 0,
  items: [],
};

export default connect((state) => ({
  ...cartDataSelector(state)
}))(CartList);


