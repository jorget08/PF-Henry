export const COLUMNS = [
    {
        Header: "Title",
        accessor: (row) => {
            console.log("TUCARA", row.paymentbooks?.map(e => e.title))
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
            return row.payments?.paymentsbooks?.length
        },
    },
    {
        Header: "Date",
        accessor: (row) => {
            return "createdAt"
        }
    },
]

