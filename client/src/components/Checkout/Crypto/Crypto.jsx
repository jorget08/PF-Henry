import React from 'react'
import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import { useDispatch} from "react-redux";
import {infoSoldBooks,infoBooks,sendEmail} from "../../../redux/actions";
import Swal from "sweetalert2";

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
  
  


function Crypto({value,infoBook,userId,email,name,lastName,payment}) {
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
       
        dispatch(infoSoldBooks(totalInfo));
        
        dispatch(infoBooks(infoBook));
        dispatch(sendEmail({ email, name, lastName, payment }));

        let timerInterval
Swal.fire({
  title: 'Your payment was successful',
  html: 'Thank you for trusting in BookStore',
  timer: 5000,

  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
   localStorage.removeItem("carrito");
    window.location.href = "/home";
    console.log('I was closed by the timer')
  }
})
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


/*
import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
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
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};


  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );



*/