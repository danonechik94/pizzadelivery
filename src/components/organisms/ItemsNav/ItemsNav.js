import React from 'react';

import cls from 'classnames';
import styles from './ItemsNav.scss';

import { ScrollLink } from 'react-scroll';
import Logo from 'icons/Logo';

const ScrollCategoryLink = ScrollLink(
    ({children, parentBindings, ...restProps}) => (
        <li {...restProps}>
            {children}
        </li>
    )
);

const ItemsNav = ({ items, visibleItem, className, showLogo }) => {
    const currentItem = visibleItem || items[0];
    // Offset is equals to the default menu height + couple of pixels
    const linkScrollOffset = -78;

    return (
        <div className={cls(styles.contentWrapper, className)}>
            <ul className={cls(styles.categories, { [styles['categories--withLogo']]: showLogo })}>
                {items.map(item => (
                    <ScrollCategoryLink 
                        className={cls(
                            styles.category,
                            { [styles['category--active']]: item.id === currentItem.id }
                        )}
                        key={item.id}
                        to={`category-${item.id}`}
                        smooth={'easeInOutQuint'}
                        offset={linkScrollOffset}
                    >
                        <a className={styles.categoryLink} href={item.href}>{item.title}</a>
                    </ScrollCategoryLink>
                ))}

                {showLogo && (
                    <li className={styles.logoItem}>
                        <Logo width={32} height={32} />
                    </li>
                )}
            </ul>
        </div>
    );
};
    

export default ItemsNav;
