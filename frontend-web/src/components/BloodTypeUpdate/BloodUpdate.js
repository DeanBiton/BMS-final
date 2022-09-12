import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BloodForm from './BloodUpdateForm';
import { useDispatch } from 'react-redux'
import { updateBloodType } from '../../features/auth/authSlice'

const steps = ['Update User Blood'];
const theme = createTheme();

const options = ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((name) => {
  return(
    {'value': name}
  )
})


export default function Checkout() {
    const dispatch = useDispatch()

    const[formData,setFormData] = React.useState({
          id:"",
          bloodType:""
    })



    function handleChange(event) {
        const {name, value,type} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                 [name]: value
            }
        })
      }

      function handleUserIdChange(event) {
        const {name, value,type} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                 [name]: value.replace(/\D/g, "")
            }
        })
      }


    function getStepContent(step) {
        switch (step) {
          case 0:
            return <BloodForm formData = {formData} handleChange= {handleChange} handleUserIdChange={handleUserIdChange} options={options}/>;
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
    dispatch(updateBloodType(formData))
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
          <Typography component="h1" variant="h4" align="center">
            Update user blood Type
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, px:8 }}>
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Blood type has updated!
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
                    {activeStep === steps.length - 1 ? 'Update' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}