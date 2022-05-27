import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../Item/Item'
import NavBar from '../NavBar/NavBar'
//import { useLocalStore } from '../Utils/useLocalStorage'
import {removeAllFromCart} from '../../redux/actions';

export default function Cart() {

    const dispatch = useDispatch()
    const bookCarts = useSelector(state => state.cart)
    useEffect(()=>{    
        //dispatch(useLocalStore(bookCarts))
    },[dispatch])

    function handleDeleteAll(e){
        e.preventDefault();
        dispatch(removeAllFromCart())
    }
        
    return (
        <>
        <NavBar/>
        <button onClick={handleDeleteAll}>Eliminar Todo del Carrito</button>
        <div>
            {bookCarts?.map(e => <Item id={e.id} price={"$"+e.price} img={e.image} title={e.title} stock={e.stock} author={e.author} />)}
        </div>
        </>
    )
}
