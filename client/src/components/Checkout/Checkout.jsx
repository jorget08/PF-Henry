import React from "react";
import ReactDOM from "react-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import Itemscheckout from './Itemscheckout';


const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });


export default function Checkout(){
    
    const dispatch = useDispatch()
    const bookCarts = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch])


    

  const createOrder=(data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  }
  const onApprove=(data, actions)=>{
    return actions.order.capture();
  }
  

    return(
   <>

   <NavBar></NavBar>
   {bookCarts?.map(e=> <Itemscheckout img={e.img} title={e.title} author={e.author} price={e.price}/>)}


 
      <PayPalButton
        createOrder={(data, actions) =>createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    ;
 




</>
    )
}

