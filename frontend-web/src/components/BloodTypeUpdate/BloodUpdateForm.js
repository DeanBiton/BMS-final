import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BasicDatePicker from '../DatePicker';
import BasicTimePicker from '../TimePicker';
import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';


export default function AddressForm({formData,handleChange,handleUserIdChange,options}) {

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            name="userId"
            label="User ID"
            value={formData.userId}
             onChange={handleUserIdChange}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
          name='bloodType'
          id="outlined-select-currency"
          select
          label="Select"
          value={formData.bloodType}
          onChange={handleChange}
          helperText="Please select Blood type"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}