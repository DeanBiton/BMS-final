import { useState, useEffect } from 'react'
import Card from "../components/Card"
import data from "../dummy/Events"
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../features/events/eventSlice'
import { useNavigate } from 'react-router-dom'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Spinner from '../components/Spinner'

function Events() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [present, setPresent] = useState(false)

    const { user } = useSelector((state) => state.auth)
    const { events, isLoading, isError, message } = useSelector(
        (state) => state.events
    )

    useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        if (!user) {
          navigate('/login')
        }
        else
        {
          dispatch(getEvents())
        }
    
        return () => {
          dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading || events.length ===0)
    {
        return (<Spinner />)
    }

    const pastEvents = events.filter((event)=> {
      return event.status === "Active" || event.status === "In progress"
    })
       
    return (
        <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={present} onChange={()=>{setPresent(!present)}} />
            }
            label="Past events"
          />
        </FormGroup>
            
        {(present? events:pastEvents).map(event => {
        return (
          <Card 
              key={event._id}
              event={event}
          />)
        })}
        </div>
    )
}
export default Events
