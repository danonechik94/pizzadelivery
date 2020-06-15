import React from 'react';
import cls from 'classnames';
import styles from './Grid.scss';

const Row = ({children, className}) => (
    <div className={cls(styles.row, className)}>
        {children}
    </div>
);

export default Row;