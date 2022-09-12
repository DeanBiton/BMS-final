import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import BasicDatePicker from '../DatePicker';
import BasicTimePicker from '../TimePicker';

export default function AddressForm({formData,handleFunc, handleDateTimeFunc,isDisable}) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <BasicDatePicker
            required
            name="date"
            value={formData.date}
            setValue ={handleDateTimeFunc}
            isDisable={isDisable}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicTimePicker
            required
            name="timeStart"
            value={formData.timeStart}
            setValue ={handleDateTimeFunc}
            isDisable={isDisable}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicTimePicker
            required
            name="timeEnd"
            value={formData.timeEnd}
            setValue ={handleDateTimeFunc}
            isDisable={isDisable}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleFunc}
            defaultValue={formData.address}
            disabled={isDisable}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleFunc}
            defaultValue={formData.city}
            disabled={isDisable}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
            variant="standard"
            defaultValue="ISRAEL"
            disabled={isDisable}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}