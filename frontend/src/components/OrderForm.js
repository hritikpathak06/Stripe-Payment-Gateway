import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51NjD9BSAwjgzRHfsve8nj5JK5m10kUTkNUElkVCZeF5t24Umby4GwgIO7VGdStTUq7FfNq6Ig57QdnyhXtfykhcN00ivsMtFwY"
);

const OrderForm = ({ cart, onSubmit }) => {
  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <Elements stripe={stripePromise}>
        <PaymentForm onSubmit={onSubmit} />
      </Elements>
    </div>
  );
};

export default OrderForm;
