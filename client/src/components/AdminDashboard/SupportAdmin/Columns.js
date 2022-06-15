export const COLUMNS = [
    {
        Header: 'UserID',
        accessor: row => {if (row.userIdUser === null) return "None"
                            else return row.userIdUser},
    }, 
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Name',
        accessor: 'name',
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