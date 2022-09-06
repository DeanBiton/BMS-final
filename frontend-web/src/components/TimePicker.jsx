import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker({name,value,setValue,isDisable}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
        label={name}
          value={value}
          readOnly={isDisable}
          onChange={(newValue) => {
            setValue(name,newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

    </LocalizationProvider>
  );
}
