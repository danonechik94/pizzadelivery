import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './RegistrationForm.scss';
import sharedStyles from '../FormsSharedStyles.scss';

import Button from 'atoms/Button';
import Input from 'atoms/Input';

const renderError = (error) => {
    let errorText = '';
    switch(error.type) {
        case 'required':
            errorText = 'Please fill out this field';
            break;
        case 'validate':
            errorText = 'Passwords should be the same';
            break;
    }

    return (
        <span className={sharedStyles.errorMessage}>
            {errorText}
        </span>
    );
}

const passwordsAreSame = (password) => (repeatedPassword) => {
    return password === repeatedPassword;
};

const RegistrationForm = (props) => {
    const { register, handleSubmit, watch, errors, getValues } = useForm();
    const onSubmit = data => console.log('login', data);

    return (
        <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={sharedStyles.inputWrapper}>
                <Input 
                    name="login" 
                    label="Login"
                    meta={{ error: errors.login }} 
                    inputRef={register({ required: true })} 
                />
                {errors.login && renderError(errors.login)}
            </div>
            <div className={sharedStyles.inputWrapper}>
                <Input 
                    name="password"
                    type="password"
                    label="Password"
                    meta={{ error: errors.password }} 
                    inputRef={register({ required: true })} 
                />
                {errors.password && renderError(errors.password)}
            </div>
            <div className={sharedStyles.inputWrapper}>
                <Input 
                    name="repeatPassword"
                    type="password"
                    label="Repeat Password"
                    meta={{ error: errors.repeatPassword }} 
                    inputRef={register({ 
                        required: true,
                        validate: passwordsAreSame(getValues('password'))
                    })} 
                />
                {errors.repeatPassword && renderError(errors.repeatPassword)}
            </div>
            
            <div className={sharedStyles.submitButtonContainer}>
                <Button className={styles.registerButton} text="Register" type="submit" />
            </div>
        </form>
    );
};

export default RegistrationForm;
