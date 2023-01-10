const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    const NFT=await ethers.getContractFactory("MyNFT");
    const nft= await NFT.deploy();
    await nft.deployed();
    console.log("Address of nft:"+nft.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });