import React from 'react';
import { useForm } from 'react-hook-form';

import styles from './LoginForm.scss';
import sharedStyles from '../FormsSharedStyles.scss';

import Button from 'atoms/Button';
import Input from 'atoms/Input';

const renderError = (error) => {
    let errorText = '';
    switch(error.type) {
        case 'required':
            errorText = 'This field is required';
            break;
    }

    return (
        <span className={sharedStyles.errorMessage}>
            {errorText}
        </span>
    );
}

const LoginForm = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log('login', data);
    
    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
            
            <div className={sharedStyles.submitButtonContainer}>
                <Button className={styles.loginButton} text="Login" type="submit" />
            </div>
        </form>
    );
};

export default LoginForm;
