import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getUsers } from '../../redux/actions'
import Card from './Card'
import CardU from './CardU'
import s from './Container.module.css'

export default function Container() {
  
  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)
  const allUsers = useSelector(state => state.users) 

  useEffect(()=> {
    dispatch(getBooks)
    dispatch(getUsers)       
  },[dispatch])
    
  return (
    <div className={s.Container}>
          <Card books={allBooks}/>
          <CardU users={allUsers}/>
    </div>
  )
}
