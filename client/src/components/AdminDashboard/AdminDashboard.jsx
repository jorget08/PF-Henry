import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import s from './AdminDashBoard.module.css'
import Container from './Container'
import { useDispatch } from 'react-redux'
import { getBooks, getUsers } from '../../redux/actions'
import PRUEBASIDEBAR from './PRUEBASIDEBAR'


export default function AdminDashboard() {



  return (
    <div className={s.Home}>      
        {/* <Sidebar/> */}
        <PRUEBASIDEBAR/>
      <div className={s.Container}>
          <Container/>
      </div>  
    </div>
  )
}
