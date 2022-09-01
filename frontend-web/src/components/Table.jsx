import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createNamesTableCells(row){
    const tableCellElements = Object.getOwnPropertyNames(row).map((name) => {
        return <TableCell>{name}</TableCell>
    })
    return tableCellElements
}
function createValuesTableCells(row){   
    const tableCellElements = Object.values(row).map((name) => {
        return <TableCell >{name}</TableCell>
    })
    return tableCellElements
}


export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {createNamesTableCells(props.rows[0])}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            
            <TableRow
              key={Object.values(row)[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                   {createValuesTableCells(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
