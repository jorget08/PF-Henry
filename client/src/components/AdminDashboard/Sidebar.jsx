import React from 'react'
import { Link } from 'react-router-dom'
import s from './Sidebar.module.css'
import { RiHome2Line } from 'react-icons/ri';

export default function Sidebar() {
    
  return (
    <>
    <div className={s.sidebar}>
        <ul>
          <hr/>
          <li className={s.Li}>
            <span>{RiHome2Line}</span>
            <Link to="/admin/" className={s.Li}>  Home ▶ </Link>
          </li>
          <hr />
          <li>
            <Link to="/admin/newbook" className={s.Li}>New book ▶</Link>
          </li>
          <hr />
          <li>
            <Link to="/admin/stock" className={s.Li}>Stock ▶</Link>
          </li>
          <hr />
          <li>
            <Link to="/admin/users" className={s.Li}>Users ▶</Link>
          </li>
          <hr />
        </ul>
    </div>
    </>
  )
}
