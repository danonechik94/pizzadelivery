import React, { createRef } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';

import cls from 'classnames';
import styles from './PaymentForm.scss';
import commonStyles from '../../Cart.scss';

import Input from 'atoms/Input';


const PaymentForm = ({ register, errors }) => {
  const { 
    meta, 
    getCardNumberProps, 
    getExpiryDateProps, 
    getCVCProps,
  } = usePaymentInputs();

  const handleChangeCVC = () => {};
  const handleChangeExpiryDate = () => {};
  const handleChangeCardNumber = () => {};

  
  return (
    <div>
      <div>
        <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--wide'])}>
              <Input 
                  name="cardNumber" 
                  label="Card Number"
                  placeholder="0000 0000 0000 0000"
                  meta={{ error: errors.cardNumber }} 
                  inputRef={register({ 
                    required: true,
                  })} 
                  {...getCardNumberProps()} 
              />
              {errors.cardNumber && renderError(errors.cardNumber)}
          </div>
      </div>
      <div>
        <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--inline'])}>
              <Input 
                  name="expDate" 
                  label="Card Expiry Date"
                  placeholder="07/23"
                  meta={{ error: errors.expDate }} 
                  inputRef={register({ 
                    required: true,
                  })} 
                  {...getExpiryDateProps()} 
              />
              {errors.expDate && renderError(errors.expDate)}
          </div>
      
          <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--inline'])}>
              <Input 
                  name="cvv" 
                  label="CVV"
                  type="password"
                  placeholder="***"
                  meta={{ error: errors.cvv }} 
                  inputRef={register({ 
                    required: true,
                  })} 
                  {...getCVCProps()} 
              />
              {errors.cvv && renderError(errors.cvv)}
          </div>
      </div>
    </div>
          
       
          
  )
};


export default PaymentForm;
