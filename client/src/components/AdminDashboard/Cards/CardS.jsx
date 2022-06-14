import React from 'react'
import s from './Card.module.css'
import { Link } from 'react-router-dom'

export default function CardS({supports}) {
    const sup = supports && supports.length;

   
  return (
      <Link to='/admin/supportAdmin'>
        <div className={s.Card}>
            <h5 className={s.h5}>Consult support</h5>
            <h1 className={s.h1}>{sup}</h1>
        </div>
      </Link>
   

    
  )
}
