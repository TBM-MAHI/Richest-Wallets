import { useEffect } from "react";
import { useDispatch } from "react-redux";
import config from "../config.json";
import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadSigner,
  loadContract,
  loadTopUsers
} from "../redux-store/interactions";
import MyNavbar from "./Navbar";
import Register from "./Register";
import TopUsersCard from "./TopUsers";
const App = () => {
  const dispatch = useDispatch();
  const loadBlockchainData = async () => {
    //CONNECT TO ETHERS.js to blockchain
    const provider = loadProvider(dispatch);
    // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
    const chainId = await loadNetwork(provider, dispatch);

    //Fetch current account & balance from Metamask WHEN ACCOUNT CHANGES
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
      loadSigner( provider,dispatch);
   });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    //Load token smart contracts
    let contrAddress = config[chainId].richest.address;
    await loadContract(contrAddress, dispatch, provider);
  };

  useEffect(() => {
    console.log("fired useEffect from app");
    async function fetchData() {
      return await loadBlockchainData();
    }
    fetchData();
  });

  return (
    <div>
      <MyNavbar />
      <div className="d-flex justify-content-around">
        <TopUsersCard />
        <Register />
      </div>
    </div>
  );
};

export default App;
