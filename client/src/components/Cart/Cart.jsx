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

    let prices=[]
    bookCarts?.map(e=>prices.push(e.price))
    

    function handleDeleteAll(e) {
        e.preventDefault();
        dispatch(removeAllFromCart())
    }
    useEffect(() => {
        dispatch(getCart())

    }, [dispatch])

//<button onClick={handleDeleteAll}>Eliminar Todo del Carrito</button>
    return (
        <div className='cartContainer'>
            <NavBar />
            
            <div className='items'>
                {bookCarts?.map(e => <Item id={e.id} price={"$" + e.price} img={e.image} title={e.title} stock={e.stock} author={e.author} />)}
            </div>
            <div>
                <h3>Order Summary</h3>
                <h1>subTotal ${prices?prices.reduce((a, b) => a + b, 0):null}</h1>
            </div>
        </div>
    )
}
