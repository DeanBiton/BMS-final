import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner'
import {getDonations, reset } from '../../../features/donations/donationSlice'
import DonationForm from './DonationForm'

function Donations() {
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
        else
        {
          //dispatch(getDonations())
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
            <p>Donations Dashboard</p>
            </section>

            <DonationForm />
        </>
    )
}

export default Donations