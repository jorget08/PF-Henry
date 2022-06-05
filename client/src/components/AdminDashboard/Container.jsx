import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getUsers } from '../../redux/actions'
import Card from './Card'
import s from './Container.module.css'

export default function Container() {
  
  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)
  const allUsers = useSelector(state => state.users)
  const Array = []
  Array.push(allBooks && allBooks.length)
  Array.push(allUsers && allUsers.length)
  

  

  useEffect(()=> {
    dispatch(getBooks)
    dispatch(getUsers)       
  },[dispatch])
    
  return (
    <div className={s.Container}>
          <Card books={allBooks}/>
          <Card users={allUsers}/>
    </div>
  )
}
