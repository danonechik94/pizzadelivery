import React, { createRef } from 'react';
import { useForm } from 'react-hook-form';

import cls from 'classnames';
import styles from './AddressForm.scss';

import Input from 'atoms/Input';

const renderError = () => 'Error';

const AddressForm = ({  }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.addressRow}>
        <div className={styles.addressSection}>
          <div className={cls(styles.inputWrapper, styles['inputWrapper--wide'])}>
              <Input 
                  name="street" 
                  label="Street"
                  meta={{ error: errors.street }} 
                  inputRef={register({ required: true })} 
              />
              {errors.street && renderError(errors.street)}
          </div>
        </div>
        
        <div className={styles.addressSection}>
          <div className={styles.inputWrapper}>
              <Input 
                  name="building" 
                  label="Building"
                  meta={{ error: errors.building }} 
                  inputRef={register({ required: true })} 
              />
              {errors.building && renderError(errors.building)}
          </div>
          <div className={styles.inputWrapper}>
              <Input 
                  name="apartmentpt" 
                  label="Apartment"
                  meta={{ error: errors.apartmentpt }} 
                  inputRef={register({ required: true })} 
              />
              {errors.apartmentpt && renderError(errors.apartmentpt)}
          </div>
        </div>
      </div>

      <div className={styles.addressRow}>
        <div className={styles.addressSection}>
          <div className={cls(styles.inputWrapper, styles['inputWrapper--wide'])}>
              &nbsp;
          </div>
        </div>
        
        <div className={styles.addressSection}>
          <div className={styles.inputWrapper}>
              <Input 
                  name="entranceNo" 
                  label="Entrance No"
                  meta={{ error: errors.entranceNo }} 
                  inputRef={register({ required: true })} 
              />
              {errors.entranceNo && renderError(errors.entranceNo)}
          </div>
          <div className={styles.inputWrapper}>
              <Input 
                  name="storey" 
                  label="Storey"
                  meta={{ error: errors.storey }} 
                  inputRef={register({ required: true })} 
              />
              {errors.storey && renderError(errors.storey)}
          </div>
        </div>
      </div>
      

    </form>
  )
};


export default AddressForm;
