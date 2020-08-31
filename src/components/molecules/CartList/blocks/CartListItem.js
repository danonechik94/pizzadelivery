import React from 'react';

import NumberInput from 'atoms/NumberInput';
import Logo from 'icons/Logo';

import styles from  './CartListItem.scss';

const CartListItem = ({ 
  item: {
    count,
    name,
    id,
    type,
    price,
  }, 
  item,
  onAddCount,
  onDeleteCount,
}) => { 
  const handleIncreaseQuantity = (evt) => {
    onAddCount(item);
  };

  const handleDecreaseQuantity = (evt) => {
    onDeleteCount(item);
  };

  const finalPrice = price.base * count;

  return (
    <div className={styles.cartListItem}>
      <Logo className={styles.itemImage} width={42} height={42} />
      <div className={styles.itemInfoContainer}>
        <h3 className={styles.itemTitle}>{name}</h3>
        <div className={styles.itemPriceContainer}>
            <div className={styles.itemPriceWrapper}>
                <div className={styles.priceLabel}>{finalPrice}&nbsp;&euro;</div>
                <NumberInput value={count} onAdd={handleIncreaseQuantity} onSubstract={handleDecreaseQuantity} />
            </div>
        </div>
      </div>
    </div>
  );
};


export default CartListItem;


