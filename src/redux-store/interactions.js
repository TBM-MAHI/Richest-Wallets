import { ethers } from "ethers";
import { RICHEST_ABI } from "../ABI/richest.ABI";
import createDispatchAction from "./utility/createDispatch";

export const loadProvider = (dispatch) => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(createDispatchAction("PROVIDER_LOADED", { connection }));
  return connection;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch(createDispatchAction("NETWORK_LOADED", { chainId }));
  return chainId;
};

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(accounts);
  const account = ethers.utils.getAddress(accounts[0]);
  dispatch(createDispatchAction("ACCOUNT_LOADED", { account }));
  let balance = await provider.getBalance(account);
  balance = ethers.utils.formatEther(balance);
  dispatch(createDispatchAction("ACCOUNT_BALANCE_LOADED", { balance }));
};

export const loadSigner = async (provider, dispatch) => {
  const signer = await provider.getSigner();
  dispatch(createDispatchAction("SIGNER_LOADED", { signer }));
};

export const loadContract = async (address, dispatch, provider) => {
  let tokenContr, symbol;
  tokenContr = new ethers.Contract(address, RICHEST_ABI, provider);

  dispatch(createDispatchAction("CONTRACT_LOADED", { tokenContr }));
  return tokenContr;
};

export const loadRegisterUser = async (contract, signer, name, email, dispatch) => {
  //console.log(contract, name, email);
  try {
    let transaction = await contract.connect(signer).registerUser(name, email);
    let res = await transaction.wait();
    let event = res.events[0].args;
    // let { walletAddress, name, email } = event;
    console.log(`User registered successfully`);
    console.log(`\t Emitted event data ${event}`);
    dispatch(createDispatchAction("USER_REGISTERD", { userEventArray:event }));
  } catch (error) {
    let { reason } = error;
    let { message } = error;

    if (reason) console.log(reason.slice(reason.indexOf(" '")));
    else if (message) console.log(message);
  }
};

export const loadTopUsers = async (contract, dispatch,signer) => {
  
  try {
    let transaction = await contract.connect(signer).getTopThreeUser();
    let res = await transaction.wait();
    let eventsArr = res.events;
    let topThreeUserArray = eventsArr.map((el) => {
      let { walletAddress, name, balance } = el.args;
      return {
        walletAddress,
        name,
        balance: ethers.utils.formatEther(balance),
      };
    });
    console.log(topThreeUserArray);
    dispatch(createDispatchAction("TOP_USERS_LOADED", { topThreeUserArray }));
  } catch (error) {
     let { reason } = error;
     let { message } = error;

     if (reason) console.log(reason.slice(reason.indexOf(" '")));
     else if (message) console.log(message);
  }
};
export const loadTotalUsers = async (contract, dispatch) => {
 try {
    let total = await contract.getTotalNumberUsers();
    total = total.toNumber();
    // console.log(`Total users ${total}`);
    dispatch(createDispatchAction("TOTAL_USERS_LOADED", { total }));
  } catch (error) {
    console.log(error);
  }
};
