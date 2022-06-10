import React from 'react'
import s from './Card.module.css'
import { Link } from 'react-router-dom'

export default function Card({books}) {
    const b = books && books.length;

   
  return (
      <Link to='/admin/stock'>
        <div className={s.Card}>
            <h5 className={s.h5}>Books uploaded</h5>
            <h1 className={s.h1}>{b}</h1>
        </div>
      </Link>
   

    
  )
}
