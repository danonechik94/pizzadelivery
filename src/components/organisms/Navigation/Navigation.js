import React, { useState } from 'react';
import cls from 'classnames';

import styles from './Navigation.scss';

const siteNavItems = [
    {
        id: 'Home',
        title: 'Home',
        href: '/',
    },
    {
        id: 'About',
        title: 'About us',
        href: '/about',
    },
];

const Navigation = (props) => {
    const {
        className,
        cartNode,
        profileNode,
    } = props;

    const [toggled, setToggle] = useState(false);
    
    const hamburgerIcon = (
        <div 
            className={cls(
                styles.navigationMobileToggle,
                { [styles['navigationMobileToggle--active']]: toggled }
            )}
            onClick={() => setToggle(!toggled)}
        >
            <div className={styles.hamburger}>
                <div className={styles.hamburgerLine}></div>
            </div>
        </div>
    );

    const navItems = siteNavItems.map(navItem => (
        <li key={navItem.id} className={cls(styles.navigationItem, { [styles['navigationItem--active']]: navItem.href === '/' })}>
            <a className={styles.navigationItemLink} href={navItem.href}>{navItem.title}</a>
        </li>
    ));


    return (
        <div className={cls(className, styles.navigations)}>
            <ul className={cls(styles.navigationList, { [styles['navigationList--active']]: toggled })}>
                {navItems}
                <li className={cls(styles.navigationItem, styles.cartNavigationItem)}>
                    {cartNode}
                </li>
                <li className={styles.profileNavigationItem}>
                    {profileNode}
                </li>
            </ul>
            {hamburgerIcon}
        </div>
    );
};


export default Navigation;
