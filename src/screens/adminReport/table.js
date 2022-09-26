import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./table.css";

export const Table = ({ columns, data, noDataComponent, ...rest }) => {
  const tableColumns = useMemo(() => columns, []);
  const tableData = useMemo(() => data, [data]);

  // const tableInstance = useTable({
  //     columns: columns,
  //     data : data
  //   });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data: tableData });

  if (!rows.length) {
    if (noDataComponent) return noDataComponent;
    return <>No data</>;
  }
  return (
    <div id="table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
    </div>
  );
};
