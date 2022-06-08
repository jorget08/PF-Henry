import React from 'react'
import { Link } from 'react-router-dom';
import s from './CardU.module.css'

export default function Card({books, users}) {
    
    const u = users && users.length;

    console.log("SOY LAS PROPS",u)
  return (
      <Link to='/admin/users'>
        <div className={s.Card}>
              <h5 className={s.h5}>Users Registered</h5>
              <h1 className={s.h1}>{u}</h1>
        </div>
      </Link>
   

    
  )
}
