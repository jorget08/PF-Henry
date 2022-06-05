import React from 'react'
import { Link } from 'react-router-dom'
import s from './Sidebar.module.css'

export default function Sidebar() {
    
  return (
    <>
    <div className={s.sidebar}>
        <ul>
          <li>
            <Link to="/admin/">Home</Link>
          </li>
          <li>
            <Link to="/admin/newbook">New book</Link>
          </li>
          <li>
            <Link to="/admin/stock">Stock</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
        </ul>
    </div>
    </>
  )
}
