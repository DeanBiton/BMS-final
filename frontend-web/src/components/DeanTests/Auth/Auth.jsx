import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner'
import AuthForm from './AuthForm'

function Auth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        if (!user) {
          navigate('/login')
        }
        else
        {
        }
    
        // return () => {
        //   dispatch(reset())
        // }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
            <h1>Welcome {user && user.name}</h1>
            <p>Auth Dashboard</p>
            </section>

            <AuthForm />
        </>
    )
}

export default Auth