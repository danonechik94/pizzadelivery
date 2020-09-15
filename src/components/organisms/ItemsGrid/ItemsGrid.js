import React, { useRef, useState } from 'react';

import { Container, Col, Row } from 'molecules/Grid';
import ItemCard from './blocks/ItemCard';

import cls from 'classnames';
import styles from './ItemsGrid.scss';


// TODO move tooltip out of the grid and use app state to show selected count
const ItemsGrid = ({ data, cartData, onChooseItem }) => {

    // TODO automatically add one item to cart if none is present for this item
    const handleItemChooseClick = (evt, data) => {
        const clickItemBoundingRect = evt.currentTarget.getBoundingClientRect();
        onChooseItem(data, clickItemBoundingRect);
    };

    return (
        <Container>
            <Row>
                {data.map(item => {
                    const itemCardProps = {
                        data: item,
                        onChooseClick: handleItemChooseClick
                    };

                    const { items } = cartData;
                    const cartItem = items.find((cartItem) => cartItem.id === item.id);

                    if (cartItem && cartItem.count) {
                        itemCardProps.count = cartItem.count;
                    }

                    return (
                        <Col key={`${item.id}_col`} className={styles.itemCol}>
                            <ItemCard {...itemCardProps} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};
    

export default ItemsGrid;
