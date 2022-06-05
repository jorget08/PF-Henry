import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Itemscheckout from "./Itemscheckout";
import { getCart, infoBooks, infoSoldBooks,sendEmail,getUser} from "../../redux/actions";
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import './styles.css'
import { unzipSync } from "zlib";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Checkout() {
  const dispatch = useDispatch();
  const bookCarts = useSelector((state) => state.cart);
  const TotalPrice = useSelector((state) => state.totalPrice);
  const infoBook = useSelector((state) => state.infoBooks);
  const checkoutinfo = JSON.parse(localStorage.getItem("carrito"));
  let precio = checkoutinfo.map((e) => e.cant * e.price);
  var user = useSelector(state => state.user)
  let preciototal = precio.reduce(function (a, b) {
    return a + b;
  }, 0);
  const history = useHistory()

  let email=user.email
  let name=user.name
  let lastName=user.lastName
let payment=checkoutinfo

console.log(payment)

// useEffect(() => {
//   dispatch(getUser())
  
// }, [dispatch])

console.log(user)

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const createOrder = (data, actions) => {
    dispatch(sendEmail({email,name,lastName,payment}))
    
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
        localStorage.removeItem('carrito')
        window.location.href = '/home'
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
        key={e.id}
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
