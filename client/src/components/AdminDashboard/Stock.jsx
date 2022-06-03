import React, { useEffect, useState } from 'react'
import s from './Stock.module.css'
import Book from './Book'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../../redux/actions'

export default function Stock() {

  const dispatch = useDispatch()

  const allBooks = useSelector(state => state.book)
  
  useEffect(() => {
    dispatch(getBooks)
    
  }, [dispatch])
  console.log("SOY LOS LIBROS EN STOCK", allBooks)
  
  return (
    <div className={s.Prueba}>
        <div>
            <h1>Stock</h1>
        </div>

        <form className={s.Search}>
            <input type="search" placeholder='Search for a book' ></input>
        </form>
        <div className={s.Inputs}>
              <label>Book: </label>              
                      <select className={s.IInputs}>
                          <option>Books</option>
                          {allBooks?.map((c) => {
                          return(
                              <option size="20" key={c.title} name ={c.author}>{c.title}</option>
                          )
                          })}                     
                      </select>
        </div>
    </div>
  )
}
