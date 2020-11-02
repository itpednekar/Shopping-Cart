import React from "react";
import "./Home.css";
import background from "../Images/Background.jpg";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      {/* <div className="home__container">
         <img className="home__image" src={background}></img> 
      </div> */}
      <div className="home__row">
        <Product />
      </div>
    </div>
  );
}

export default Home;
