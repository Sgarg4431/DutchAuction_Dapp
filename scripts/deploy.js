// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
 const DutchAuction=await ethers.getContractFactory("DutchAuction");
 const dutchauction=await DutchAuction.deploy("0xaF32215e2115587A09CEa57e7360B50e842227E7","786","1000000","1");
 await dutchauction.deployed();
 console.log("Address of dutch:"+dutchauction.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//Address of nft:0xaF32215e2115587A09CEa57e7360B50e842227E7
//Address of dutch:0x0803A3C1E020767EfD24E39A15567d0f04fF2964