import { ethers } from "ethers";
import React, {useState } from "react";
import abi from './donabi.json';
const contractAddress = "0x07d2a73b495FE8B41D5a1992cae58BA95832f305";// -- new donation contract
const contractAbi = abi.abi;
console.log(contractAbi);

export default function App() {
  
const isWalletConnected = async () => {
  try {
    const { ethereum } = window;

    const accounts = await ethereum.request({method: 'eth_accounts'})
    console.log("accounts: ", accounts);

    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("wallet is connected! " + account);
    } else {
      console.log("make sure MetaMask is connected");
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

const connectWallet = async () => {
  try {
    const {ethereum} = window;

    if (!ethereum) {
      console.log("please install MetaMask");
    }

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });

    setCurrentAccount(accounts[0]);
    console.log(accounts[0]);
    console.log("Wallet Connected");
  } catch (error) {
    console.log(error);
  }
}
const [currentAccount, setCurrentAccount] = useState("");
const [_to, set_to] = useState("");
const onSenderChange = (event) => {

  set_to(event.target.value);
}
const donate = async () => {
  //event.preventDefault();
  const amt = _to;
console.log("In Donate");
  try {

    const {ethereum} = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      const donationContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      console.log("Donating");
      const orgAddress = "0x0dDda6871f1216D7EF56722167652e4F881d74Aa";
      const donatingTxn = await donationContract.donateEthers(
        _to ? orgAddress:"No Address",
        {value: ethers.utils.parseEther(amt)}
      );

      await donatingTxn.wait();

      console.log("mined ", donatingTxn.hash);

      console.log("Donation Successful !");

 /*      // Clear the form fields.
      setName("");
      setMessage(""); */
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="App">
      <button type="button" onClick={connectWallet}>Connect Wallet</button>
      <input type="text" id="amount" placeholder="0.01 ETH" onChange={onSenderChange}></input>
      <button type="button" onClick={donate}>Donate Now</button>

    </div>
  );
}


