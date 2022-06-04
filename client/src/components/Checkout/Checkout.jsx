import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Itemscheckout from "./Itemscheckout";
import { getCart, infoBooks, infoSoldBooks, removeAllFromCart } from "../../redux/actions";
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import './styles.css'
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
  const history = useHistory()

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

    let timerInterval
    Swal.fire({
      title: 'Your payment was successful',
      timer: 5000,
      timerProgressBar: true,
      didOpen: (success) => {
        Swal.getIcon(success)
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval);


      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    return actions.order.capture();
  };

  return (
    <div className="checkout">
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
      <h1>Order Total: ${preciototal}</h1>
      <div className="paypal">

        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  );
}
