import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import styles from './StickyComponent.scss';

const StickyComponent = ({ children }) => {
    const [sticky, setSticky] = useState(false);
    const [height, setHeight] = useState(0);

    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            var scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
            setSticky(ref.current.getBoundingClientRect().bottom <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        if (ref.current) {
            setHeight(ref.current.getBoundingClientRect().height);
        }

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    return (
    <div 
        ref={ref}
        className={cls(
            styles.stickyWrapper, 
            { [styles['stickyWrapper--stick']]: sticky }
        )}
        style={{
            height: sticky ? height : 'auto'
        }}
    >
        <div className={styles.stickyInner}>
            { typeof children === 'function' ? children(sticky) : children }
        </div>
    </div>
    );
};

export default StickyComponent;
