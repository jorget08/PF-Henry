import EditableCell from './EditableCell'
import isEdit from './Stock'


export const COLUMNS = [
    {   
        Header: 'Title',
        accessor: 'title',
        Cell : isEdit ? EditableCell : ' ',
    },
    {   
        Cell : EditableCell,
        Header: 'Author',
        accessor: 'author'
    },
    {
        Cell : EditableCell,
        Header: 'Stock',
        accessor: 'stock',
    },
    {
        Cell : EditableCell,
        Header: 'Price',
        accessor: 'price',
    },
]