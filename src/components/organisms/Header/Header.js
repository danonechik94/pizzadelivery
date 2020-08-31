import React, { useRef } from 'react';

import Logo from 'icons/Logo';
import Cross from 'icons/Cross';
import Tooltip from 'atoms/Tooltip';
import Cart from 'molecules/Cart';
import CartList from 'molecules/CartList';
import Navigation from 'organisms/Navigation';
import Profile from 'organisms/Profile';


import styles from './Header.scss';

const ADAPTIVE_THRESHOLD = 767;

const Header = ({ 
  showAuth, 
  auth, 
}) => {
  const tooltipRef = useRef(null);

  const handleCartClick = (evt) => {
    if (window.innerWidth > ADAPTIVE_THRESHOLD) {
      evt.preventDefault();
      tooltipRef.current.show(evt.currentTarget.getBoundingClientRect(), false);
    }
    // Do not show the tooltip and just follow the cart link
  };

  const handleCloseCartClick = () => {
    tooltipRef.current.hide();
  };

  const profileNode = <Profile auth={auth} showAuth={showAuth} />;
  const cartNode = <Cart onCartClick={handleCartClick} />;

  return (
    <header className={styles.header}>
        <nav className={styles.headerNav} aria-label="Web site navigation">
            <a className={styles.headerLogo} href="/" aria-label="Pizza Delivery Logo">
              <Logo className={styles.logoIcon} />
            </a>

            <Tooltip ref={tooltipRef} type="bottom-right">
              <div className={styles.cartListContainer}>
                <CartList isCompact={true} />
                <div className={styles.closeIconContainer} onClick={handleCloseCartClick}>
                 <Cross className={styles.closeIcon} />
                </div>
              </div>
            </Tooltip>
            <Navigation
              profileNode={profileNode}
              cartNode={cartNode}
            />
        </nav>
    </header>
  );
};

export default Header;
