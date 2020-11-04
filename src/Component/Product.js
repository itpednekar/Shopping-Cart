import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../App";
import "./Product.css";
import { MoonLoader } from "react-spinners";

function Product() {
  const [item, seItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const history = useHistory();
  const context = useContext(CartContext);
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        seItems(data);
        setLoader(false);
      });
  }, []);
  function onClickCart(data) {
    history.push(`/product-details/${data.id}`);
  }

  const onChangeOrderBy = (e) => {
    let sorted = [...item].sort((a, b) => {
      let isReversed = e.target.value === "asc" ? 1 : -1;
      return isReversed == 1 ? a.price - b.price : b.price - a.price;
    });
    seItems(sorted);
  };
  const onChangeCategory = (e) => {
    if (e.target.value) {
      let data = allProducts.filter((i) => {
        return i.category.toLowerCase() === e.target.value.toLowerCase();
      });
      seItems(data);
    } else {
      seItems(allProducts);
    }
  };
  return (
    <div>
      <div className="product__button__div">
        <label>
          <strong>Order By</strong>
        </label>
        <select onChange={onChangeOrderBy} placeholder="Select">
          <option value="">Select</option>
          <option value="asc">Low To High</option>
          <option value="desc">High To Low</option>
        </select>
        <label>
          <strong>Category</strong>
        </label>
        <select onChange={onChangeCategory}>
          <option value="">All</option>
          <option value="men clothing">Men Clothing</option>
          <option value="women clothing">Women Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <div className="loader">
        <MoonLoader color="blue" loading={loader}></MoonLoader>
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
