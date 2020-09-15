import React from 'react';
import { useForm } from 'react-hook-form';

import cls from 'classnames';
import styles from './Cart.scss';


import Button from 'atoms/Button';
import CartList from 'molecules/CartList';
import AddressAndContactForm from './blocks/AddressForm';
import PaymentForm from './blocks/PaymentForm';
import { Container, Col, Row } from 'molecules/Grid';


const CartPage = () => {


  const auth = null;
  const deliveryTotal = 0;
  const itemsTotal = 0;
  const orderTotal = 0;
  const { register, handleSubmit, errors } = useForm();

  const renderServerErrors = () => {
    // TODO render server errors here
  };

  const handleOrderSubmit = (evt) => {
    handleSubmit(evt);
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Make your order</h1>
      <CartList />
      <form className={styles.orderContainer} onSubmit={handleOrderSubmit}>
        <div className={styles.cartAddress}>
          <h2>Delivery and Contact</h2>
          <AddressAndContactForm register={register} errors={errors} />
        </div>
        <div className={styles.cartPayment}>
          <h2>Payment Details</h2>
          <Container>
            <Row>
              <Col colSpan={6} className={styles.orderPaymentSummary}>
                <div className={cls(styles.paymentItem, styles.summaryItem)}>
                  <span className={styles.label}>Items Total:</span> {itemsTotal}
                </div>
                <div className={cls(styles.paymentItem, styles.summaryItem)}>
                  <span className={styles.label}>Delivery Total:</span> {deliveryTotal}
                </div>
                <div className={cls(styles.total, styles.summaryItem)}>
                  <span className={styles.label}>Order Total:</span> {orderTotal}
                </div>
              </Col>
              <Col colSpan={6} className={styles.orderPaymentData}>
                <PaymentForm register={register} errors={errors} />
              </Col>
            </Row>
          </Container>
        </div>
        
        <div className={styles.submitOrderContainer}>
          <Button className={styles.submitOrderButton} text="Make Order" type="submit" ></Button>
          <div className={styles.errorsContainer}>
            {renderServerErrors()}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CartPage;
