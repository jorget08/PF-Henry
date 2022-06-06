import React from 'react'
import s from './Card.module.css'

export default function Card({books, users}) {
    const b = books && books.length;
    const u = users && users.length;

    console.log("SOY LAS PROPS",u)
  return (
      <div className={s.Card}>
            <h1 className={s.h1}>{b}</h1>
            <h5 className={s.h5}>Books uploaded</h5>
      </div>
   

    
  )
}
