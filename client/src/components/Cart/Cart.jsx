import React from 'react'
import { useSelector } from 'react-redux'
import Item from '../Item/Item'
import { useLocalStore } from '../Utils/useLocalStorage'

export default function Cart() {
    const bookCarts = useSelector(state => state.cart)
        
    return (
        <div>
            {bookCarts?.map(e => <Item id={e.id} price={e.price} img={e.img} title={e.title} stock={e.stock} author={e.author} />)}
        </div>
    )
}
