import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import DutchAuction from "./artifacts/contracts/DutchAuction.sol/DutchAuction.json";
import MyNFT from "./artifacts/contracts/Nft.sol/MyNFT.json";
import { ethers } from "ethers";
import { Link, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nft from "./components/Nft.js";
import Dutch from "./components/DutchAuction.js";
import Main from "./components/Main.js";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
function App() {
  const address = "0x0803A3C1E020767EfD24E39A15567d0f04fF2964";
  const address1 = "0xaF32215e2115587A09CEa57e7360B50e842227E7";
  const [contract, setContract] = useState();
  const [nft1, setNft] = useState();
  const [account, setAccount] = useState();
  const [paise, setPaise] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    addWalletListener();
  }, []);
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    window.ethereum.on("accountChanged", async function (accounts) {
      setAccount(account[0]);
      await web3Handler();
    });
    loadContract(signer);
  };
  const loadContract = async (signer) => {
    setContract(new ethers.Contract(address, DutchAuction.abi, signer));
    setNft(new ethers.Contract(address1, MyNFT.abi, signer));
  };
  async function getPrice() {
    if (contract) {
      const price = await contract.getPrice();
      alert(price);
    } else {
      alert("Connect to wallet first");
    }
  }
  async function buy() {
    if (contract) {
      try {
        await contract.buy({ value: paise });
      } catch (e) {
        if (e.message.search("Not enough amount to buy") != -1) {
          alert("Not enough amount to buy");
        } else if (e.message.search("Auction ends") != -1) {
          alert("Auction ends");
        }
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function nft() {
    if (contract) {
      try {
        const x = await contract.nft();
        alert(x);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Connect to wallet");
    }
  }
  async function nftId() {
    if (contract) {
      try {
        const x = await contract.nftId();
        alert(x);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Connect to wallet");
    }
  }
  async function startingAt() {
    if (contract) {
      try {
        const x = await contract.startingAt();
        alert(x);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Connect to wallet");
    }
  }
  async function expiresAt() {
    if (contract) {
      try {
        const x = await contract.expiresAt();
        alert(x);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Connect to wallet");
    }
  }
  async function startingPrice() {
    if (contract) {
      try {
        const x = await contract.startingPrice();
        alert(x);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Connect to wallet");
    }
  }
  async function discountRate() {
    if (contract) {
      try {
        const x = await contract.discountRate();
        alert(x);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Connect to wallet");
    }
  }
  async function ownerOf() {
    if (nft1) {
      try {
        alert(await nft1.ownerOf(id));
      } catch (e) {
        if (e.message.search("token doesn't exist") != -1) {
          alert("token doesn't exist");
        }
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  const style1 = {
    paddingLeft: "400px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };

  const anchorStyle = {
    paddingLeft: "50px",
    textDecoration: "black",
    color: "black",
  };
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>AUCTION BAZAR</h1>
            <Link style={anchorStyle} to="/">
              <button>Home</button>
            </Link>
            <Link style={anchorStyle} to="/Nft">
              <button>NFT</button>
            </Link>
           
            <Link style={anchorStyle} to="/Dutch">
              <button>Auction</button>
            </Link>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={web3Handler}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Routes>
        <Route
          exact
          path="/Nft"
          element={<Nft ownerOf={ownerOf} setId={setId} />}
        ></Route>
        <Route exact path="/" element={<Main />}></Route>
        <Route
          exact
          path="/Dutch"
          element={
            <Dutch
              getPrice={getPrice}
              buy={buy}
              setPaise={setPaise}
              nft={nft}
              nftId={nftId}
              startingAt={startingAt}
              expiresAt={expiresAt}
              startingPrice={startingPrice}
              discountRate={discountRate}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
