import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getSupport} from '../../../redux/actions'
import { COLUMNS } from './Columns'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from './SearchBar'


export default function SupportAdmin() {

  const dispatch = useDispatch()
  const allSupport = useSelector(state => state.support)

  useEffect(() => {
    dispatch(getSupport())    
  }, [dispatch])
  
  console.log(allSupport)

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => allSupport, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data
  },
  useFilters,
  useGlobalFilter,
  useSortBy)

  const { globalFilter } = state
  
  return (
    <>
    <SearchBar filter={globalFilter} setFilter={setGlobalFilter}/>
    <table {...getTableProps()} className={'Container'}>
      <thead >
        {headerGroups.map((headerGroups) => (
        <tr {...headerGroups.getHeaderGroupProps()}>
          {headerGroups.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {column.isSorted ? (column.isSortedDesc ? <BiCaretDown/> : <BiCaretUp/>) : ''}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
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
    </>
  )
}
