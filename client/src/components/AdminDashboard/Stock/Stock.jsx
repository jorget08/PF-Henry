import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, getBooks } from '../../../redux/actions'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from './SearchBar'
import { COLUMNS } from './Columns'
import Modal from './Modal/Modal'
import { useModals } from '../../Utils/useModals'
import EditBook from './EditBook'

export default function Stock() {

  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)
  const [isOpenModal, openModal, closeModal] = useModals(false);

  useEffect(() => {
    dispatch(getBooks)    
  }, [dispatch])
  
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => allBooks, [])

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
        {
          id:"Actions",
          Header:"Actions",
          Cell: ({ row }) => ( 
            <>
            <button onClick={handleEdit}>
              Edit
            </button>
            <button onClick={handleDelete}>
              Delete
            </button>
            </>
          )
        }
      ]
    )
  }

  const handleDelete = (e) => {
    e.preventDefault()
    alert ('QUERE BORRAR VO ? SO LOCO SO?')
  }

  const handleEdit = (e, data) => {
    e.preventDefault()
    openModal(data)    
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
    <Modal isOpen={isOpenModal} closeModal={closeModal}>
      <EditBook/>
    </Modal>
    <SearchBar filter={globalFilter} setFilter={setGlobalFilter}/>
    <table {...getTableProps()} className={'Container'}>
      <thead >
        {headerGroups?.map((headerGroups) => (
        <tr {...headerGroups.getHeaderGroupProps()}>
          {headerGroups?.headers?.map(column => (
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
    </table>
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
