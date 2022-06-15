import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { filterSupportStatus, getSupport, replySupport, replySupportGuest} from '../../../redux/actions'
import { COLUMNS } from './Columns'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from '../SearchBar/SearchBar'
import { useModals } from '../../Utils/useModals'
import Modal from '../../Modal/Modal'
import Swal from "sweetalert2";

export default function SupportAdmin() {

  const dispatch = useDispatch()
  const supportData = useSelector((state) => state.support)
  const user = useSelector(state => state.user)
  const [isOpenModal, openModal, closeModal] = useModals(false);
  const [resp, setResp] = useState({name: "", email: "", message: "", id: null})
  const [bool, setBool] = useState(true) 

  useEffect(() => {
    dispatch(getSupport())    
  }, [dispatch])

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => supportData, [supportData])

  const handleClick = (e, row) => {
    e.preventDefault();
    setResp({...resp, name: row.original.name, email: row.original.email, id: row.original.idSupport})
    openModal()
  }
  
  const handleChangeInput = (e) => {
    setResp({...resp, message: e.target.value})
  }

  const submitReply = (e) => {
    e.preventDefault();
    console.log(resp)
    dispatch(replySupportGuest(resp))
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: "Answer sent!"
    })
    setBool(!bool)
    closeModal()
    setTimeout(() => window.location.reload(), 2000) 
  }

  const handleSelect = (e) => {
    e.preventDefault();
    dispatch(filterSupportStatus(e.target.value))
  }

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
        {
          id:"Actions",
          Header:"Actions",
          Cell: ({ row }) => ( 
            (row.original.status === 0) && <div>
              <button onClick={e => handleClick(e, row)}>Reply by mail</button>
            </div>
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
    {user.rols?.name === "admin" ?
    <>
    <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <div className="reply">
          <label>Put the reply here!</label>
          <input type="text" value={resp.message} onChange={e => handleChangeInput(e)}></input>
          <button onClick={(e) => submitReply(e)}>Send reply!</button>
        </div>
    </Modal>
    <h2 className='h1'>Support</h2>
    <SearchBar filter={globalFilter} setFilter={setGlobalFilter}/>
    <select className='selectora' style={{marginLeft:"150px", width:"150px"}}onChange={(e) => handleSelect(e)}>
      <option value="default" disabled>Filter by</option>
      <option value="to_answer">To answer</option>
      <option value="respond">Answered</option>
      <option value="all">All</option>
    </select>
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
