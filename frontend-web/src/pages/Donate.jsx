import DonateTable from '../components/DonateTable'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getEventRegisters, createDonation, reset } from '../features/donations/donationSlice'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function Donate(){
     const event_id = useLocation().state.event_id
     //console.log(event_id)
    //const event_id = '63178a1253395e0b8d5181c7'
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

    // const [renderer, setRenderer] = useState(donations)

    if(isLoading )
    {
        return (<Spinner />)
    }

    console.log(donations)
    // const donated = donations.donations
    // const data = donations.registers.map((user) => {
    //     if(donated.some(donation => donation.tz===user.tz))
    //         return {...user, isDonated : true}
    //     else 
    //         return {...user, isDonated : false}

    // }
    // )
    // console.log(data)
    
    return(
        <DonateTable rows={donations} userId={user._id} eventId={event_id}/>
    )
}