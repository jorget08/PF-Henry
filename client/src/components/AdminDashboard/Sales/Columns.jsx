export const GROUPED_COLUMNS = [
    {
        Header: 'User',
        columns: [
            {   
                Header: 'Name',
                accessor: 'users[0].name',
            },
            {          
                Header: 'Lastname',
                accessor: 'users[0].lastName'
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
                accessor: 'paymentbooks[0].title',
            },
            {        
                Header: 'Method of pay',
                accessor: 'paymentSource',
        
            },
            {        
                Header: 'Import',
                accessor: 'totalPrice',
        
            },
        ]
    }
]