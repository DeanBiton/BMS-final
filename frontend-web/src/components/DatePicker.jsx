import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({name,value,setValue,isDisable}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      minDate={Date.now()}
      label="Date"
        value={value}
        readOnly={isDisable}
        onChange={(newValue) => {
          setValue(name,newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}