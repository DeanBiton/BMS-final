import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner'
import { getEvents, reset } from '../../../features/events/eventSlice'
import EventForm from './EventForm'

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

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
            <h1>Welcome {user && user.name}</h1>
            <p>Events Dashboard</p>
            </section>

            <EventForm />
        </>
    )
}

export default Events