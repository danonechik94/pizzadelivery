import React from 'react';
import cls from 'classnames';
import styles from './NumberInput.scss';

const NumberInput = ({ value, onAdd, onSubstract, className }) => (
    <div className={cls(styles.numberInputContainer, className)}>
        <button className={cls(styles.numberInput, styles.numberMinus)} onClick={onSubstract}>-</button>
        <span className={styles.numberValue}>{value}</span>
        <button className={cls(styles.numberInput, styles.numberPlus)} onClick={onAdd}>+</button>
    </div>
);


export default NumberInput;
