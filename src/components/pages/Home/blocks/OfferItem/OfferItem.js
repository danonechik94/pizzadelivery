import React from 'react';

import cls from 'classnames';
import styles from './OfferItem.scss';

import Logo from 'icons/Logo';

const OfferItem = ({ 
  onOfferClick, 
  className,
  data: {
    description,
  },
  data, 
}) => {

  const handleOfferClick = () => {
    onOfferClick(data);
  }

  return (
    <div className={cls(styles.offer, className)} onClick={handleOfferClick}>
      <h2 className={styles.offerTitle} dangerouslySetInnerHTML={{ __html: description }} />
      <Logo className={styles.offerIcon} width={150} height={150} />
    </div>
  );
};

export default OfferItem;
