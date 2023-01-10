import React from "react";
import "../App.css";

import { Link } from "react-router-dom";
const anchorStyle = {
    paddingLeft: "50px",
    textDecoration: "black",
    color: "black",
  };
const Main = () => {
  return (
    <div class="bg-img2">
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <Link style={anchorStyle} to="/Nft">
        <button style={{fontSize:"72px",paddingLeft:"10px",paddingRight:"10px"}}>NFT</button>
      </Link>
      <Link style={anchorStyle} to="/Dutch">
        <button style={{fontSize:"72px", marginLeft:"500px"}}>Auction</button>
      </Link>
    </div>
  );
};
export default Main;
