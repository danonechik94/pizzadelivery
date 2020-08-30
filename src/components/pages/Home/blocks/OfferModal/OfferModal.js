import React, { useState } from 'react';

import cls from 'classnames';
import styles from './OfferModal.scss';

import { CSSTransition } from 'react-transition-group';
import Modal from 'molecules/Modal';
import Button from 'atoms/Button';
import Logo from 'icons/Logo';

const ADDED_TEXT_DISAPPEAR_TIMEOUT = 3000;

const OfferModal = ({ 
  onOfferModalClose, 
  onOfferChoose,
  data: {
    title,
    description,
    price,
  } = {},
  data, 
  isOpen 
}) => {
  if (!isOpen) {
    return null;
  }

  const [showAddedItemText, setShowAddedItemText] = useState(false);

  const handleOfferChooseClick = () => {
    setShowAddedItemText(true);
    setTimeout(() => {
      setShowAddedItemText(false);
    }, ADDED_TEXT_DISAPPEAR_TIMEOUT);
    onOfferChoose(data);
  };

  const actionNode = showAddedItemText ?
    <span className={styles.addedItemText}>Added to Cart</span> :
    (
      <Button 
        className={styles.buyButton} 
        onClick={handleOfferChooseClick}
        text={(
          <span>Buy for {price.base}&nbsp;&euro;</span>
        )} 
      />
    );

  // change Modal prop names 
  return (
    <Modal open={isOpen} closeModal={onOfferModalClose}>
      <div className={styles.offerItem}>
        <Logo className={styles.offerImage} width={128} height={128} />
        <div className={styles.offerInfoContainer}>
            <h3 className={styles.offerTitle}>{title}</h3>
            <p className={styles.offerDescription} dangerouslySetInnerHTML={{ __html: description }} />

            <div className={styles.priceContainer}>
                <div className={styles.priceWrapper}>
                  {actionNode}
                </div>
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default OfferModal;
