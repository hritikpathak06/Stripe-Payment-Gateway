import React, { useState } from "react";
import Products from "./components/Products";
import OrderForm from "./components/OrderForm";
import PayButton from "./components/PayButton";

const App = () => {
  const [cart, setCart] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  console.log("cart: ",cart)

  const handleCheckout = async (tokenId, cart) => {
    try {
      // Send tokenId and cart data to backend to create order
      const response = await fetch("http://localhost:8000/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart.map((item) => item.id),
          token: tokenId,
        }),
      });
      if (response.ok) {
        // Handle successful payment and order creation
        console.log("Order placed successfully!");
      } else {
        // Handle error
        console.error("Error placing order:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


//   console.log("cart: ",cart)

  return (
    <>
      <div>
        {showOrderForm ? (
          <OrderForm
            cart={cart}
            onSubmit={(tokenId) => handleCheckout(tokenId, cart)}
          />
        ) : (
          <Products onAddToCart={addToCart} />
        )}
        {!showOrderForm && cart.length > 0 && (
          <button onClick={() => setShowOrderForm(true)}>
            Proceed to Checkout
          </button>
        )}
      </div>

      <PayButton cart={cart}/>
    </>
  );
};

export default App;
