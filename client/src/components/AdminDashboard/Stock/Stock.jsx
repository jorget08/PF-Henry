import React, { useEffect, useState, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks} from '../../../redux/actions'
import { COLUMNS } from './Columns'


export default function Stock() {

  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)

  useEffect(() => {
    dispatch(getBooks)    
  }, [dispatch])
  

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => allBooks, [])

  const tableInstance = useTable({
    columns,
    data
  })
  
  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance
  
  return (
    <table {...getTableProps()} className={'Container'}>
      <thead >
        {headerGroups.map((headerGroups) => (
        <tr {...headerGroups.getHeaderGroupProps()}>
          {
            headerGroups.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
        </tr>            
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {
          rows.map(row => {
            prepareRow(row)
            return(
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }                
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
