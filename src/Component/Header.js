import React, { useContext, useState } from "react";
import "./Header.css";
import logo from "../Images/dream-2.png";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "../App";
import { Link } from "react-router-dom";

function Header() {
  const context = useContext(CartContext);

  const onChangeSearch = (e) => {
    context.dispatchState({ type: "searchProduct", value: e.target.value });
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
          <strong>Hello, Strager</strong>
        </div>
        <div className="header__option_one">
          <strong>SignIn</strong>
        </div>
        <div className="header__option_two">
          <Link exact to="/cart">
            <Badge
              badgeContent={context.cartProductState.length}
              color="secondary"
            >
              <ShoppingCartOutlinedIcon style={{ fontSize: 35 }} />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
