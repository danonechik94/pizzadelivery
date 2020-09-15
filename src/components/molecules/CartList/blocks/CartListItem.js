import React from 'react';

import NumberInput from 'atoms/NumberInput';
import Logo from 'icons/Logo';

import cls from 'classnames'
import styles from  './CartListItem.scss';

const CartListItem = ({ 
  item: {
    count,
    name,
    description,
    id,
    items,
    type,
    price,
  }, 
  item,
  isCompact,
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
      <div className={cls(styles.itemInfoContainer, { [styles['itemInfoContainer--compact']]: isCompact })}>
        <div className={styles.itemTextContainer}>
          <h3 className={styles.itemTitle}>{name}</h3>
          {!isCompact ? (
            <p className={styles.itemDescription}>
              {description}
              {type === 'combo' && (<div>{items.map((comboItem) => comboItem.name).join(', ')}</div>)}
            </p>
          ) : null}
        </div>
        
        <div className={styles.itemPriceContainer}>
            <div className={styles.itemPriceWrapper}>
                <div className={styles.priceLabel}>{finalPrice}&nbsp;&euro;</div>
                <NumberInput value={count} onAdd={handleIncreaseQuantity} onSubstract={handleDecreaseQuantity} className={styles.numberInputControl} />
            </div>
        </div>
      </div>
    </div>
  );
};


export default CartListItem;


