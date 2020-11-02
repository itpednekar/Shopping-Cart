import React, { useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import ProductDetails from "./Component/ProductDetails";
import PlaceOrder from "./Component/PlaceOrder";

export const CartContext = React.createContext();

const initialState = {
  count: 0,
  product: [],
  search: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        count: state.count + 1,
        product: [...state.product, action.value.productDetails],
      };
    case "removeFromCart":
      let newCart = [...state.product];
      const index = state.product.findIndex((item) => (item.id = action.id));
      console.log("Index", index);
      if (index >= 0) {
        newCart.splice(index, 1);
        console.log(newCart);
      } else {
        console.log("Cant remove product ");
      }
      return { ...state, count: state.count - 1, product: newCart };
    case "clearCart":
      return initialState;
    case "searchProduct":
      return { ...state, search: action.value };
  }
};

function App() {
  const [cart, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <div className="app">
        <CartContext.Provider
          value={{
            cartCountState: cart.count,
            cartProductState: cart.product,
            cartSearchState: cart.search,
            dispatchState: dispatch,
          }}
        >
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route
              exact
              path="/product-details/:id"
              component={ProductDetails}
            />
            <Route exact path="/place-order" component={PlaceOrder} />
          </Switch>
        </CartContext.Provider>
      </div>
    </Router>
  );
}

export default App;