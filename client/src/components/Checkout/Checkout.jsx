import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Itemscheckout from "./Itemscheckout";
import { FaEthereum } from 'react-icons/fa'
import {
  getCart,
  infoBooks,
  infoSoldBooks,
  sendEmail,
  getUser,
  exchangeCrypto,
  totalPrice
} from "../../redux/actions";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./styles.css";
import Login from "../Login/Login";
import Crypto from "./Crypto/Crypto";
import CheckoutDirection from "../CheckoutDirection/CheckoutDirection";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Checkout() {
  const dispatch = useDispatch();
  const infoBook = useSelector((state) => state.infoBooks);
  const checkoutinfo = JSON.parse(localStorage.getItem("carrito"));
  let precio = checkoutinfo.map((e) => e.cant * e.price);
  var user = useSelector((state) => state.user);
  let preciototal = precio.reduce(function (a, b) {
    return a + b;
  }, 0);
  const history = useHistory();

  let email = user.email;
  let name = user.name;
  let lastName = user.lastName;
  let payment = checkoutinfo;
  let userId = user.idUser;

  console.log("soy user id", user.idUser);


  // useEffect(() => {
  //   dispatch(getUser())

  // }, [dispatch])

  console.log(user);

  useEffect(() => {
    dispatch(getCart());
    dispatch(exchangeCrypto())
  }, [dispatch]);
  const crypto = useSelector(state => state.crypto)

  let address = localStorage.getItem('address')

  let x = preciototal / crypto
  let valuecrypto = x.toString()
  let val = valuecrypto.slice(0, 11)


  const createOrder = (data, actions) => {
    if (user.hasOwnProperty("name")) {

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: preciototal,
            },
          },
        ],
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to be logged in to buy!",
      });
    }
  };
  const onApprove = (data, actions) => {
    let totalInfo = {
      data: data,
      totalPrice: preciototal,
      infoBook: infoBook,
      userId: userId,
      address: address
    };



    dispatch(infoBooks(infoBook));
    dispatch(infoSoldBooks(totalInfo));
    dispatch(sendEmail({ email, name, lastName, payment }));

    let timerInterval;
    Swal.fire({
      title: "Your payment was successful",
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
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        localStorage.removeItem("carrito");
        window.location.href = "/home";
        console.log("I was closed by the timer");
      }
    });

    return actions.order.capture();
  };

  return (
    <div className="checkout">
      <NavBar></NavBar>
      <div className="checkoutCont">
        <div>
          {checkoutinfo?.map((e) => (
            <Itemscheckout
              key={e.id}
              img={e.image}
              title={e.title}
              author={e.author}
              price={e.price * e.cant}
              cant={e.cant}
            />
          ))}

        </div>
        <div className="pay">
          <h1 style={{ textAlign: 'center', fontSize: '30px' }}>Order Total</h1>
          <h3>USD: ${preciototal}</h3>
          <h3>ETH <FaEthereum /> : {val} </h3>
          <p style={{ textAlign: 'center', }}>Delivery at {localStorage.getItem('address')}</p>
          <Crypto value={val} infoBook={checkoutinfo} userId={userId} email={email} name={name} lastName={lastName} payment={payment}></Crypto>
          <a href="https://metamask.io/" target='_blank'><span style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px', marginBottom: '-8px' }}> What is Metamask?</span></a>
          <div className="paypal">
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}