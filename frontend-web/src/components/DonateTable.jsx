import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import {getEventRegisters, createDonation, reset } from '../features/donations/donationSlice'
import { useNavigate } from 'react-router-dom'

const columns = [
   {
    field: 'tz',
    headerName: 'ID',
    width: 150,
  }, 
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },

]



export default function DataGridDemo({rows, userId, eventId}) {

  const dispatch = useDispatch()
    const navigate = useNavigate()


    const [selectionModel, setSelectionModel] = React.useState(() =>
    rows.filter((r) => r.isDonated===true).map((r) => r._id),
  );

  function handleClick(){
    const parameters = {
      id:userId,
      usersId:selectionModel,
      eventId:eventId
    }
    dispatch(createDonation(parameters))
    navigate('/event',{state:{event_id:eventId}});

  }

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
        getRowId={(row) => row._id}
      />
    </Box>
        <Button variant="contained" onClick={handleClick}>Update</Button>

    </Paper>
    </Container>
  );
}
