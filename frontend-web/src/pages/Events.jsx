import {useEffect} from "react"
import Card from "../components/Card"
import data from "../dummy/Events"
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../features/events/eventSlice'
import { useNavigate } from 'react-router-dom'

function Events() {
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

    const cards = events.map(event => {
        //console.log(event)
        return (
            <Card 
                key={event._id}
                event={event}
            />
        )
    })        
    
    return (
        <div>
            {cards}
        </div>
    )
}
export default Events
