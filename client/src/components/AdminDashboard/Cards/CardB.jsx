import React from 'react'
import c from './CardB.module.css'
import { Link } from 'react-router-dom'


export default function CardB ({sales}) {
    const s = sales && sales.length;

   
  return (
      <Link to='/admin/sales'>
        <div className={c.Card}>
            <h5 className={c.h5}>Shopping</h5>
            <h1 className={c.h1}>{s}</h1>
        </div>
      </Link>
   

    
  )
}
