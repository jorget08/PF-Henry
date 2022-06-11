import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getSupport, replySupport} from '../../../redux/actions'
import { COLUMNS } from './Columns'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from './SearchBar'
import { useModals } from '../../Utils/useModals'
import Modal from '../../Modal/Modal'


export default function SupportAdmin() {

  const dispatch = useDispatch()
  const supportData = useSelector((state) => state.support)
  const [isOpenModal, openModal, closeModal] = useModals(false);
  const [sup, setSup] = useState("")

  const [respon, setResponse] = useState("")

  useEffect(() => {
    dispatch(getSupport())    
  }, [dispatch])

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => supportData, [supportData])

  const handleClick = (e, data) => {
    e.preventDefault();
    const idSup = data;
    setSup(idSup)
    console.log(sup)
    openModal()
  }
  
  const handleChangeInput = (e) => {
    setResponse(e.target.value)
    console.log(respon)
  }

  const submitReply = (e) => {
    e.preventDefault();
    dispatch(replySupport({
      idSupport: sup, 
      response: respon
    }))
    alert("aca toy")
    closeModal()
  }

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
        {
          id:"Actions",
          Header:"Actions",
          Cell: ({ row }) => ( 
            <button onClick={(e) => handleClick(e, row.values.idSupport)}>
              Reply
            </button>
          )
        }
      ]
    )
  }


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
  }, tableHooks,
  useFilters,
  useGlobalFilter,
  useSortBy)

  const { globalFilter } = state
  
  return (
    <>
    <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <div className="reply">
          <label>Put the reply here!</label>
          <input type="text" value={respon} onChange={e => handleChangeInput(e)}></input>
          <button onClick={(e) => submitReply(e)}>Send reply!</button>
        </div>
    </Modal>
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
