import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../Item/Item'
import NavBar from '../NavBar/NavBar'
//import { useLocalStore } from '../Utils/useLocalStorage'
import { removeAllFromCart, getCart } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './styles.css'
export default function Cart() {

    const dispatch = useDispatch()
    const bookCarts = useSelector(state => state.cart)
    const [cart, setCart] = useState([])

    console.log("soy bookCarts", bookCarts)

    let prices = []
    bookCarts?.map(e => prices.push(e.price))


    function handleDeleteAll(e) {
        e.preventDefault();
        dispatch(removeAllFromCart())
    }
    useEffect(() => {
        dispatch(getCart())

    }, [dispatch])

    //<button onClick={handleDeleteAll}>Eliminar Todo del Carrito</button>
    return (
        <div>
            <NavBar />
            <div className='cartContainer'>
                <div className='cart'>
                    {JSON.parse(localStorage.getItem('carrito'))?.length ?


                        <div className='items'>
                            {bookCarts?.map(e => <Item id={e.id} price={e.price} img={e.image} title={e.title} stock={e.stock} author={e.author} />)}
                            <div className='subTotal'>
                                <h3>subTotal <span>{`(${bookCarts?.length} items)`}</span></h3>
                                <p>${prices ? prices.reduce((a, b) => a + b, 0) : null}, 00</p>
                            </div>
                            <div className='continue subTotal'>
                                <Link to='/home'>
                                    <p className='keep'>Keep Shopping</p>
                                </Link>
                                <p className='checkout'>Continue to Checkout</p>

                            </div>
                        </div>
                        :
                        <div className='empty'>
                            <h1>Oops, Your Cart is Empty!</h1>
                            <p>Looks like you haven't added anything to your cart yet</p>
                            <img src='https://jersix.com/wp-content/uploads/2020/10/Empty-pana-uai-2000x1500.png' />
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}
