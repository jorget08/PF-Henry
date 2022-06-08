import React, { useEffect } from 'react'
import s from './Support.module.css'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { getSupport } from '../../redux/actions'


export default function SupportAdmin () {

    const dispatch = useDispatch()
    const support = useSelector(state => state.support)
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
        name : "Email",
        selector: "email",
        sortable: true

    },
    {
        name : "Comment",
        selector: "comment",
        sortable: true

    },
    ]

    useEffect(() => {
        dispatch(getSupport())    
    },[dispatch])

    
  return (
    <div className={s.rdt_Table}>
      <DataTable
      columns={column}
      data={support}
      tabla="Support"
      pagination
      customStyles={customStyles}
      />
    </div>
  )
}
