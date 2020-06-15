import React from 'react';
import styles from './Footer.scss';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
        <div className={styles.contentWrapper}>
            <nav className={styles.footerRow} aria-label="Web site navigation">
                <ul className={styles.navigation}>
                    <li className={styles.navigationItem}><a href="/">Home</a></li>
                    <li className={styles.navigationItem}><a href="/contacts">Contacts</a></li>
                    <li className={styles.navigationItem}><a href="/jobs">Jobs</a></li>
                </ul>
                <div className={styles.contacts}>
                    <a className={styles.contactsItem} href="tel:+4982323223">+49&nbsp;823&nbsp;232&nbsp;23</a>
                    <a className={styles.contactsItem} href="email:pizzadelivery@pizza.com">pizzadelivery@pizza.com</a>
                </div>
            </nav>

            <hr className={styles.separator}/>
            <span className={styles.copyright}>
                <strong>Pizza Delivery</strong> @ 2020
            </span>
        </div>
    </footer>
  );
};

export default Footer;
