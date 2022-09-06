import DataComposedChart from "../../components/stats/ComposedChart";
import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../../features/events/eventSlice'
import { useNavigate } from 'react-router-dom'

function Stats(){
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

return(
    <DataComposedChart headers={['id','demand','registers','donate']} data= {chartData(events)}/>
)
}
export default Stats

function chartData(events){
    return (
      events.map(event => {
        return (
            {id : event._id,
              registers : Object.values(event.bloodTypeRegisters).reduce((a, b) => a + b),
              demand : Object.values(event.bloodTypeDemands).reduce((a, b) => a + b),
              donate : Object.values(event.bloodTypeDonated).reduce((a, b) => a + b)
            } 
        )
    })  
    )
  }