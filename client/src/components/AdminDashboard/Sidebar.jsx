import React from 'react'
import { Link } from 'react-router-dom'
import s from './Sidebar.module.css'
import {RiHome2Line} from 'react-icons/ri'
import {BiSupport,BiBookAdd, BiUserCheck, BiTrendingUp} from 'react-icons/bi'

export default function Sidebar() {
    
  return (
    <>
    <div className={s.sidebar}>

        <Link to='/'><img className={s.Logo} src="https://cdn-icons-png.flaticon.com/512/695/695896.png"/></Link>
        <ul>
          <hr/>
          <li className={s.Li}>            
            <Link to="/admin/" className={s.Li}> <RiHome2Line/> <span style={{marginLeft : "10px"}}> Home</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/newbook" className={s.Li}> <BiBookAdd/> <span style={{marginLeft : "10px"}}> New Book</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/stock" className={s.Li}><BiTrendingUp/> <span style={{marginLeft : "10px"}}> Stock</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/users" className={s.Li}> <BiUserCheck/> <span style={{marginLeft : "10px"}}> Users</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/supportAdmin" className={s.Li}> <BiSupport/> <span style={{marginLeft : "10px"}}> Support</span></Link>
          </li>
          <hr />
        </ul>
    </div>
    </>
  )
}
