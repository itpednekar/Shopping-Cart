import React, { useReducer, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import ProductDetails from "./Component/ProductDetails";
import PlaceOrder from "./Component/PlaceOrder";
import SignIn from "./Component/SignIn";
import Register from "./Component/Register";
import { auth } from "./firebase";

export const CartContext = React.createContext();

const initialState = {
  product: [],
  search: "",
  user: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        product: [...state.product, action.value.productDetails],
      };
    case "removeFromCart":
      let newCart = [...state.product];
      const index = state.product.findIndex((item) => (item.id = action.id));
      if (index >= 0) {
        newCart.splice(index, 1);
      }
      return { ...state, product: newCart };
    case "clearCart":
      return { ...state, product: [], search: "" };
    case "searchProduct":
      return { ...state, search: action.value };
    case "setUser":
      return { ...state, user: action.user };
  }
};

function App() {
  const [cart, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("authUser", authUser);

      if (authUser) {
        dispatch({ type: "setUser", user: authUser });
      } else {
        dispatch({ type: "setUser", user: null });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <CartContext.Provider
          value={{
            cartProductState: cart.product,
            cartSearchState: cart.search,
            cartUserState: cart.user,
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
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </CartContext.Provider>
      </div>
    </Router>
  );
}

export default App;
