import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { BsCartPlus } from 'react-icons/bs'
import { BsCartCheckFill } from 'react-icons/bs'
import './styles.css'
import Swal from 'sweetalert2'

export default function Compra({ title, author, price, categories, id, stock }) {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const [cartIcon, setCartIcon] = useState(<BsCartPlus size={25} onClick={handleClick} className="icon" />)
  let bookinCart = JSON.parse(localStorage.getItem("carrito"))?.filter(e => e.id === id)


  function handleClick() {
    if (!bookinCart?.length) {
      dispatch(addToCart(id))
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: `Added "${title}" to cart`,
      })
      setCartIcon(<BsCartCheckFill size={25} className="done" />)
    }
  }

  return (
    <div className='detailCompra'>
      <h3 style={{ borderBottom: '1px solid gray', textAlign: 'center', paddingBottom: '10px' }}>${price}, 00</h3>
      {stock == 0 ? <h3>No more stock</h3> :
        <div style={{ marginTop: '-20px' }}>
          <div className='addTo'>
            <p>Available Stock:</p>
            <p style={{ marginRight: '10px' }}>{stock}</p>
          </div>
          <div className='addTo'>
            <p>Add to Cart</p>
            <button>
              {bookinCart?.length ? <BsCartCheckFill size={25} className="done" /> : cartIcon}
            </button>
          </div>
        </div>

      }
      {stock == 0 ? null : <Link to={"/cart"}><button onClick={handleClick} className="buy">Buy This Book</button></Link>}

    </div>


  )
}
