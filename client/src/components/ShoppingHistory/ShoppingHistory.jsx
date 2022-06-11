import NavBar from "../NavBar/NavBar";
import { getShoppingHistory, getUsers } from "../../redux/actions";
import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { COLUMNS } from "./Columns";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from './SearchBar'

export default function ShoppingHistory() {

  const user = useSelector((state) => state.user);
  const shoph = useSelector((state) => state.ShoppingHistory);
  let id = user.idUser;
  let a=[]
  let finalpay=[]
  let pay = shoph.payments?.map((e) => e.paymentbooks);
  pay?.forEach(element => {
    a.push(element)
  })
 
  
  a.forEach((element,i) => {
    element.forEach((e,i)=>finalpay.push(e))  }) 


  console.log("SOYYYY?",finalpay)

  finalpay.map(e=>e.createdAt=e.createdAt.split("T")[0])


  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch(getShoppingHistory(id));
  }, [dispatch]);

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => shoph, [])

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
    <NavBar/>
    <div>
      <h1>Shopping History</h1>
      <br></br>
    </div>

    <SearchBar filter={globalFilter} setFilter={setGlobalFilter}/>
    <table {...getTableProps()} className={'Container'}>
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
};

