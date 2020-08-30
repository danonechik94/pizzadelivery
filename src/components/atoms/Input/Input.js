import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import styles from './Input.scss';

const Input = ({ 
    value, 
    name, 
    label,
    meta, 
    inputRef,
    className, 
    type = "text",
}) => {
    const labelClasses = cls(
        {
            [styles['label--error']]: meta.error,
            [styles['label--disabled']]: meta.disabled,
        }
    );
    const inputClasses = cls(
        {
            [styles['input--error']]: meta.error,
            [styles['input--disabled']]: meta.disabled,
        }
    );

    const inputNode = (
        <input 
            className={cls(styles.input, className, inputClasses)}
            name={name} 
            value={value} 
            type={type}
            ref={inputRef} 
        />
    );
    
    if (label) {
        return  (
            <label for={name} className={cls(styles.label, labelClasses)}>
                <span className={styles.labelText}>
                    {label}
                </span>
                {inputNode}
            </label>
        );
    }

    return inputNode;
};

Input.prototype = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOf([PropTypes.node, PropTypes.string]),

};

Input.defaultProps = {
    meta: {}
};

export default Input;
