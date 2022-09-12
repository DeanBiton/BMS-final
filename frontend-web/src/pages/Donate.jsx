import DonateTable from '../components/DonateTable'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getEventRegisters, reset } from '../features/donations/donationSlice'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function Donate(){
     const event_id = useLocation().state.event_id
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { donations, isLoading, isError, message } = useSelector(
        (state) => state.donations
    )
    
    useEffect(() => {
        if (isError) {
        console.log(message)
        }
        
        if (!user) {
        navigate('/login')
        }
        else if(!donations)
        {
        navigate('/events')
        }
        else
        {
        dispatch(getEventRegisters({id:event_id}))
        }
    
        return () => {
        dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading )
    {
        return (<Spinner />)
    }
  
    return(
        <DonateTable rows={donations} userId={user._id} eventId={event_id}/>
    )
}