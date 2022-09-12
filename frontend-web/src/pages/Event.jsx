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
import { refreshEvent } from '../features/events/eventSlice';
import Spinner from '../components/Spinner'
import { getEvents, deleteEvent, reset } from '../features/events/eventSlice'

import { useNavigate } from 'react-router-dom'

function Test(){
    const id = useLocation().state.event_id

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { user } = useSelector((state) => state.auth)
    const { events, isLoading, isError, message } = useSelector(
        (state) => state.events
    )
    
    useEffect(() => {
        if (isError) {
        console.log(message)
        }
        
        console.log("im here")
        if (!user) {
        navigate('/login')
        }
        else if(!events)
        {
        navigate('/events')
        }
        else
        {
        dispatch(getEvents())
        }
    
        return () => {
        dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    // Declare states
    const [showDemand, setShowDemand] = useState(false)

    if(isLoading || events.length ===0)
    {
        return (<Spinner />)
    }
    
    let event = events.find((event) => event._id === id)

    function handleDelete(){
        dispatch(deleteEvent(id))
        navigate('/events')
    }
    function handleDonations(){
        navigate('/donated',{state:{event_id:event._id}});
    }
    
     const showButton=  event.status==='Ended'? false:true
     const showUpdateDonation =  event.status==='In progress'? true:false
    return(
        <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

        <AddressForm formData={event} handleFunc={undefined} handleDateTimeFunc={undefined} isDisable={true} />
        {!showDemand? (
                <>
         
                <div className='wrapperRightSide showDemand'>       
                {showButton && !showUpdateDonation &&
                    <Button variant="contained" onClick={()=>setShowDemand(true)} >Update Demand</Button>
                }
                {showButton && showUpdateDonation &&
                    <Button variant="contained" onClick={handleDonations} >Update DOnations</Button>
                }  
                </div>
                <SimpleTable className="eventTable"rows={[
                    {Type:"Donated",...event.bloodTypeDonated},
                    {Type:"Registers",...event.bloodTypeRegisters},
                    {Type:"Demands",...event.bloodTypeDemands}]}/>
                </>
        ) : (
            <UpdateDemand  eventId ={event._id}data={event.bloodTypeDemands} handle={()=>setShowDemand(false)}/>
        )}
        {showButton && !showUpdateDonation &&
              <Button id='deleteEvent' variant="contained" onClick={handleDelete}>Delete Event</Button>
        }
        </Paper>
        </Container>
    )
    
    
}export default Test