import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../App";
import "./Product.css";

function Product() {
  const [item, seItems] = useState([]);
  const history = useHistory();
  const context = useContext(CartContext);
  let filterdItems = item.filter((i) => {
    return (
      i.title.toLowerCase().indexOf(context.cartSearchState.toLowerCase()) !==
        -1 ||
      i.description
        .toLowerCase()
        .indexOf(context.cartSearchState.toLowerCase()) !== -1 ||
      i.category
        .toLowerCase()
        .indexOf(context.cartSearchState.toLowerCase()) !== -1
    );
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        seItems(data);
      });
  }, []);

  function onClickCart(data) {
    history.push(`/product-details/${data.id}`);
  }

  const handleClick = (value) => {
    let sorted = [...item].sort((a, b) => {
      let isReversed = value === "asc" ? 1 : -1;
      return isReversed == 1 ? a.price - b.price : b.price - a.price;
    });
    seItems(sorted);
  };

  return (
    <div>
      <div>
        <ul className="product__button__div">
          <button onClick={() => handleClick("asc")}>
            <strong> Sort (Price) -- Low to High</strong>
          </button>
          <button onClick={() => handleClick("desc")}>
            <strong> Sort (Price) -- High to Low</strong>
          </button>
        </ul>
      </div>
      <div className="product_start">
        {filterdItems.map((data, index) => {
          return (
            <div
              onClick={() => {
                onClickCart(data);
              }}
              className="product"
              key={index}
            >
              <h3>{data.title}</h3>
              <p className="product__desc">{data.description}</p>
              <div>
                <strong>Category : {data.category} -- </strong>
                <strong style={{ color: "red" }}>{data.price} $</strong>
              </div>
              <img src={data.image} alt="Image"></img>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
