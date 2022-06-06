import React from 'react'
import s from './CardU.module.css'

export default function Card({books, users}) {
    
    const u = users && users.length;

    console.log("SOY LAS PROPS",u)
  return (
      <div className={s.Card}>
            <h1 className={s.h1}>{u}</h1>
            <h5 className={s.h5}>Users Registered</h5>
      </div>
   

    
  )
}
