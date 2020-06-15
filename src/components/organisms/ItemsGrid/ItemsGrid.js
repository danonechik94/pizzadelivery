import React from 'react';

import { Container, Col } from 'molecules/Grid';
import Button from 'atoms/Button';
import Logo from 'icons/Logo';

import styles from './ItemsGrid.scss';

const ItemsGrid = ({ data }) => {

    const renderItem = (data) => (
        <div className={styles.productCard}>
            <Logo className={styles.productImage} width={128} height={128} />
            <div className={styles.infoContainer}>
                <h3 className={styles.productTitle}>{data.title}</h3>
                <p className={styles.ingredientsListLabel}>{data.description}</p>
                {data.type === 'combo' && (
                    <ul className={styles.ingredientsList}>
                        {data.items.map(item => {
                            return (
                            <li key={item.id}>{item.name}</li>
                            );
                        })}
                    </ul>
                )}
                <div className={styles.priceContainer}>
                    <div className={styles.priceWrapper}>
                        <div className={styles.priceLabel}>{data.price.base}&nbsp;&euro;</div>
                        <Button 
                            className={styles.buyButton} 
                            text={{
                                desktopText: 'Choose',
                                mobileText: <React.Fragment>{data.price.base}&nbsp;&euro;</React.Fragment>,
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Container>
            {data.map(item => (
                <Col key={`${item.id}_col`}>
                    {renderItem(item)}
                </Col>
            ))}
        </Container>
    );
};
    

export default ItemsGrid;
