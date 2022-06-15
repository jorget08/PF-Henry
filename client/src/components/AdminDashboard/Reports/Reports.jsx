import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteAdmReview, getReviews, getBooks, getSales, getUsers, deleteReview } from '../../../redux/actions'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from '../SearchBar/SearchBar'
import Swal from "sweetalert2";
import { ImCheckmark, ImCross } from "react-icons/im";



export default function Reports() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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
        console.log(row)
        return row.user.name.charAt(0).toUpperCase() + row.user.name.slice(1) + ' ' + row.user.lastName.charAt(0).toUpperCase() + row.user.lastName.slice(1)
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
          row.description + ' | ' + row.createdAt.slice(0, 10)
        )
      },
    },
    {
      Header: "Actions",
      accessor: (row) => {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", width: '70px' }}>
              <button className='iconTik' onClick={(e) => handleDelete(e, row.id)}><ImCheckmark></ImCheckmark></button>
              <button className='iconDash delete' onClick={(e) => handleDiscard(e, row)}><ImCross /></button>
            </div>
          </>
        )
      },
    },

  ]

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => allReviews, [allReviews])

  const handleDiscard = (e, row) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete review!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(row.bookId, row.id))
        window.location.reload()
      }
    })


  }

  const handleDelete = (e, row) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, discard report!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdmReview(row))
        window.location.reload()
      }
    })


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

    {user.rols?.name === "admin" ?
    <>
    <h2 className='h1'>Reports</h2>
    <SearchBar filter={globalFilter} setFilter={setGlobalFilter}/>
    {allReviews && <table {...getTableProps()} className={'Container'}>
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
    </>:
    <div className="aviso">
    <h2>You don't have access here, please go back home</h2>
    <Link to={`/home`}>
    <button className='minimize'>Back home</button>
    </Link>
    </div>}
    </>
  )
}
