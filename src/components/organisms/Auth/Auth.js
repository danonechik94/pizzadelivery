import React, { useState } from 'react';
import styles from './Auth.scss';

import LoginForm from './blocks/LoginForm';
import RegistrationForm from './blocks/RegistrationForm';

const FORM_TYPE = {
    login: 'login',
    registration: 'registration'
};

const CHANGE_FORM_TEXT = {
    [FORM_TYPE.login]: 'Don\'t have an account? Click here.',
    [FORM_TYPE.registration]: 'Have an account? Click here.',
}

const Auth = (props) => {
    const [ activeForm, changeActiveForm ] = useState(FORM_TYPE.login);
    const handleChangeFormClick = () => {
        changeActiveForm(activeForm === FORM_TYPE.login ? FORM_TYPE.registration : FORM_TYPE.login);
    };

    const formNode = activeForm === FORM_TYPE.login ? <LoginForm /> : <RegistrationForm />;

    return (
        <div className={styles.formContainer}>
            {formNode}
            <div className={styles.formSwitcher} >
                <span 
                    className={styles.formSwitcherText} 
                    onClick={handleChangeFormClick}
                >
                    {CHANGE_FORM_TEXT[activeForm]}
                </span>
            </div>
        </div>
    );
};

export default Auth;
