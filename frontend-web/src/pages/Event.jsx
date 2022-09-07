import AddressForm from '../components/CreateEvent/AddressForm';
import BloodForm from '../components/CreateEvent/BloodForm'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Popover from '@mui/material/Popover';
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SimpleTable from "../components/Table"
import { useState, useEffect } from 'react'
import UpdateDemand from '../components/UpdateDemand'

export default function Test(){
    const event = useLocation().state.event
    const dispatch = useDispatch()
    // console.log(event)

    const { events, isLoading, isError, message } = useSelector(
        (state) => state.events
    )
    
    function handleDelete(){
        // dispatch(deleteEvent(event._id))
        console.log(event._id)
    }

    function updateDemand(){
        console.log("update")
        setShowDemand(false)
    }
    const [showDemand, setShowDemand] = useState(false)
        return(
            <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    
            <AddressForm formData={event} handleFunc={undefined} handleDateTimeFunc={undefined} isDisable={true} />
            {!showDemand? (
                    <>
                    <div className='wrapperRightSide'> 
                    <Button id='showDemand' variant="contained" onClick={()=>setShowDemand(true)} >Update Demand</Button>
                    </div>
                    <SimpleTable className="eventTable"rows={[
                        {Type:"bloodTypeDonated",...event.bloodTypeDonated},
                        {Type:"BloodTypeRegisters",...event.bloodTypeRegisters},
                        {Type:"BloodTypeDemands",...event.bloodTypeDemands}]}/>
                        </>
            ) : (
                <UpdateDemand  eventId ={event._id}data={event.bloodTypeDemands} handle={()=>setShowDemand(false)}/>

            //     <Paper  className="eventInnerPaper" variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            //     <BloodForm formData={event.bloodTypeDemands} handleFunc={undefined}/>
            //     <Button  variant="contained">Update</Button>
            //     <Button  variant="contained" onClick={()=>setShowDemand(false)} >Cancel</Button>
            // </Paper>
            )}

 
            
                 <Button id='deleteEvent' variant="contained">Delete Event</Button>
            </Paper>
            </Container>
        )
    
    
}