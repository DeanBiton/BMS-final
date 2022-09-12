import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


export default function AddressForm({formData,handleChange,handleUserIdChange,options}) {

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            name="id"
            label="User ID"
            value={formData.id}
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