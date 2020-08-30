import React, { useState } from 'react';

import Button from 'atoms/Button';
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
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);


  // TODO come up with better names 
  const handleAddItemCount = () => {
    onAddCount(item);
  };

  const handleDeleteItemCountWithCheck = () => {
    if (item.count === 0) {
      setShowDeleteWarning(true);
    } else {
      handleDeleteItemCount();
    }
    
  };

  const handleDeleteItemCount = () => {
    setShowDeleteWarning(false);
    onDeleteCount(item);
  };

  const handleCancelButtonClick = () => {
    setShowDeleteWarning(false);
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
                <NumberInput value={count} onAdd={handleAddItemCount} onSubstract={handleDeleteItemCount} />
                {showDeleteWarning ? (
                  <div className={styles.warningContainer}>
                    <span>Are you sure you want to delete {name} from your cart?</span>
                    <div className={styles.warningActionsContainer}>
                      <Button onClick={handleDeleteItemCount} text={'Ok'} />
                      <Button onClick={handleCancelButtonClick} text={'Cancel'} />
                    </div>
                  </div>
                  
                ) : null}
            </div>
        </div>
      </div>
    </div>
  );
};


export default CartListItem;


