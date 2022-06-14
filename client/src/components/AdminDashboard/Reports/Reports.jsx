import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { discardReport, deleteAdmReview, getReviews, getBooks, getSales, getUsers } from '../../../redux/actions'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from '../SearchBar/SearchBar'


export default function Reports() {
  
  const dispatch = useDispatch()
  const allReviews = useSelector(state => state.reviews)
  console.log("I'm the reviews bitch", allReviews)
  
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getBooks)
    dispatch(getSales())
    dispatch(getReviews())    
  }, [dispatch])
  
  
  const COLUMNS = [    

    {   
        Header: 'User',
        accessor: (row) => {
            return row.user.name + ' ' + row.user.lastName;
        },
    },
    {          
        Header: "Email",
        accessor: (row) => {
            return row.user.email;
        }
    },
    {        
        Header: "Book's Title",
        accessor: (row) => {
            return (
                row.book.title
            )
        },
    },       
    {        
        Header: "Reviews",
        accessor: (row) => {
            return (
                row.description + ' ' + row.createdAt
            )
        },
    }, 
    {        
        Header: "Actionss",
        accessor: (row) => {
            return (
                <button onClick={(e) => handleDelete(e, row.id)}>DISCARD</button>
            )
        },
    },    

]
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => allReviews, [allReviews])

  const handleDelete = (e, row) => {
    e.preventDefault()
    console.log ("SOY e", row)
    dispatch(deleteAdmReview(row))  
    alert ('Report deleted!')
    window.location.reload()
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data
  },
  useGlobalFilter,
  useSortBy,
  usePagination,
  )

  const { globalFilter } = state
  const { pageIndex, pageSize } = state
  return (
    <>
    <h2 className='h1'>Reports</h2>
    <SearchBar filter={globalFilter} setFilter={setGlobalFilter}/>
    {allReviews.length && <table {...getTableProps()} className={'Container'}>
      <thead >
        {headerGroups.map((headerGroups) => (
        <tr {...headerGroups.getHeaderGroupProps()}>
          {headerGroups.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {column.isSorted ? (column.isSortedDesc ? <BiCaretDown/> : <BiCaretUp/>) : ''}
              
              </th>
            ))}
        </tr>            
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {
          page.map(row => {
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
    </table>}
    <div className="button">
      <span>
         Go to page : {' '}
        <input type='number' defaultValue={pageIndex+1}
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(pageNumber)
          }}
        />
      </span>
      <span>
        Page {' '}
        <strong>
          {pageIndex +1} of {pageOptions.length}
        </strong>
      </span>
      <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
        {
          [10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))
        }
      </select>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
    </div>
    </>
  )
}
