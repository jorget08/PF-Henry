import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import s from './AdminDashBoard.module.css'
import {BrowserRouter, Route } from 'react-router-dom'

export default function AdminDashboard() {


  return (
    <div className={s.Home}>      
        <Sidebar/>

      <div className={s.Container}>
          <h1>HOLA</h1>
      </div>  
    </div>
  )
}
