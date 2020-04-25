import React, { useMemo } from 'react';

import { useTable } from 'react-table'

const DataTable = ({tableData, rowCount, filteredColumns}) => {
	
	let hs = tableData.headers;
	let rs = tableData.rows

	//rowCount filter
	if(rowCount){
		rs = rs.filter((h, idx) => idx < (rowCount - 1))
	}

	//column filter
	if(filteredColumns){

	}

	//"Default" table data config
	const colDefs = useMemo(() => hs)
	const rowDefs = useMemo(() => rs)

	const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
} = useTable({ columns: colDefs, data: rowDefs })
				
	// Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default DataTable;
