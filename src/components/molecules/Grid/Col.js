import React from 'react';
import cls from 'classnames'

import styles from './Grid.scss';

const Col = ({ children, className, colSpan }) => (
    <div className={cls(styles.col, styles[`col${colSpan}`], className)}>
        {children}
    </div>
);

export default Col;