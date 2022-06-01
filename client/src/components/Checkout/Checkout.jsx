import React from "react";
import ReactDOM from "react-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import Itemscheckout from './Itemscheckout';
import { getCart,infoBooks } from "../../redux/actions";



const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


export default function Checkout(){
    
    const dispatch = useDispatch()
    const bookCarts = useSelector(state => state.cart)
    const TotalPrice = useSelector(state => state.totalPrice)
    const infoBook = useSelector(state => state.infoBooks)

    console.log("soy infoBook",infoBook)
    
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch])


    

  const createOrder=(data, actions) =>{
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: TotalPrice,
          },
        },
      ],
    });
  }
  const onApprove=(data, actions)=>{
    dispatch(infoBooks(infoBook))
    console.log("soydata",data)
    return actions.order.capture();
  }
  

    return(
   <>

   <NavBar></NavBar>
   {infoBook?.map(e=> <Itemscheckout img={e.image} title={e.title} author={e.author} price={e.price} cant={e.cant}/>)}

<h1>Monto a Pagar:{TotalPrice}</h1>
 
      <PayPalButton
        createOrder={(data, actions) =>createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    ;
 




</>
    )
}

