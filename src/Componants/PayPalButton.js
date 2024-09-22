import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, currency }) => {
  return (
    <PayPalScriptProvider
      options={{
        'client-id': 'ATNMSZcNlTBwtmrJnfV5TpPBFhFv4DwOmA_2k82oEIhfh52sLSrqn3v5hP6YXRVi6NSHG7Ai2Lg7y24P',
        currency: currency,
        intent: 'capture',
        components: 'buttons',
      }}
      deferLoading={true}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // Use the passed amount prop
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};
export default PayPalButton;

