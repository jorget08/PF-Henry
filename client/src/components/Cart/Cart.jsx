import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../Item/Item'
import NavBar from '../NavBar/NavBar'
//import { useLocalStore } from '../Utils/useLocalStorage'
import { removeAllFromCart, getCart } from '../../redux/actions';
import './styles.css'
export default function Cart() {

    const dispatch = useDispatch()
    const bookCarts = useSelector(state => state.cart)
    const [cart, setCart] = useState([])

    console.log("soy bookCarts", bookCarts)


    function handleDeleteAll(e) {
        e.preventDefault();
        dispatch(removeAllFromCart())
    }
    useEffect(() => {
        dispatch(getCart())

    }, [dispatch])


    return (
        <div className='cartContainer'>
            <NavBar />
            <button onClick={handleDeleteAll}>Eliminar Todo del Carrito</button>
            <div className='items'>
                {bookCarts?.map(e => <Item id={e.id} price={"$" + e.price} img={e.image} title={e.title} stock={e.stock} author={e.author} />)}
            </div>
            <div>
                <h3>Order Summary</h3>
                subTotal
            </div>
        </div>
    )
}
