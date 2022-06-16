import React, { useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getSales, updateSent } from "../../../redux/actions";
import { GROUPED_COLUMNS } from "./Columns.jsx";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import SearchBar from '../SearchBar/SearchBar'
import { BsCartCheckFill } from "react-icons/bs";



export default function Sales() {
  const dispatch = useDispatch();
  const allSales = useSelector((state) => state.sales);
  const user = useSelector(state => state.user)

  console.log(allSales);

  const handleChange = ({ e, id }) => {
    e.preventDefault();
    dispatch(updateSent(id));
    window.location.reload();
  };



  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);
  setTimeout(() => {
    console.log("SALE SALE SALE", allSales);
  }, "3000");

  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => allSales, [allSales]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            {row.original.deliveryStatus === "Pending" ? (
              <button className='sendorder' style={{ borderRadius: "10px", backgroundColor: "##dbdbdb", width: '150px', height: '50px', cursor: "pointer" }} onClick={(e) => handleChange({ e, id: row.original.id })}>
                Send order <BsCartCheckFill className="iconOrder" />
              </button>
            ) : null}
            {row.original.deliveryStatus === "Order received" ? <p>Complete</p> : null}
          </div>
        ),
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    tableHooks,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  return (
    <>

      {user.rols?.name === "admin" ?
        <>
          <h2 className='h1'>Sales</h2>
          <SearchBar filter={globalFilter} setFilter={setGlobalFilter} />
          <table {...getTableProps()} className={'Container'}>
            <thead >
              {headerGroups.map((headerGroups) => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                  {headerGroups.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {column.isSorted ? (column.isSortedDesc ? <BiCaretDown /> : <BiCaretUp />) : ''}

                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps}>
              {
                page.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="button">
            <span>
              Go to page :{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
              />
            </span>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {">>"}
            </button>
          </div>
        </> :
        <div className="aviso">
          <h2>You don't have access here, please go back home</h2>
          <Link to={`/home`}>
            <button className='minimize'>Back home</button>
          </Link>
        </div>}
    </>
  );
}
