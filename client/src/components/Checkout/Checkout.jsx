import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Itemscheckout from "./Itemscheckout";
import { getCart, infoBooks, infoSoldBooks } from "../../redux/actions";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Checkout() {
  const dispatch = useDispatch();
  const bookCarts = useSelector((state) => state.cart);
  const TotalPrice = useSelector((state) => state.totalPrice);
  const infoBook = useSelector((state) => state.infoBooks);
  const checkoutinfo = JSON.parse(localStorage.getItem("carrito"));

  let precio = checkoutinfo.map((e) => e.cant * e.price);
  let preciototal = precio.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log("soy precio",precio);
  console.log("soy precio total",preciototal)

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: preciototal,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    let totalInfo = { data: data, totalPrice: TotalPrice, infoBook: infoBook };
    console.log("soy total info", totalInfo);
    dispatch(infoBooks(infoBook));
    dispatch(infoSoldBooks(totalInfo));
    return actions.order.capture();
  };

  return (
    <>
      <NavBar></NavBar>
      {checkoutinfo?.map((e) => (
        <Itemscheckout
          img={e.image}
          title={e.title}
          author={e.author}
          price={e.price * e.cant}
          cant={e.cant}
        />
      ))}
      <h1>Monto a Pagar:{preciototal}</h1>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
      ;
    </>
  );
}
