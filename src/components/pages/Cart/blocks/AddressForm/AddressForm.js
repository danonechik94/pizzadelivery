import React from 'react';

import cls from 'classnames';
import styles from './AddressForm.scss';
import commonStyles from '../../Cart.scss';

import Input from 'atoms/Input';
import { Container, Col, Row } from 'molecules/Grid';

const renderError = () => (<div className={commonStyles.errorText}>Error</div>);

const AddressForm = ({ register, errors }) => {

  return (
    <Container className={styles.addressContainer}>
      <Row>
        <Col colSpan={4} className={styles.addressSection}>
          <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--wide'])}>
              <Input 
                  name="address" 
                  label="Address"
                  placeholder="542 W. 15th Street"
                  meta={{ error: errors.address }} 
                  inputRef={register({ required: true })} 
              />
              {errors.address && renderError(errors.address)}
          </div>
        </Col>
        
        <Col colSpan={4} className={styles.addressSection}>
          <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--wide'])}>
              <Input 
                  name="fullName" 
                  label="Full Name"
                  placeholder="John Doe"
                  meta={{ error: errors.fullName }} 
                  inputRef={register({ required: true })} 
              />
              {errors.fullName && renderError(errors.fullName)}
          </div>
        </Col>

        <Col colSpan={4} className={styles.addressSection}>
          <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--wide'])}>
              <Input 
                  name="comments" 
                  label="Comments"
                  placeholder="Write any comments to your order"
                  meta={{ error: errors.comments }} 
                  inputRef={register()} 
              />
              {errors.comments && renderError(errors.comments)}
          </div>
        </Col>
      </Row>
      <Row>
        <Col colSpan={4} className={styles.addressSection}>
          <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--wide'])}>
              <Input 
                  name="phoneNumber" 
                  label="Phone Number"
                  placeholder="+49 000 000 000"
                  meta={{ error: errors.phoneNumber }} 
                  inputRef={register({ required: true })} 
              />
              {errors.phoneNumber && renderError(errors.phoneNumber)}
          </div>
        </Col>

        <Col colSpan={4} className={styles.addressSection}>
          <div className={cls(commonStyles.inputWrapper, commonStyles['inputWrapper--wide'])}>
              <Input 
                  name="email" 
                  label="Email"
                  placeholder="your@email.com"
                  meta={{ error: errors.email }} 
                  inputRef={register()} 
              />
              {errors.email && renderError(errors.email)}
          </div>
        </Col>
      </Row>
    </Container>
  )
};


export default AddressForm;
