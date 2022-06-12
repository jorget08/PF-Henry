export const COLUMNS = [
    {
        Header: "Title",
        accessor: (row) => {
            return row.paymentbooks?.map(e => e.title).join(',  ')                 
        },
    },
    {
        Header: "Author",
        accessor: (row) => {
            return row.paymentbooks?.map(e => e.author).join(',  ') 
        },
    },
    {        
        Header: 'Import',
        accessor: (row) => {
            return "$" + row.totalPrice + ".00";       
        },
    },
    {
        Header: "Quantity",
        accessor: (row) => {
            return row.paymentbooks.length
        },
    },
    {
        Header: "paymentSource",
        accessor: (row) => {
            return row.paymentSource
        },
    },
    {
        Header: "Date",
        accessor: (row) => {
            return row.createdAt
        }
    },
]

