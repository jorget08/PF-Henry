import React from 'react'
import s from './Stock.module.css'
import Book from './Book'
export default function Stock() {
  
  return (
    <div className={s.Prueba}>
        <div>
            <h1>Stock</h1>
        </div>

        <div className={s.Search}>
            <input type="search" placeholder='Search for a book'></input>
        </div>
        <div>
          <Book/>
        </div>
    </div>
  )
}
