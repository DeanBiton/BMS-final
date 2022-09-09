import DonateTable from '../components/DonateTable'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getEventRegisters, createDonation, reset } from '../features/donations/donationSlice'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Donate(){
    // const event_id = useLocation().state.event_id
    const event_id = '631755adf3cee1ae0cfc64c5'
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
        
        console.log("im here")
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


    console.log(donations)

    return(
        <DonateTable/>
    )
}