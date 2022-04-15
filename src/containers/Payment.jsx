import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Payment.css';
import AppContext from '../context/AppContext';

function Payment() {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const paypalOptions = {
    clientId:
      'access_token$sandbox$pcvgyq53z72h3tbf$cca2f1110dabc5cdacde318131a7be43',
    intent: 'capture',
    currency: 'USD',
  };
  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };
  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };
  const navigate = useNavigate();
  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder, navigate('/checkout/success'));
    }
  };
  return (
    <section className="Payment">
      <section className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <section className="Payment-item" key={item.title}>
            <section className="Payment-element">
              <span> $ {item.price}</span>
            </section>
          </section>
        ))}
        <section className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => 'START PAYMENT'}
            onSuccess={handlePaymentSuccess}
            onError={(error) => error}
            onCancel={(data) => data}
          />
        </section>
      </section>
      <section />
    </section>
  );
}

export default Payment;
