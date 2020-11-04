import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../App";
import "./Subtotal.css";

function Subtotal({ subTotal }) {
  const context = useContext(CartContext);
  const histoty = useHistory();
  const placeOrder = () => {
    histoty.push("/place-order");
  };
  return (
    <div className="subtotal">
      <h3>Subtotal ({context.cartProductState.length} items) </h3>
      <strong>Price : {subTotal.toFixed(2)} $</strong>
      <br />
      <button onClick={placeOrder}>PLACE ORDER</button>
    </div>
  );
}

export default Subtotal;
