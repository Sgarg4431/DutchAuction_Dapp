import React from "react";
import "../App.css";
const DutchAuction = ({
  getPrice,
  buy,
  nft,
  setPaise,
  nftId,
  startingAt,
  startingPrice,
  expiresAt,
  discountRate,
}) => {
  return (
    <div class="bg-img">
      <br></br>
     
      <button onClick={nft}>NFT</button>
      <br></br>
      <br></br>
      <button onClick={getPrice}>GET PRICE</button>
      <br></br>
      <br></br>
      <input onChange={(e) => setPaise(e.target.value)} placeholder="Amount" />
      <button onClick={buy}>BUY</button>
      <br></br>
      <br></br>
      <button onClick={nftId}>NFT ID</button>
      <br></br>
      <br></br>
      <button onClick={startingAt}>START TIME</button>
      <br></br>
      <br></br>
      <button onClick={expiresAt}>EXPIRE TIME</button>
      <br></br>
      <br></br>
      <button onClick={startingPrice}>STARTING PRICE</button>
      <br></br>
      <br></br>
      <button onClick={discountRate}>DISCOUNT RATE</button>
    </div>
  );
};
export default DutchAuction;
