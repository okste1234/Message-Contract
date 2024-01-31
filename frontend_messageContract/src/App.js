import './App.css';
import { ethers } from "ethers";
import { useState } from "react"

import contractABI from "./contracts/abi.json"
import { contractAddress } from './contracts';

function App() {
  const [msg, setMsg] = useState("");
  const [retrieveMsg, setretrieveMsg] = useState("display")

  const handleInput = (e) => {
    setMsg(e.target.value);
  };


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function setMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.setMessage(msg);
        await transaction.wait();
        console.log('message sent');
        setMsg("");
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  async function getMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.getMessage();
        console.log(`message retrieved from chain ${transaction}`);
        setretrieveMsg(transaction)
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }



  return (
    <div className="App">
      <header className="App-header">


        <input
          placeholder="write on message on chain"
          value={msg}
          onChange={handleInput}
          type='text'
          className='input'
        />

        <button onClick={setMessage}
          className='btn'
        >
          Send Message
        </button>


        <button
          onClick={getMessage}
          className='btn'
        >
          Get Message
        </button>

        <h1
          className="App-link"
        >
          My Message : {retrieveMsg}
        </h1>
      </header>
    </div>
  );
}

export default App;
