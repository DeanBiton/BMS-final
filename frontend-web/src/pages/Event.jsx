import AddressForm from '../components/CreateEvent/AddressForm';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SimpleTable from "../components/Table"

export default function Test(){
    const event = useLocation().state.event
    const dispatch = useDispatch()
    console.log(event)


        return(
            <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    
            <AddressForm formData={event} handleFunc={undefined} handleDateTimeFunc={undefined} isDisable={true} />
            <SimpleTable className="eventTable"rows={[
                {Type:"bloodTypeDonated",...event.bloodTypeDonated},
                {Type:"BloodTypeRegisters",...event.bloodTypeRegisters},
                {Type:"BloodTypeDemands",...event.bloodTypeDemands}]}/>

            </Paper>
            </Container>
        )
    
    
}