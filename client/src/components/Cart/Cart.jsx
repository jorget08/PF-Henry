import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../Item/Item'
import NavBar from '../NavBar/NavBar'
//import { useLocalStore } from '../Utils/useLocalStorage'
import { removeAllFromCart, getCart,totalPrice,infoBooks } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './styles.css'
export default function Cart() {

    const dispatch = useDispatch()
    const bookCarts = useSelector(state => state.cart)

    const [items, setItems] = useState(bookCarts);
    const [del, setDel] = useState(true);
    const [add, setAdd] = useState(false);
    console.log("soy bookCarts", bookCarts)


    let prices = []
    bookCarts?.map(e => prices.push(e.price))

    function newDel() {
        setItems(bookCarts)
        setDel(del ? false : true)
    }
    function handleItem(title, price, cant) {

        let newBooks = bookCarts.map(e => {
            if (e.title === title) {
                e.cant = cant;
                e.total = cant * price;
            } else {
                if (!e.total) e.total = e.price
            }
            return e
        })
        console.log(newBooks)
        setItems(newBooks)
        let total = 0;
        newBooks.forEach(e => {
            total += e.price * e.cant;
        })
        setAdd(true)
        return total;
    }
    function handleAddItems() {
        let newItems = bookCarts?.map(e => e?.total)
        let firstItems = bookCarts?.map(e => e.price)
        //console.log(firstItems)
        //console.log(newItems)
        if (add) {
            let totalPrices=newItems.reduce(function (a, b) { return a + b }, 0)
            let bookInfo=bookCarts
            console.log("soy bookinfo",bookInfo)
            dispatch(totalPrice(totalPrices))
            dispatch(infoBooks(bookInfo))
            return totalPrices
        } else {
            let totalPrices=firstItems.reduce(function (a, b) { return a + b }, 0)
            dispatch(totalPrice(totalPrices))
            return totalPrices
        }
    }
    function handleSubItems() {
        let newItems = bookCarts?.map(e => e.cant)
        return newItems.reduce(function (a, b) { return a + b }, 0)
    }

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch])

    //<button onClick={handleDeleteAll}>Eliminar Todo del Carrito</button>
    return (
        <div>
            <NavBar />
            <div className='cartContainer'>
                <div className='cart'>
                    {JSON.parse(localStorage.getItem('carrito'))?.length ?
                        <div className='items'>
                            {bookCarts?.map(e => <Item id={e.id} price={e.price} img={e.image} title={e.title} stock={e.stock} author={e.author} handleItem={handleItem} newDel={newDel} />)}
                            <div className='subTotal'>
                                <h3>subTotal <span>{`(${handleSubItems()} items)`}</span></h3>
                                <p>${handleAddItems()}, 00</p>
                            </div>
                            <div className='continue subTotal'>
                                <Link to='/home'>
                                    <p className='keep'>Keep Shopping</p>
                                </Link>
                                <Link to='/checkout'>
                                <p className='checkout'>Continue to Checkout</p>
                                </Link>

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
