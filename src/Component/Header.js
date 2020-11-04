import React, { useContext, useState } from "react";
import "./Header.css";
import logo from "../Images/dream-2.png";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "../App";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { FaShopify } from "react-icons/fa";

function Header() {
  const context = useContext(CartContext);
  const history = useHistory();

  const onChangeSearch = (e) => {
    context.dispatchState({ type: "searchProduct", value: e.target.value });
  };

  const handleAuthorization = () => {
    if (context.cartUserState) {
      auth.signOut();
      alert("Sign Out successfully!");
    } else {
      history.push("/sign-in");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} />
      </Link>

      <div className="header__search">
        <input
          type="text"
          placeholder="Search Your Products Here.."
          className="header__searchIn"
          onChange={onChangeSearch}
          value={context.search}
        />
        <SearchTwoToneIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option_one">
          {context.cartUserState ? (
            <strong>{context.cartUserState?.email}</strong>
          ) : (
            <strong>Hello, Strager</strong>
          )}
        </div>
        <div onClick={handleAuthorization} className="header__option_two">
          {context.cartUserState ? (
            <strong>Sign-Out</strong>
          ) : (
            <strong>Sing-In</strong>
          )}
        </div>
        <div className="header__option_three">
          <Link exact to="/cart">
            <Badge
              badgeContent={context.cartProductState.length}
              color="secondary"
            >
              <FaShopify style={{ fontSize: 30 }} />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
