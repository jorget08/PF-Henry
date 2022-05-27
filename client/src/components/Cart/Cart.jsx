import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../Item/Item'
import { useLocalStore } from '../Utils/useLocalStorage'

export default function Cart() {

    const dispatch = useDispatch()
    const bookCarts = useSelector(state => state.cart)
    useEffect(()=>{    
        dispatch(useLocalStore(bookCarts))
    },[dispatch])
        
    return (
        <div>
            {bookCarts?.map(e => <Item id={e.id} price={e.price} img={e.img} title={e.title} stock={e.stock} author={e.author} />)}
        </div>
    )
}
