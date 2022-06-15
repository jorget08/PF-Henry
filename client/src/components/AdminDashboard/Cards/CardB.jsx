import React from 'react'
import s from './Card.module.css'
import { Link } from 'react-router-dom'


export default function CardB ({sales}) {
    const saless = sales && sales.length;

   
  return (
      <Link to='/admin/sales'>
        <div className={s.Card}>
            <h5 className={s.h5}>Sales</h5>
            <h1 className={s.h1}>{saless}</h1>
        </div>
      </Link>
   

    
  )
}
