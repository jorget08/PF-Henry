import React from 'react'
import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import { useDispatch} from "react-redux";
import {infoSoldBooks} from "../../../redux/actions";

const startPayment = async ({ setError, setTxs, ether, addr}) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      }
      
      
      );
     
      setTxs([tx]);
      return tx
    } catch (err) {
      setError(err.message);
    }
  };
  
  


function Crypto({value,infoBook,userId}) {
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const dispatch = useDispatch();
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      setError();
      
      const x= await startPayment({
        setError,
        setTxs,
        ether: value,
        addr: "0x1AD379959ff0F23f68F69f5f4e3E1b4f0E7bFf62",
      });
      
      let totalInfo={
          data:x?.hash,
          totalPrice:value,
          infoBook:infoBook,
          userId:userId
        }  
        console.log("sadfasdfsadf",totalInfo)  
        dispatch(infoSoldBooks(totalInfo));
    };

    console.log("value eht",value)
  
    

  return (
    <form onSubmit={handleSubmit}>
      <div >
       
        <footer >
          <button
            type="submit"
           
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          
        </footer>
      </div>
    </form>
  );

    
}

export default Crypto