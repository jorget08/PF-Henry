import {CSearch} from './CSearch'

export const COLUMNS = [
    {
        Header: 'UserID',
        accessor: row => {if (row.userIdUser === null) return "None"
                            else return row.user},
    },
    {
        Header: 'User',
        accessor: row => {if (row.user === null) return "Guest"
                            else return row.user},
    },  
    {
        Header: 'Email',
        accessor: 'emailGuess',
    },
    {
        Header: 'Name',
        accessor: 'nameGuess',
    },
    {
        Header: 'Comment',
        accessor: 'comment',
    },
    {
        Header: 'Response',
        accessor: 'response',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Comment Date',
        accessor: 'date',
    },
    {
        Header: 'Id Support',
        accessor: 'idSupport',
    },
]