import React from 'react';
import cls from 'classnames';
import styles from './Button.scss';

const Button = ({ text, className, type = 'button', size = 'medium', ...restProps }) => (
    <button className={cls(styles.button, className, styles[`button--${size}`])} type={type} {...restProps}>
        {text.mobileText ? (
            <React.Fragment>
                <span className={styles.desktopText}>{text.desktopText}</span>
                <span className={styles.mobileText}>{text.mobileText}</span>
            </React.Fragment>
        ) : (
            <span className={styles.text}>{text}</span>
        )}
    </button>
);

Button.defaultProps = {
    onClick: () => {}
};

export default Button;
