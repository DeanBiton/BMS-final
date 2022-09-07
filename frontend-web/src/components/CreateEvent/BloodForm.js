import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/system';

export default function PaymentForm({formData,handleFunc}) {
  const itemElements = ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((name) => {

    return (
      <div className='ListItemSides'>
        <ListItemText primary={name}/>
      <TextField  
      required
      id="cardName"
      name={name}
      variant="standard"
      type="number" 
      onChange={handleFunc}
      value={formData[name]}
    />            
      </div>
    )
  })

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Payment method
      </Typography> */}
      <Grid container spacing={0} >
        {itemElements}
      </Grid>
    </React.Fragment>
  );
}