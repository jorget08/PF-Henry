export const COLUMNS = [
    {
        Header : "Name",
        accessor: (row) => {
            return row.name.charAt(0).toUpperCase() + row.name.slice(1)
        }
    },
    {
        Header: "Lastname",
        accessor: (row) => {
            return row.lastName.charAt(0).toUpperCase() + row.lastName.slice(1)
        }
    },
    {
        Header : "Email",
        accessor: "email",
    },
    {
        Header : "Register Date",
        accessor: (row) => {
            return row.createdAt.slice(0,10)
        }
    },
    {
        Header : "Rol",
        accessor:(row) => {
            return row.rols.name.toUpperCase()
        } 
    },
    ]