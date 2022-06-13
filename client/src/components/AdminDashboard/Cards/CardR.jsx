import React from 'react'
import s from './Card.module.css'
import { Link } from 'react-router-dom'

export default function Card({reports}) {
    const reviews = reports && reports.length;

   
  return (
      <Link to='/admin/reports'>
        <div className={s.Card}>
            <h5 className={s.h5}>Reports</h5>
            <h1 className={s.h1}>{reviews}</h1>
        </div>
      </Link>
   

    
  )
}
