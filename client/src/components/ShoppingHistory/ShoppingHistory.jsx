import NavBar from "../NavBar/NavBar";
import { getShoppingHistory, updateDone } from "../../redux/actions";
import React, { useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { COLUMNS } from "./Columns";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { BsFillBagCheckFill } from "react-icons/bs";
import SearchBar from "./SearchBar";

export default function ShoppingHistory() {
  const user = useSelector((state) => state.user);
  var { payments, paymentcryptos } = useSelector(
    (state) => state.ShoppingHistory
  );
  let id = user.idUser;

  if (payments === undefined) var dat = [];
  else var dat = payments.concat(paymentcryptos);

  const dispatch = useDispatch();

  const handleChange2 = ({ e, id }) => {
    e.preventDefault();
    dispatch(updateDone(id));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getShoppingHistory(id));
  }, [dispatch]);

  var columns = useMemo(() => COLUMNS, []);
  var data = useMemo(() => dat, [payments]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            {row.original.deliveryStatus === "Send" ? (
              <button className='sendorder' style={{ borderRadius: "10px", backgroundColor: "##dbdbdb", width: '150px', height: '50px', cursor: "pointer" }}
                onClick={(e) => handleChange2({ e, id: row.original.id })}
              >
                I've already received my order<BsFillBagCheckFill className="iconOrder" />
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
      <NavBar />
      <div>
        <h1 style={{ marginLeft: '5%', fontWeight: '400', fontFamily: 'Source Sans Pro', fontSize: '50px', color: '#3888ba' }}>Shopping History</h1>
        <br></br>
      </div>

      <SearchBar filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} style={{ width: '90%', margin: 'auto' }}>
        <thead>
          {headerGroups.map((headerGroups) => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <BiCaretDown />
                    ) : (
                      <BiCaretUp />
                    )
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row) => {
            prepareRow(row);
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
    </>
  );
}
