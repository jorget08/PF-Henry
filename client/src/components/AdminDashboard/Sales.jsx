import React, { useEffect, useState } from 'react'
import s from './Stock.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../../redux/actions'
import DataTable from 'react-data-table-component'

export default function Stock() {

  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)

  useEffect(() => {
    dispatch(getBooks)    
  }, [dispatch])
  console.log("I'm the book",allBooks)
  
  

  const column = [
  {
      name : "User",
      selector: "title",
      sortable: true

  },
  {
      name : "Title",
      selector: "author",
      sortable: true

  },
  {
    name : "Price",
    selector: "price",
    sortable: true

  },
  ]
  
  return (
    <div className={s.rdt_Table}>
      <DataTable
        columns={column}
        data={allBooks}
        table="Sales"
        pagination
      />
    </div>
  )
}
