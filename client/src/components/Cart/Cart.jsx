import React, { useState } from 'react'
import Item from '../Item/Item'

export default function Cart() {

    return (
        <div>
            {bookCarts?.map(e => <Item id={e.id} price={e.price} img={e.img} title={e.title} stock={e.stock} author={e.author} />)}
        </div>
    )
}
