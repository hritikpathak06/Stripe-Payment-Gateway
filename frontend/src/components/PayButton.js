import React from "react";

const PayButton = ({ cart }) => {


    const handleCheckout = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/order/create", {
                method: "POST",
                body: JSON.stringify({cart}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.ok && data.url) {
                window.location.href = data.url;
            } else {
                console.error("Failed to process the order.");
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    

  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default PayButton;
