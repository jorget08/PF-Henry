import React, { useEffect} from 'react'
import Sidebar from './Sidebar'
import s from './AdminDashBoard.module.css'
import Container from './Container'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getBooks, getReviews, getSales, getUsers } from '../../redux/actions'

export default function AdminDashboard() {

  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getBooks)
    dispatch(getSales())
    dispatch(getReviews())    
  }, [dispatch])
  
  return (
    <div className={s.Home}>      
        <Sidebar/>
      <div className={s.Container}>
        <Container/>
      </div>  
    </div>
  )
}
