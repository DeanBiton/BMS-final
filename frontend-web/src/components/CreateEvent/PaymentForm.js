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
      //label="Name on card"
      //autoComplete="cc-name"
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
            {/* <div className='ListItemSides'>
              <ListItemText primary={"name"}/>
            <TextField  
            required
            id="cardName"
            //label="Name on card"
            //autoComplete="cc-name"
            variant="standard"
            type="number" 
          />            
            </div>

          
        <Grid item xs={12} md={2}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}