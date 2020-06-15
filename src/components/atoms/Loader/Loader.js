import React from 'react';
import cls from 'classnames';
import styles from './Loader.scss';

const Loader = (props) => (
    <div className={styles.loader}>
        <span className={cls(styles.loaderItem, styles.loaderItemFirst)} />
        <span className={cls(styles.loaderItem, styles.loaderItemSecond)} />
        <span className={cls(styles.loaderItem, styles.loaderItemThird)} />
    </div>
);

export default Loader;
