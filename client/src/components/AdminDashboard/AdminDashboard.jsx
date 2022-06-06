import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import s from './AdminDashBoard.module.css'
import Container from './Container'

export default function AdminDashboard() {
  
  return (
    <div className={s.Home}>      
        <Sidebar/>
      <div className={s.Container}>
        <Container/>
      </div>  
    </div>
  )
}
