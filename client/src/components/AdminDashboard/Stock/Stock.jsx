import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { bookEdit, deleteBook, deleteReview, getBooks, getDetail } from '../../../redux/actions'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from '../SearchBar/SearchBar'
import { COLUMNS } from './Columns'
import Modal from './Modal/Modal'
import { useModals } from '../../Utils/useModals'
import EditBook from './EditBook'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import Swal from "sweetalert2";

export default function Stock() {

  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)
  const user = useSelector(state => state.user)
  const bookDet = useSelector(state => state.detail)
  const [isOpenModal, openModal, closeModal] = useModals(false);

  useEffect(() => {
    dispatch(getBooks)
    dispatch(getDetail())    
  }, [dispatch])

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => allBooks, [allBooks])

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          <div style={{ display: 'flex' }}>
            <button className='iconDash' onClick={e => handleEdit(e, row)}>
              <AiFillEdit size={30} />
            </button>
            <button className='iconDash delete' onClick={(e) => handleDelete(e, row)}>
              <FaRegTrashAlt size={30} />
            </button>
          </div>

        )
      }
    ]
    )
  }


  function handleDelete(e, row) {
    e.preventDefault()
   
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete book!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBook(row.original.id))
    window.location.reload()     
      }
    })
   
  }

  const handleEdit = (e, row) => {
    e.preventDefault()
    dispatch(getDetail(row?.original?.id))
    dispatch(bookEdit(row?.original?.id))
    console.log("ROW ID", row.original.id)
    openModal()
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
    tableHooks,
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
      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <EditBook />
      </Modal>
      <h2 className='h1'>Stock</h2>
      <SearchBar filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className={'Container'}>
        <thead >
          {headerGroups?.map((headerGroups) => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups?.headers?.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? <BiCaretDown /> : <BiCaretUp />) : ''}

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {
            page.map(row => {
              prepareRow(row)
              return (
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
      <div className="button">
        <span>
          Go to page : {' '}
          <input type='number' defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
          />
        </span>
        <span>
          Page {' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
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
        <button  onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
      </>:
      <div className="aviso">
      <h2>You don't have access here, please go back home</h2>
      <Link to={`/home`}>
      <button className='minimize'>Back home</button>
      </Link>
      </div>
        }
    </>
  )
}
