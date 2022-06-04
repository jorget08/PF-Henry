import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/actions'
import s from './Users.module.css'
import DataTable from 'react-data-table-component'


export default function Users () {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const customStyles = {
        rows: {
            style: {

                minHeight: '50px',
                paddingLeft: '90px'
            },
        },
        headCells: {
            style: {
                paddingLeft: '90px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '100px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };
    const column = [
    {
        name : "Name",
        selector: "name",
        sortable: true

    },
    {
        name : "Lastname",
        selector: "lastName",
        sortable: true

    },
    {
        name : "Email",
        selector: "email",
        sortable: true

    },
    ]

    useEffect(() => {
        dispatch(getUsers())
        console.log("SOY LOS USUARIOS", users)        
    },[dispatch])

    
  return (
    <div className={s.rdt_Table}>
      <DataTable
      columns={column}
      data={users}
      tabla="Users"
      pagination
      customStyles={customStyles}
      />
    </div>
  )
}
