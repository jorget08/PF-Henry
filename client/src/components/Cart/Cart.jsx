import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../Item/Item";
import NavBar from "../NavBar/NavBar";
//import { useLocalStore } from '../Utils/useLocalStorage'
import {
  removeAllFromCart,
  getCart,
  totalPrice,
  infoBooks,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import "./styles.css";
export default function Cart() {
  const dispatch = useDispatch();
  const bookCarts = useSelector((state) => state.cart);
  let localstorage=JSON.parse(localStorage.getItem("carrito"))
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("carrito")));
  const [del, setDel] = useState(true);
  const [add, setAdd] = useState(false);
 
  
 console.log("soy local storage",localstorage)
  
  function newDel() {
    setItems(localstorage);
    setDel(del ? false : true);
  }
  function handleItem(title, price, cant) {
    let newBooks =localstorage?.map((e) => {
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
    let newItems =localstorage?.map((e) => e?.total);
    let firstItems =localstorage?.map((e) => e.price);
    console.log("first item",firstItems)
    console.log("new item",newItems)
    
    if (firstItems.length) {
      let totalPrices = firstItems?.reduce(function (a, b) {
        return a + b;
      }, 0);
      let bookInfo =localstorage;
      dispatch(totalPrice(totalPrices));
      dispatch(infoBooks(bookInfo));
      
    } else {
      let totalPrices = newItems?.reduce(function (a, b) {
        return a + b;
      }, 0);
      let bookInfo =localstorage;
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
    let newItems =localstorage?.map((e) => e.cant);
    return newItems.reduce(function (a, b) {
      return a + b;
    }, 0);
  }



  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

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
                <h3>
                  subTotal <span>{`(${handleSubItems()} items)`}</span>
                </h3>
                <p>${handleAddItems()}, 00</p>
              </div>
              <div className="continue subTotal">
                <Link to="/home">
                  <p className="keep">Keep Shopping</p>
                </Link>
                <Link to="/checkout">
                  <p className="checkout">Continue to Checkout</p>
                </Link>
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
    </div>
  );
}
