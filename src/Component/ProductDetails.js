import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { CartContext } from "../App";
import "./ProductDetails.css";

function ProductDetails() {
  const context = useContext(CartContext);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [qty, setQty] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        let temp = data;
        temp.qty = qty;
        setProductDetails(temp);
        setLoader(false);
      });
  }, [id]);
  useEffect(() => {
    let temp = productDetails;
    temp.qty = qty;
    setProductDetails(temp);
  }, [qty]);
  function decrementQty() {
    qty <= 1 ? setQty(1) : setQty(qty - 1);
  }
  return (
    <div className="productDetails">
      <div className="loader">
        <MoonLoader color="blue" loading={loader}></MoonLoader>
      </div>
      <div className="productDetails__left">
        <img
          className="productDetails_img"
          src={productDetails.image}
          alt="Loading Image"
        ></img>
        <div className="productDetails__left_input_btn">
          <strong>Quantity</strong>
          <input type="number" value={qty} readOnly />
          <button
            onClick={() => {
              setQty(qty + 1);
            }}
            className="product__qty"
          >
            +
          </button>
          <button
            onClick={() => {
              decrementQty();
            }}
            className="product__qty"
          >
            -
          </button>
        </div>
        <button
          onClick={() => {
            context.dispatchState({
              type: "addToCart",
              value: { productDetails },
            });
          }}
          className="product__cart"
        >
          ADD TO CART
        </button>
      </div>
      <div className="productDetails__right">
        <h1>{productDetails.title}</h1>
        <p>{productDetails.description}</p>
        <strong>Category : {productDetails.category}</strong>
        <h3>
          Price : <span></span>
          {productDetails.price} $
        </h3>
      </div>
    </div>
  );
}

export default ProductDetails;
