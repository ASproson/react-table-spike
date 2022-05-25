import React from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import GlobalFilter from "./GlobalFilter";

const Table = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  // Render the UI for table
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()} border="1">
        <thead>
          {/* Collect column headers from useTable state */}
          {headerGroups.map((headerGroup) => (
            // For each header create a column header
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {/* Collect row data from useTable state */}
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              // Map over each row in the table, pasting each available row of data into each cell
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
    </>
  );
};

export default Table;
