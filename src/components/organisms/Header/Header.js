import React from 'react';

import Logo from 'icons/Logo';
import Cart from 'molecules/Cart';
import Navigation from 'organisms/Navigation';
import Profile from 'organisms/Profile';

import styles from './Header.scss';

const Header = ({ showAuth, auth }) => {

  const profileNode = <Profile auth={auth} showAuth={showAuth} />;
  const cartNode = <Cart />;

  return (
    <header className={styles.header}>
        <nav className={styles.headerNav} aria-label="Web site navigation">
            <a className={styles.headerLogo} href="/" aria-label="Pizza Delivery Logo">
              <Logo className={styles.logoIcon} />
            </a>

            <Navigation
              profileNode={profileNode}
              cartNode={cartNode}
            />
        </nav>
    </header>
  );
};

export default Header;
