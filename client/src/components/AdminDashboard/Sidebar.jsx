import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux';
import s from './Sidebar.module.css'
import { RiHome2Line } from 'react-icons/ri'
import { BiSupport, BiBookAdd, BiUserCheck, BiTrendingUp, BiDollar, BiCommentX } from 'react-icons/bi'


export default function Sidebar() {
  const user = useSelector(state => state.user)
  return (
    <>
    {user.rols?.name === "admin" ?
      <div className={s.sidebar}>

        <Link to='/'> <img className={s.Logo} src="https://cdn-icons-png.flaticon.com/512/695/695896.png" /></Link>
        <ul style={{ padding: 0 }}>
          <hr className={s.hr} />
          <li className={s.Li}>
            <Link to="/admin/" className={s.Li}> <RiHome2Line /> <span style={{ marginLeft: "10px" }}> Home</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/newbook" className={s.Li}> <BiBookAdd /> <span style={{ marginLeft: "10px" }}> New Book</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/stock" className={s.Li}><BiTrendingUp /> <span style={{ marginLeft: "10px" }}> Stock</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/users" className={s.Li}> <BiUserCheck /> <span style={{ marginLeft: "10px" }}> Users</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/sales" className={s.Li}> <BiDollar /> <span style={{ marginLeft: "10px" }}> Sales</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/reports" className={s.Li}> <BiCommentX /> <span style={{ marginLeft: "10px" }}> Reports</span></Link>
          </li>
          <hr />
          <li className={s.Li}>
            <Link to="/admin/supportAdmin" className={s.Li}> <BiSupport /> <span style={{ marginLeft: "10px" }}> Support</span></Link>
          </li>
          <hr />
        </ul>
      </div>:
      ""}
    </>
  )
}
