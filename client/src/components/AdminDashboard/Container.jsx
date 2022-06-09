import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getUsers } from '../../redux/actions'
import Card from './Cards/Card'
import CardU from './Cards/CardU'
import CardB from './Cards/CardB'
import s from './Container.module.css'

export default function Container() {
  
  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)
  const allUsers = useSelector(state => state.users) 

  useEffect(()=> {
    dispatch(getUsers())       
    dispatch(getBooks)
  },[dispatch])
    
  return (
    <>
    <h1 className={s.h1}>Welcome, this is your god mode!</h1>
    <div className={s.Container}>
          <Card books={allBooks}/>
          <CardU users={allUsers}/>
          <CardB/>
    </div>
    </>
  )
}