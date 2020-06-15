import React from 'react';

import styles from './Profile.scss';
const Profile = ({
  auth,
  showAuth,
}) => {
  
  console.log(auth);
  return (
    <span className={styles.profile} onClick={showAuth}>
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className={styles.profileIcon}
        >
            <path
                fill="#000000"
                fillRule="evenodd"
                d="M7.09 12.59L8.5 14l5-5-5-5-1.41 1.41L9.67 8H0v2h9.67l-2.58 2.59zM16 0H2C.89 0 0 .9 0 2v4h2V2h14v14H2v-4H0v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
            />
        </svg>
        <span className={styles.profileLabel}>Login</span>
    </span>
  );
};

export default Profile;
