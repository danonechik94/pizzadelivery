import React from 'react';

import Button from 'atoms/Button';
import Logo from 'icons/Logo';

import styles from './ItemCard.scss';

const ItemCard = ({ 
    data: {
        name, 
        description, 
        type, 
        items, 
        price,
    },
    data,
    count,
    onChooseClick 
}) => {
    const handleChooseClick = (evt) => {
        onChooseClick(evt, data);
    };

    return (
        <div className={styles.productCard}>
            {count ? (
                <React.Fragment>
                    <div 
                        className={styles.countContainer} 
                        title={`There is ${count} of ${name} in your cart`} 
                    />
                    <span className={styles.countNumber}>{count}</span>
                </React.Fragment>
                
            ) : null}
            <Logo className={styles.productImage} width={128} height={128} />
            <div className={styles.infoContainer}>
                <h3 className={styles.productTitle}>{name}</h3>
                <p className={styles.ingredientsListLabel}>{description}</p>
                {type === 'combo' && (
                    <ul className={styles.ingredientsList}>
                        {items.map(item => {
                            return (
                            <li key={item.id}>{item.name}</li>
                            );
                        })}
                    </ul>
                )}
                <div className={styles.priceContainer}>
                    <div className={styles.priceWrapper}>
                        <div className={styles.priceLabel}>{price.base}&nbsp;&euro;</div>
                        <Button 
                            className={styles.buyButton} 
                            onClick={handleChooseClick}
                            text={{
                                desktopText: 'Choose',
                                mobileText: <React.Fragment>{price.base}&nbsp;&euro;</React.Fragment>,
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};
    

export default ItemCard;
