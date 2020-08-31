import React from 'react';
import PropTypes from 'prop-types';

import cls from 'classnames';
import 'react-alice-carousel/lib/alice-carousel.css';
import './alice-carousel-custom.css';
import styles from './Gallery.scss';

import AliceCarousel from 'react-alice-carousel'

const DEFAULT_CAROUSEL_OPTIONS = {
  buttonsDisabled: true,
  dotsDisabled: true,
  infinite: true,
  responsive: {
    768: {
      autoPlay: true,
      stopAutoPlayOnHover: true,
    }
  },
  stagePadding: {
    paddingLeft: 20,
    paddingRight: 20
  }
};

const Gallery = (props) => {
  const { 
    items,
    galleryOptions,
    childrenClassNames: {
      slideClassName
    }
  } = props;

  return (
    <AliceCarousel {...DEFAULT_CAROUSEL_OPTIONS} {...galleryOptions}>
        {items.map((item, index) => (
          <div className={cls(styles.slide, slideClassName)} key={`item_${item.id || index}`}>
            {item}
          </div>
        ))}
    </AliceCarousel>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object
  ])),
  childrenClassNames: PropTypes.shape({
    slideClassName: PropTypes.string,
  }),
  galleryOptions: PropTypes.shape({
    buttonsDisabled: PropTypes.boolean,
    dotsDisabled: PropTypes.boolean,
    infinite: PropTypes.boolean,
    stagePadding: PropTypes.shape({
      paddingLeft: PropTypes.number,
      paddingRight: PropTypes.number,
    })
  })
};

Gallery.defaultProps = {
  childrenClassNames: {},
};

export default Gallery;
