export const COLUMNS = [
     {
        Header: "ID Purchase",
        accessor: (row) => {
            return row.id                
        },
    },
    {
        Header: "Title",
        accessor: (row) => {
            
            return row.paymentbooks?.map(e => `${e.title} (${e.cant})`).join(',  ')                 
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
            return row.createdAt.slice(0,10)
        }
    },
    {
        Header: "Ethereum Transaction Details",
        accessor: (row) => {
            let has=row.hash
            let ref="https://rinkeby.etherscan.io/tx/"+has
            return row.hash? <a href={ref} target="_blank">Etherscan</a>:null
        }
    },
]

