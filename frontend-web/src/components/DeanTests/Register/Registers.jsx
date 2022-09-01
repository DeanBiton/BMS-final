import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner'
import {getRegisters, reset } from '../../../features/registers/registerSlice'
import RegisterForm from './RegisterForm'

function Registers() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { registers, isLoading, isError, message } = useSelector(
        (state) => state.registers
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
          dispatch(getRegisters())
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
            <p>Registers Dashboard</p>
            </section>

            <RegisterForm />
        </>
    )
}

export default Registers