import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Item from "../Item/Item";
import NavBar from "../NavBar/NavBar";
import Modal from '../Modal/Modal';
import { useModals } from '../Utils/useModals';
import Login from '../Login/Login';
//import { useLocalStore } from '../Utils/useLocalStorage'
import {
  removeAllFromCart,
  getCart,
  totalPrice,
  infoBooks,
  exchangeCrypto,
  setDeliveryAddress
} from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import Footer from "../Footer/Footer";
import { IoIosArrowDown } from "react-icons/io";
import Swal from "sweetalert2";
import CheckoutDirection from "../CheckoutDirection/CheckoutDirection";

export default function Cart() {

  const dispatch = useDispatch();
  const bookCarts = useSelector((state) => state.cart);
  let localstorage = JSON.parse(localStorage.getItem("carrito"))
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("carrito")));
  const [del, setDel] = useState(true);
  const [add, setAdd] = useState(false);
  const token = localStorage.getItem("token")
  const [isOpenModal, openModal, closeModal] = useModals(false)
  var user = useSelector((state) => state.user);
  console.log("soy local storage", localstorage)
  const history = useHistory()

  const [adressSelected, setAdressSelected] = useState("Choose an adress")

  function newDel() {
    setItems(localstorage);
    setDel(del ? false : true);
  }
  function handleItem(title, price, cant) {
    let newBooks = localstorage?.map((e) => {
      if (e.title === title) {
        e.cant = cant;
        e.total = cant * price;
      } else {
        if (!e.total) e.total = e.price;
      }
      return e;
    });
    localStorage.setItem("carrito", JSON.stringify(newBooks))
    console.log(newBooks);
    setItems(newBooks);
    let total = 0;
    newBooks.forEach((e) => {
      total += e.price * e.cant;
    });
    setAdd(true);
    return total;
  }
  function handleAddItems() {
    let newItems = localstorage?.map((e) => e?.total);
    let firstItems = localstorage?.map((e) => e.price);
    console.log("first item", firstItems)
    console.log("new item", newItems)

    if (firstItems.length) {
      let totalPrices = firstItems?.reduce(function (a, b) {
        return a + b;
      }, 0);
      let bookInfo = localstorage;
      dispatch(totalPrice(totalPrices));
      dispatch(infoBooks(bookInfo));

    } else {
      let totalPrices = newItems?.reduce(function (a, b) {
        return a + b;
      }, 0);
      let bookInfo = localstorage;
      dispatch(totalPrice(totalPrices));
      dispatch(infoBooks(bookInfo));

    }
    let precio = localstorage.map((e) => e.cant * e.price);
    let preciototal = precio.reduce(function (a, b) {
      return a + b;
    }, 0);
    return preciototal
  }

  function handleSubItems() {
    let newItems = localstorage?.map((e) => e.cant);
    return newItems.reduce(function (a, b) {
      return a + b;
    }, 0);
  }

  function handleSelect(e) {
    e.preventDefault();
    console.log("adress", e.target.value)
    setAdressSelected(e.target.value)
  }

  function handleCheckOut(e) {
    if (adressSelected === "Choose an adress") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You didn´t select an adress',
      })
    }
    else {
      localStorage.setItem('address', adressSelected)
      history.push("/checkout")
    }
  }

  useEffect(() => {
    dispatch(getCart());
    //dispatch(exchangeCrypto())
  }, [dispatch]);
  // const crypto = useSelector(state => state.crypto)
  // console.log("TOY AQUI PUTA MADREEEEEE", crypto)

  //<button onClick={handleDeleteAll}>Eliminar Todo del Carrito</button>
  return (
    <div>
      <NavBar />
      <div className="cartContainer">
        <div className="cart">
          {JSON.parse(localStorage.getItem("carrito"))?.length ? (
            <div className="items">
              {bookCarts?.map((e) => (
                <Item
                  id={e.id}
                  price={e.price}
                  img={e.image}
                  title={e.title}
                  stock={e.stock}
                  author={e.author}
                  handleItem={handleItem}
                  newDel={newDel}
                />
              ))}


              <div className="subTotal">
                {
                  <ul>

                  </ul>
                }
                {
                  (adressSelected === "Choose an adress") ?
                    <div><h3 onClick={openModal} style={{ color: "blue", cursor: 'pointer' }}>{adressSelected}<IoIosArrowDown /></h3></div>
                    : <div> <p>Send to:<span style={{ color: "blue", cursor: 'pointer', fontSize: '30px' }} onClick={openModal}> {adressSelected}</span><IoIosArrowDown /></p></div>
                }
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                  {
                    <div className="newAddressCont">
                      <h4 >Choose your address</h4>
                      <select onChange={(e) => handleSelect(e)}>
                        <option value="default" hidden>Select an adress</option>
                        {user.adress &&
                          user.adress.map(a => {
                            return (
                              <option value={a.street + ' ' + a.number + ", " + a.city}>{a.street + ' ' + a.number},{a.city}, {a.state}, {a.country}</option>
                            )
                          }
                          )
                        }
                      </select>
                      <h4 style={{ margin: '0', marginTop: '10px', fontSize: '20px' }}>or</h4>
                      <CheckoutDirection />
                      <button style={{ fontSize: '30px', width: '100%', margin: '10px 0' }} type="button" onClick={closeModal}>Ready!</button>
                    </div>
                  }
                </Modal>



                <h3 >
                  subTotal <span>{`(${handleSubItems()} items)`}</span>
                </h3>
                <p>${handleAddItems()}, 00</p>
              </div>
              <div className="continue subTotal">
                <Link to="/home">
                  <p className="keep">Keep Shopping</p>
                </Link>
                {(token) ?
                  <p className="checkout" onClick={(e) => handleCheckOut(e)}>Continue to Checkout</p>
                  :
                  <div>
                    <p className="checkout" onClick={openModal}>Log in first before going to checkout</p>
                    <Modal isOpen={isOpenModal} closeModal={closeModal}>
                      <Login />
                    </Modal>
                  </div>}
              </div>
            </div>
          ) : (
            <div className="empty">
              <h1>Oops, Your Cart is Empty!</h1>
              <p>Looks like you haven't added anything to your cart yet</p>
              <img src="https://jersix.com/wp-content/uploads/2020/10/Empty-pana-uai-2000x1500.png" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div >
  );
}
