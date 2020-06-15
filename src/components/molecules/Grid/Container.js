import React from 'react';
import cls from 'classnames';
import styles from './Grid.scss';

const Container = ({children, className}) => (
    <div className={cls(styles.container, className)}>
        {children}
    </div>
);

export default Container;