import React from 'react';
import cls from 'classnames'

import styles from './Grid.scss';

const Col = ({ children, className }) => (
    <div className={cls(styles.col, className)}>
        {children}
    </div>
);

export default Col;