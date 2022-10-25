import { ethers } from "ethers";
import React, { useState } from "react";
import abi from './donabi.json';
import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton,CCol,CRow} from '@coreui/react';
const contractAddress = "0x07d2a73b495FE8B41D5a1992cae58BA95832f305";// -- new donation contract
const contractAbi = abi.abi;

export default function App() {
  var [donatee,setDonatee] = useState("");
  var [_to, set_to] = useState("");

  function sam(){
    _to = "0x6f144c0628D2039f27F13604c583fAb72BEF197e";
    alert("Address Updated to Sam",_to);
      }
      function Bal(){
        _to="0x0dDda6871f1216D7EF56722167652e4F881d74Aa";
    alert("Address Updated to Balancer",_to);


      }
      function uni(){
        _to= "0x0dDda6871f1216D7EF56722167652e4F881d74Aa";
    alert("Address Updated to Uniswap",_to);

        
    
      }
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: 'eth_accounts' })
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
      const { ethereum } = window;

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
  const onSenderChange = (event) => {

    setDonatee(event.target.value);
  }
 
  const donate = async () => {
    //event.preventDefault();
    const amt = donatee;
    console.log("In Donate");
    try {

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const donationContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        console.log("Donating");
        const orgAddress = _to;
        const donatingTxn = await donationContract.donateEthers(
          _to ? orgAddress : "No Address",
          { value: ethers.utils.parseEther(amt) }
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
      {/* <button type="button" onClick={connectWallet}>Connect Wallet</button>
      <input type="text" id="amount" placeholder="0.01 ETH" onChange={onSenderChange}></input>
      <button type="button" onClick={donate}>Donate Now</button>
      <br />
      <br />
      <br /> */}
      

      <center><br />
<br />    <button type="button" onClick={connectWallet}>Connect Wallet</button> 

<br /><br />

     <input type="text" id="amount" placeholder="0.01 ETH" onChange={onSenderChange}></input></center>

  {/*  <input type="text" id="amount" placeholder="0.01 ETH" onChange={onSenderChange}></input> */}
  <br />
<br />
<CRow>
<CCol sm={6}>
      <CCard>
        <CCardBody>
          <CCardTitle>Donate Orgs</CCardTitle>
          <CCardText>
            Click On Donate Now,and i will fetch the address of orgs and Donate 0.005 ETH
          </CCardText>

          <CButton href="#" onClick={donate}>Donate Now</CButton>
        </CCardBody>
      </CCard>
      </CCol>
  <CCol sm={6}>
      <CCard>
        <CCardBody>
          <CCardTitle>Uniswap</CCardTitle>
          <CCardText>
            We are a DEX in which you can Swap various crypto Currencies
          </CCardText>
          <CButton href="#" onClick={uni}>Donate Me </CButton>
        </CCardBody>
      </CCard>
      </CCol>
      <br />
      <br />
      <br />
      <CCol sm={6}>
      <CCard>
        <CCardBody>
          <CCardTitle>Balancer</CCardTitle>
          <CCardText>
            We are A AMM in which you can create your own Liauidity Pool
             </CCardText>
          <CButton href="#" onClick={Bal}>Donate Me</CButton>
        </CCardBody>
      </CCard>
      </CCol>
      <br />
      <br />
      <br />
      
  <CCol sm={6}>
    <CCard>
        <CCardBody>
          <CCardTitle>Shubham Patel</CCardTitle>
          <CCardText>
            I am a Developer 
             </CCardText>
          <CButton href="#" onClick={sam}>Donate Me </CButton>
        </CCardBody>
      </CCard>
      </CCol>
</CRow>
      
    </div>
  
  );
}


