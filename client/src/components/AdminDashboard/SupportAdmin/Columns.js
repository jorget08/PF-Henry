export const COLUMNS = [
    {
        Header: 'Type',
        accessor: row => { return row.isUser ? "User" : "Guest"},
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
        accessor: row => <div style={{width:"400px", height:"100px"}}>{row.comment}</div>,
    },
    {
        Header: 'Status',
        accessor: row => { return (row.status === 0) ? 
        <div style={{color:"red", border:"solid red 5px", padding:"10px"}}>Pending</div> : 
        <div style={{color:"green", border:"solid green 5px", padding:"10px"}}>Answered</div>},
    },
    {
        Header: 'Comment Date',
        accessor: (row) => {
            return (row.date.slice(0,10) + " - " + row.date.slice(11,19));       
    },
    },
    {
        Header: 'Id Support',
        accessor: 'idSupport',
    },
]