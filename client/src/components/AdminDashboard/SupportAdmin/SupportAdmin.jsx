import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
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
  const [isOpenModal, openModal, closeModal] = useModals(false);
  const [resp, setResp] = useState({name: "", email: "", message: "", id: null})
  const [bool, setBool] = useState(true) 

  const [respon, setResponse] = useState("")

  useEffect(() => {
    dispatch(getSupport())    
  }, [dispatch, supportData])

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => supportData, [supportData])

  const handleClick = (e, {name, email, id}) => {
    e.preventDefault();
    if (id === null) setResp({...resp, name: name, email: email})
    else {setResp({response: "", idSupport: id})}
    console.log("Soy el ID y el mail", name, email)
    openModal()
  }
  
  const handleChangeInput = (e) => {
    setResponse(e.target.value)
    setResp({...resp, message: respon})
    console.log(respon)
  }

  const submitReply = (e) => {
    e.preventDefault();
    dispatch(replySupportGuest(resp))
    console.log(resp)
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
            <div>
              <button onClick={e => handleClick(e)}>Reply by mail</button>
            </div>
            /* {
              (row.values.userIdUser === undefined && row.values.status === 0)? <button onClick={(e) => handleClick(e, {
                name: row.values.nameGuess,
                email: row.values.emailGuess
              })}>
              Reply by mail 
              </button>:
              (row.values.userIdUser.length && row.values.status === 0)?
              <button onClick={(e) => handleClick(e, {id: row.values.idSupport})}>
              Reply
              </button>: <span>-</span>
            } */
            
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
    <h2 className='h1'>Support</h2>
    <SearchBar filter={globalFilter} setFilter={setGlobalFilter}/>
    <select style={{marginLeft:"150px", width:"150px"}}onChange={(e) => handleSelect(e)}>
      <option value="default">Filter by</option>
      <option value="to_answer">To answer</option>
      <option value="respond">Respond</option>
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
    </>
  )
}
