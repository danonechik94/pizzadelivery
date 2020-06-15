import React from 'react';
import PropTypes from 'prop-types';

const ICON_SIZE = 24;

function CrossIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 10.94l4.47-4.47a.75.75 0 0 1 1.06 1.06L13.06 12l4.47 4.47a.75.75 0 0 1-1.06 1.06L12 13.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L10.94 12 6.47 7.53a.75.75 0 0 1 1.06-1.06L12 10.94z" />
    </svg>
  );
}

CrossIcon.propTypes = {
  className: PropTypes.string,
};

CrossIcon.ICON_SIZE = ICON_SIZE;

export default CrossIcon;
