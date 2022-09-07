import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import BloodForm from './BloodForm';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../features/events/eventSlice'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['General details', 'Blood amounts'];



const theme = createTheme();

export default function Checkout() {
    const dispatch = useDispatch()

    const[formData,setFormData] = React.useState({
        address:"",
        city:"",
        date:dayjs(Date.now()).toDate(),
        timeStart:null,
        timeEnd:null,
        "A+":0,
        "A-":0,
        "B+":0,
        "B-":0,
        "AB+":0,
        "AB-":0,
        "O+":0,
        "O-":0
    })


    function handleChange(event) {
        const {name, value,type} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: (type === 'number' && value < 0)? 0 : value
            }
        })
        console.log(formData)
    }
    function handleChangeDateTime(name,value) {
        if(name)
        {
              setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: dayjs(value).toDate()  

            }
        })
        }
      
    }




    function getStepContent(step) {
        switch (step) {
          case 0:
            return <AddressForm formData = {formData} handleFunc= {handleChange} handleDateTimeFunc={handleChangeDateTime}/>;
          case 1:
            return <BloodForm formData = {formData} handleFunc= {handleChange}/>;
          default:
            throw new Error('Unknown step');
        }
      }



  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if(activeStep===steps.length - 1)
    sendForm()
};

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function sendForm(){
    dispatch(createEvent(formData))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          {/* <Typography component="h1" variant="h4" align="center">
            New Envent
          </Typography> */}
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, px:8 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  New event has created!
                </Typography>
                <Typography variant="subtitle1">
                  For viewing event page please click here.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Create Event' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
      </Container>
    </ThemeProvider>
  );
}