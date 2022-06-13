export const COLUMNS = [    

            {   
                Header: 'User',
                accessor: (row) => {
                    return row.user.name + ' ' + row.user.lastName;
                },
            },
            {          
                Header: "Email",
                accessor: (row) => {
                    return row.user.email;
                }
            },
            {        
                Header: "Book's Title",
                accessor: (row) => {
                    return (
                        row.book.title
                    )
                },
            },       
            {        
                Header: "Reviews",
                accessor: (row) => {
                    return (
                        row.description + ' ' + row.createdAt
                    )
                },
            },     
  
]