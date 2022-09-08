import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
    type: "boolean",
    // valueOptions: ["United Kingdom", "Spain", "Brazil"]
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
    type: "boolean",

  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 123, lastName: true, firstName: 'Jon', age: 35, isSelected:true },
  { id: 2, lastName: false, firstName: 'Cersei', age: 42,isSelected:false  },
  { id: 3, lastName: true, firstName: 'Jaime', age: 45,isSelected:true  },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16,isSelected:true  },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
    const [selectionModel, setSelectionModel] = React.useState(() =>
    rows.filter((r) => r.isSelected===true).map((r) => r.id),
  );
  console.log(selectionModel)

  return (
    <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>


    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
      components={{
        BaseCheckbox: Checkbox
      }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        selectionModel={selectionModel}
        onSelectionModelChange={setSelectionModel}
      />
    </Box>
    </Paper>
    </Container>
  );
}
