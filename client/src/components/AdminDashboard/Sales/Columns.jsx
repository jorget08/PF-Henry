export const GROUPED_COLUMNS = [
    {
        Header: 'User',
        columns: [
            {   
                Header: 'Name',
                accessor: (row) => {
                    return row.users[0]?.name.charAt(0).toUpperCase() + row.users[0]?.name?.slice(1);
                },
            },
            {          
                Header: 'Lastname',
                accessor: (row) => {
                    return row.users[0]?.lastName.charAt(0).toUpperCase() + row.users[0]?.lastName?.slice(1);
                }
            },
            {        
                Header: 'Email',
                accessor: 'users[0].email',
            },
        ]
    },
    {
        Header: 'Purcharse Info',
        columns: [
            {        
                Header: 'Purchase',
                accessor: (row) => {
                    return row.paymentbooks?.map(e => `${e.title} (${e.cant})`).join(',  ')                     
                }  
                
            },
            {        
                Header: 'Method of pay',
                accessor: (row) => {
                    return row.paymentSource?.charAt(0).toUpperCase() + row.paymentSource?.slice(1);
                },
        
            },
            {        
                Header: 'Import',
                accessor: (row) => {
                    return "$" + row.totalPrice + ".00";       
            },
            }
        ]
    }
]