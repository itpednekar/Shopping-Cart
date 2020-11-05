import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../App";
import "./Cart.css";
import Subtotal from "./Subtotal";
function Cart() {
  const context = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(context.cartProductState);
  }, [context.cartProductState]);

  let subTotal = 0;
  cartItems.forEach((element) => {
    subTotal = subTotal + element.price * element.qty;
  });
  const removeFromCart = (data) => {
    context.dispatchState({
      type: "removeFromCart",
      id: data.id,
    });
  };

  return (
    <div className="cart">
      <div className="cart__contains">
        {context.cartProductState.length !== 0 ? (
          <h1>Place Your Order!</h1>
        ) : (
          <h1>Your cart is Empty :(</h1>
        )}
        {cartItems.map((data, index) => {
          return (
            <div className="cart__contains__map" key={index}>
              <h3 classNmae="product__title">{data.title}</h3>
              <p className="product__desc">{data.description}</p>
              <strong>{data.price} $</strong>
              <strong>Quantity : {data.qty} </strong>
              <img src={data.image} alt="Image"></img>
              <br />
              <button
                onClick={() => {
                  removeFromCart(data);
                }}
              >
                REMOVE
              </button>
            </div>
          );
        })}
      </div>
      {context.cartProductState.length !== 0 && (
        <div className="cart__receipt">
          <Subtotal subTotal={subTotal} />
        </div>
      )}
    </div>
  );
}

export default Cart;
