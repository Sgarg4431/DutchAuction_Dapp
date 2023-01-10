import React from "react";
import "../App.css";
const Nft = ({ownerOf,setId}) => {
  return (
    <div class="bg-img1">
    <br></br>
    <br></br>
    <br></br>
       <button onClick={ownerOf}>Owner</button>
      <input onChange={(e) => setId(e.target.value)} placeholder="id" />
    </div>
  )
};
export default Nft;
