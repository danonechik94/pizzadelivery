import React, { useState } from 'react';
import styles from './Auth.scss';

import LoginForm from './blocks/LoginForm';
import RegistrationForm from './blocks/RegistrationForm';

const FORM_TYPE = {
    login: 'login',
    registration: 'registration'
};

const Auth = (props) => {
    const [ activeForm, changeActiveForm ] = useState(FORM_TYPE.login);
    const handleChangeFormClick = () => {
        changeActiveForm(activeForm === FORM_TYPE.login ? FORM_TYPE.registration : FORM_TYPE.login);
    };

    const formNode = activeForm === FORM_TYPE.login ? <LoginForm /> : <RegistrationForm />;

    return (
        <div className={styles.formContainer}>
            {formNode}
            <div className={styles.formSwitcher} onClick={handleChangeFormClick}>
                Change Form Type
            </div>
        </div>
    );
};

export default Auth;
