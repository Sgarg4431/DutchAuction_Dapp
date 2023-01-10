// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IERC721 {
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

contract DutchAuction {
    uint256 private duration = 7 days;
    IERC721 public immutable nft;
    uint256 public immutable nftId;
    address payable public immutable seller;
    uint256 public immutable startingAt;
    uint256 public immutable expiresAt;
    uint256 public immutable startingPrice;
    uint256 public immutable discountRate;

    constructor(
        address _nft,
        uint256 _nftId,
        uint256 _startingPrice,
        uint256 _discountRate
    ) {
        seller = payable(msg.sender);
        nftId = _nftId;
        startingAt = block.timestamp;
        discountRate = _discountRate;
        expiresAt = block.timestamp + duration;
        require(
            _startingPrice >= duration * _discountRate,
            "starting price less than discount"
        );
        startingPrice = _startingPrice;
        nft = IERC721(_nft);
    }

    function getPrice() public view returns (uint256) {
        uint256 timeElasped = block.timestamp - startingAt;
        uint256 discount = discountRate * timeElasped;
        return startingPrice - discount;
    }
    function buy() public payable {
        uint amount=getPrice();
        require(msg.value>=amount,"Not enough amount to buy");
        require(block.timestamp<=expiresAt,"Auction ends");
        nft.transferFrom(seller,msg.sender,nftId);
        uint refund=msg.value-getPrice();
        if(refund>0){
            payable(msg.sender).transfer(refund);
        }
        selfdestruct(seller);
    }
}
