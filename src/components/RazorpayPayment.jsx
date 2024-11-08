// RazorpayPayment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useDispatch } from './../components/CartProvider';
import Razorpay from 'razorpay';

function RazorpayPayment({ amount }) {
  const navigate = useNavigate();
  const cartItems = useCart();
  const dispatch = useDispatch();

  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePayment = async () => {
    setPaymentLoading(true);

    const razorpayOptions = {
      key: 'Jis52si91hZ5Ba', // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paisa (e.g., multiply by 100 for Rupees)
      currency: 'INR', // Currency code
      name: 'pevella bro',
      description: 'Payment for order',
      handler: async (resp) => {
        console.log(resp);
        // Handle success, update backend, etc.
        await handlePaymentSuccess(resp);
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+919876543210',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpayInstance = new Razorpay(razorpayOptions);
    razorpayInstance.open();

    setPaymentLoading(false);
  };

  const handlePaymentSuccess = async (resp) => {
    // Handle success response from Razorpay
    console.log('Payment successful:', resp);

    // Call API to store order details and clear cart
    let userEmail = localStorage.getItem("email");
    let response = await fetch("http://localhost:5000/api/addOrderedItems", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: cartItems,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      console.log("Order added successfully");
      dispatch({ type: "DROP" }); // Clear cart
      navigate('/orders'); // Navigate to orders page
    } else {
      console.error('Failed to add order');
      // Handle error case
    }
  };

  return (
    <div>
      <button
        className="btn btn-success"
        onClick={handlePayment}
        disabled={paymentLoading}
      >
        {paymentLoading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
    </div>
  );
}

export default RazorpayPayment;
