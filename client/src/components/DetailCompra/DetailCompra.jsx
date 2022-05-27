import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { BsCartPlus } from 'react-icons/bs'
import { BsCartCheckFill } from 'react-icons/bs'
import './styles.css'

export default function Compra({ title, author, price, categories, id }) {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const [cartIcon, setCartIcon] = useState(<BsCartPlus size={25} onClick={handleClick} className="icon" />)
  function handleClick() {
    dispatch(addToCart(id))
    setCartIcon(<BsCartCheckFill size={25} className="done" />)
  }

  return (
    <div className='detailCompra'>
      <h3>${price}, 00</h3>
      <div className='addTo'>
        <p>Add to Cart</p>
        <button>
          {cartIcon}
        </button>

      </div>
      <Link to={"/cart"}><button onClick={handleClick} className="buy">Buy This Book</button></Link>
    </div>
  )
}
